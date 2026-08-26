// ============================================================
// tracking-system/smart.ts
// SMART goal CRUD and review tracking
// ============================================================

import type {
  SmartGoal,
  ReviewEntry,
  SmartStatus,
} from './types.js';
import {
  ensureDir,
  readJson,
  writeJson,
  writeText,
  fileExists,
  listDir,
  readText,
  slugify,
  now,
} from './store.js';
import * as path from 'node:path';

/** Tracker for SMART goals */
export class SmartTracker {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  private goalDir(goalId: string): string {
    return path.join(this.basePath, 'smart-goals', slugify(goalId));
  }

  /** Create a new SMART goal */
  createGoal(goal: Omit<SmartGoal, 'created' | 'status'>): SmartGoal {
    const dir = this.goalDir(goal.goalId);
    ensureDir(dir);

    const fullGoal: SmartGoal = {
      ...goal,
      created: now(),
      status: 'active',
    };

    writeJson(path.join(dir, 'goal-definition.json'), fullGoal);
    writeText(path.join(dir, 'goal-definition.md'), this.renderGoalMd(fullGoal));
    writeText(path.join(dir, 'review-log.md'), '# Review Log\n\n');
    writeText(path.join(dir, 'status.md'), this.renderStatusMd(fullGoal, []));

    return fullGoal;
  }

  /** Get a SMART goal */
  getGoal(goalId: string): SmartGoal | null {
    const p = path.join(this.goalDir(goalId), 'goal-definition.json');
    if (!fileExists(p)) return null;
    return readJson<SmartGoal>(p);
  }

  /** Update a goal's status */
  updateStatus(goalId: string, status: SmartStatus): SmartGoal {
    const goal = this.getGoal(goalId);
    if (!goal) throw new Error(`Goal "${goalId}" not found`);
    goal.status = status;

    writeJson(path.join(this.goalDir(goalId), 'goal-definition.json'), goal);
    writeText(path.join(this.goalDir(goalId), 'goal-definition.md'), this.renderGoalMd(goal));

    const reviews = this.getReviews(goalId);
    writeText(path.join(this.goalDir(goalId), 'status.md'), this.renderStatusMd(goal, reviews));

    return goal;
  }

  /** Update milestone status */
  updateMilestone(goalId: string, index: number, status: 'pending' | 'done' | 'failed'): SmartGoal {
    const goal = this.getGoal(goalId);
    if (!goal) throw new Error(`Goal "${goalId}" not found`);
    if (index < 0 || index >= goal.milestones.length) {
      throw new Error(`Milestone index ${index} out of range`);
    }
    goal.milestones[index].status = status;

    // Auto-update goal status if all milestones are done
    if (goal.milestones.every((m) => m.status === 'done')) {
      goal.status = 'achieved';
    } else if (goal.milestones.some((m) => m.status === 'failed')) {
      // Don't auto-fail; let user decide
    }

    writeJson(path.join(this.goalDir(goalId), 'goal-definition.json'), goal);
    return goal;
  }

  /** Add a review entry */
  addReview(goalId: string, review: Omit<ReviewEntry, 'reviewNumber'>): ReviewEntry {
    const reviews = this.getReviews(goalId);
    const fullReview: ReviewEntry = {
      ...review,
      reviewNumber: reviews.length + 1,
    };

    reviews.push(fullReview);

    // Append to review log markdown
    const reviewMd = this.renderReviewMd(fullReview);
    const logPath = path.join(this.goalDir(goalId), 'review-log.md');
    const current = fileExists(logPath) ? readText(logPath) : '# Review Log\n\n';
    writeText(logPath, current + reviewMd);

    // Update status file
    const goal = this.getGoal(goalId);
    if (goal) {
      writeText(path.join(this.goalDir(goalId), 'status.md'), this.renderStatusMd(goal, reviews));
    }

    return fullReview;
  }

  /** Get all review entries */
  getReviews(goalId: string): ReviewEntry[] {
    const dir = this.goalDir(goalId);
    const files = listDir(dir).filter((f) => f.startsWith('review-') && f.endsWith('.json'));
    return files
      .map((f) => readJson<ReviewEntry>(path.join(dir, f)))
      .sort((a, b) => a.reviewNumber - b.reviewNumber);
  }

  /** Calculate progress percentage */
  calculateProgress(goalId: string): number {
    const goal = this.getGoal(goalId);
    if (!goal) return 0;

    const doneMilestones = goal.milestones.filter((m) => m.status === 'done').length;
    const totalMilestones = goal.milestones.length;
    if (totalMilestones === 0) return 0;
    return Math.round((doneMilestones / totalMilestones) * 100);
  }

  /** Check if goal deadline is approaching (within 7 days) */
  isDeadlineApproaching(goalId: string): boolean {
    const goal = this.getGoal(goalId);
    if (!goal || goal.status !== 'active') return false;
    const deadline = new Date(goal.deadline).getTime();
    const now = Date.now();
    const daysLeft = (deadline - now) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft >= 0;
  }

  /** Check if goal is overdue */
  isOverdue(goalId: string): boolean {
    const goal = this.getGoal(goalId);
    if (!goal || goal.status !== 'active') return false;
    return new Date(goal.deadline).getTime() < Date.now();
  }

  // ---- Markdown renderers --------------------------------------

  private renderGoalMd(goal: SmartGoal): string {
    const lines: string[] = [
      '---',
      `goal_id: "${goal.goalId}"`,
      `created: "${goal.created}"`,
      `deadline: "${goal.deadline}"`,
      `status: "${goal.status}"`,
      '---',
      '',
      `# SMART Goal: ${goal.statement}`,
      '',
      `**Specific**: ${goal.specific}`,
      `**Measurable**: ${goal.measurable}`,
      `**Achievable**: ${goal.achievable}`,
      `**Relevant**: ${goal.relevant}`,
      `**Time-bound**: ${goal.timeBound}`,
      '',
      '## Milestones',
      '| # | Milestone | Target Date | Status |',
      '|---|-----------|-------------|--------|',
      ...goal.milestones.map(
        (m, i) =>
          `| ${i + 1} | ${m.description} | ${m.targetDate} | ${m.status === 'done' ? '✅' : m.status === 'failed' ? '❌' : '⏳'} |`,
      ),
      '',
    ];
    return lines.join('\n');
  }

  private renderReviewMd(review: ReviewEntry): string {
    const lines: string[] = [
      `## Review #${review.reviewNumber} — ${review.date.slice(0, 10)}`,
      `- **Current metric value**: ${review.currentMetricValue}`,
      `- **Progress**: ${review.progressPercent}% toward target`,
      `- **On track?**: ${review.onTrack}`,
      `- **Blockers**: ${review.blockers.length > 0 ? review.blockers.join('; ') : 'None'}`,
      `- **Adjustments needed**: ${review.adjustmentsNeeded || 'None'}`,
      '',
    ];
    return lines.join('\n');
  }

  private renderStatusMd(goal: SmartGoal, reviews: ReviewEntry[]): string {
    const progress = this.calculateProgress(goal.goalId);
    const lastReview = reviews.length > 0 ? reviews[reviews.length - 1] : null;
    const lines: string[] = [
      `# SMART Goal Status: ${goal.goalId}`,
      '',
      `**Statement**: ${goal.statement}`,
      `**Status**: ${goal.status}`,
      `**Deadline**: ${goal.deadline}`,
      `**Progress**: ${progress}%`,
      `**Last Review**: ${lastReview?.date.slice(0, 10) ?? 'No reviews yet'}`,
      '',
      '## Recent Reviews',
      '| # | Date | Value | Progress | On Track |',
      '|---|------|-------|----------|----------|',
      ...reviews
        .slice(-5)
        .map(
          (r) =>
            `| ${r.reviewNumber} | ${r.date.slice(0, 10)} | ${r.currentMetricValue} | ${r.progressPercent}% | ${r.onTrack} |`,
        ),
      '',
    ];
    return lines.join('\n');
  }
}
