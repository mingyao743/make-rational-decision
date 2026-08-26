// ============================================================
// tracking-system/index-manager.ts
// Master index management across all tracked items
// ============================================================

import type { MasterIndex, PdcaIndexEntry, SmartIndexEntry } from './types.js';
import { readJson, writeText, writeJson, listDir, fileExists, slugify, now } from './store.js';
import * as path from 'node:path';
import type { PdcaTracker } from './pdca.js';
import type { SmartTracker } from './smart.js';

/** Manages the master index file */
export class IndexManager {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  private indexPath(): string {
    return path.join(this.basePath, 'index.md');
  }

  private indexJsonPath(): string {
    return path.join(this.basePath, 'index.json');
  }

  /** Rebuild the master index by scanning all tracked items */
  rebuild(pdcaTracker: PdcaTracker, smartTracker: SmartTracker): MasterIndex {
    const index: MasterIndex = {
      lastUpdated: now(),
      activePdca: [],
      activeSmartGoals: [],
      completedPdca: [],
      achievedGoals: [],
    };

    // Scan PDCA directories
    const pdcaBase = path.join(this.basePath, 'pdca');
    if (fileExists(pdcaBase)) {
      const topics = listDir(pdcaBase);
      for (const topic of topics) {
        const topicDir = path.join(pdcaBase, topic);
        const cycleFiles = listDir(topicDir).filter((f) => f.match(/^cycle-\d+\.json$/));
        if (cycleFiles.length === 0) continue;

        const cycles = cycleFiles
          .map((f) => readJson<{ cycle: number; status: string; startDate: string; endDate: string | null; act?: { decision: string } }>(path.join(topicDir, f)))
          .sort((a, b) => a.cycle - b.cycle);

        const latest = cycles[cycles.length - 1];
        const isActive = !['completed', 'abandoned'].includes(latest.status);

        if (isActive) {
          index.activePdca.push({
            topic,
            currentCycle: latest.cycle,
            phase: latest.status as PdcaIndexEntry['phase'],
            lastUpdate: latest.endDate ?? latest.startDate,
            trend: 'improving', // Simplified; real impl would compare metrics
          });
        } else {
          index.completedPdca.push({
            topic,
            cycles: cycles.length,
            finalOutcome: latest.act?.decision ?? 'unknown',
            duration: `${cycles[0].startDate.slice(0, 10)} → ${(latest.endDate ?? '').slice(0, 10)}`,
          });
        }
      }
    }

    // Scan SMART goal directories
    const smartBase = path.join(this.basePath, 'smart-goals');
    if (fileExists(smartBase)) {
      const goalIds = listDir(smartBase);
      for (const goalId of goalIds) {
        const goalPath = path.join(smartBase, goalId, 'goal-definition.json');
        if (!fileExists(goalPath)) continue;

        const goal = readJson<{
          goalId: string;
          statement: string;
          deadline: string;
          status: string;
          milestones: Array<{ status: string }>;
        }>(goalPath);

        const progress = goal.milestones.length > 0
          ? Math.round(
              (goal.milestones.filter((m) => m.status === 'done').length /
                goal.milestones.length) *
                100,
            )
          : 0;

        if (goal.status === 'active') {
          index.activeSmartGoals.push({
            goal: goal.statement,
            deadline: goal.deadline,
            progress,
            status: 'active',
            lastReview: null, // Would scan review files
          });
        } else if (goal.status === 'achieved') {
          index.achievedGoals.push({
            goal: goal.statement,
            achievedDate: now(), // Would read from last review
            finalValue: '',
          });
        }
      }
    }

    // Write both JSON and Markdown
    writeJson(this.indexJsonPath(), index);
    writeText(this.indexPath(), this.renderIndexMd(index));

    return index;
  }

  /** Get the current master index */
  getIndex(): MasterIndex | null {
    if (!fileExists(this.indexJsonPath())) return null;
    return readJson<MasterIndex>(this.indexJsonPath());
  }

  /** Render the master index as Markdown */
  private renderIndexMd(index: MasterIndex): string {
    const lines: string[] = [
      '# Analysis Tracking Index',
      '',
      `Last updated: ${index.lastUpdated.slice(0, 10)}`,
      '',
      '## Active PDCA Cycles',
      '| Topic | Current Cycle | Phase | Last Update | Trend |',
      '|-------|--------------|-------|-------------|-------|',
      ...index.activePdca.map(
        (e) =>
          `| ${e.topic} | #${e.currentCycle} | ${e.phase} | ${e.lastUpdate.slice(0, 10)} | ${e.trend === 'improving' ? '↑ improving' : e.trend === 'declining' ? '↓ declining' : '→ stable'} |`,
      ),
      '',
      '## Active SMART Goals',
      '| Goal | Deadline | Progress | Status | Last Review |',
      '|------|----------|----------|--------|-------------|',
      ...index.activeSmartGoals.map(
        (e) =>
          `| ${e.goal} | ${e.deadline.slice(0, 10)} | ${e.progress}% | ${e.status} | ${e.lastReview?.slice(0, 10) ?? '—'} |`,
      ),
      '',
      '## Completed PDCA Cycles',
      '| Topic | Cycles | Final Outcome | Duration |',
      '|-------|--------|---------------|----------|',
      ...index.completedPdca.map(
        (e) => `| ${e.topic} | ${e.cycles} | ${e.finalOutcome} | ${e.duration} |`,
      ),
      '',
      '## Achieved SMART Goals',
      '| Goal | Achieved Date | Final Value |',
      '|------|--------------|-------------|',
      ...index.achievedGoals.map(
        (e) => `| ${e.goal} | ${e.achievedDate.slice(0, 10)} | ${e.finalValue} |`,
      ),
      '',
    ];

    return lines.join('\n');
  }
}
