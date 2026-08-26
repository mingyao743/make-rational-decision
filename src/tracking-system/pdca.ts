// ============================================================
// tracking-system/pdca.ts
// PDCA cycle CRUD and metric calculations
// ============================================================

import type {
  Baseline,
  PdcaCycle,
  PdcaStatus,
  CumulativeMetric,
  PdcaPlan,
  PdcaDo,
  PdcaCheck,
  PdcaAct,
} from './types.js';
import {
  ensureDir,
  readJson,
  writeJson,
  writeText,
  fileExists,
  listDir,
  slugify,
  now,
  pad3,
} from './store.js';
import * as path from 'node:path';

/** Root directory for tracking data */
export class PdcaTracker {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  private topicDir(topic: string): string {
    return path.join(this.basePath, 'pdca', slugify(topic));
  }

  /** Initialize a new PDCA tracking series */
  initTopic(topic: string, baseline: Omit<Baseline, 'created'>): Baseline {
    const dir = this.topicDir(topic);
    ensureDir(dir);

    const fullBaseline: Baseline = {
      ...baseline,
      created: now(),
    };

    writeJson(path.join(dir, 'baseline.json'), fullBaseline);
    return fullBaseline;
  }

  /** Get the baseline for a topic */
  getBaseline(topic: string): Baseline | null {
    const p = path.join(this.topicDir(topic), 'baseline.json');
    if (!fileExists(p)) return null;
    return readJson<Baseline>(p);
  }

  /** Create a new cycle (auto-incrementing number) */
  createCycle(topic: string, plan: PdcaPlan): PdcaCycle {
    const dir = this.topicDir(topic);
    ensureDir(dir);

    const cycleNumber = this.getNextCycleNumber(topic);
    const cycle: PdcaCycle = {
      cycle: cycleNumber,
      topic: slugify(topic),
      startDate: now(),
      endDate: null,
      status: 'planning',
      plan,
    };

    writeText(
      path.join(dir, `cycle-${pad3(cycleNumber)}.md`),
      this.renderCycleMd(cycle),
    );
    writeJson(path.join(dir, `cycle-${pad3(cycleNumber)}.json`), cycle);

    this.updateStatus(topic);
    return cycle;
  }

  /** Get the next cycle number for a topic */
  private getNextCycleNumber(topic: string): number {
    const dir = this.topicDir(topic);
    const files = listDir(dir).filter((f) => f.match(/^cycle-\d+\.md$/));
    if (files.length === 0) return 1;
    const nums = files.map((f) => parseInt(f.match(/\d+/)![0], 10));
    return Math.max(...nums) + 1;
  }

  /** Read a cycle by number */
  getCycle(topic: string, cycleNumber: number): PdcaCycle | null {
    // In a real implementation, we'd parse the markdown back into PdcaCycle.
    // For now, we store a JSON companion file for structured access.
    const dir = this.topicDir(topic);
    const jsonPath = path.join(dir, `cycle-${pad3(cycleNumber)}.json`);
    if (!fileExists(jsonPath)) return null;
    return readJson<PdcaCycle>(jsonPath);
  }

  /** Save a cycle (structured JSON + human-readable MD) */
  saveCycle(topic: string, cycle: PdcaCycle): void {
    const dir = this.topicDir(topic);
    const base = `cycle-${pad3(cycle.cycle)}`;
    writeJson(path.join(dir, `${base}.json`), cycle);
    writeText(path.join(dir, `${base}.md`), this.renderCycleMd(cycle));
    this.updateStatus(topic);
  }

  /** Update the Do phase of a cycle */
  recordDo(topic: string, cycleNumber: number, doData: PdcaDo): PdcaCycle {
    const cycle = this.getCycle(topic, cycleNumber);
    if (!cycle) throw new Error(`Cycle ${cycleNumber} not found for topic "${topic}"`);
    cycle.do = doData;
    cycle.status = 'executing';
    this.saveCycle(topic, cycle);
    return cycle;
  }

  /** Update the Check phase of a cycle */
  recordCheck(topic: string, cycleNumber: number, checkData: PdcaCheck): PdcaCycle {
    const cycle = this.getCycle(topic, cycleNumber);
    if (!cycle) throw new Error(`Cycle ${cycleNumber} not found for topic "${topic}"`);
    cycle.check = checkData;
    cycle.status = 'checking';
    this.saveCycle(topic, cycle);
    return cycle;
  }

  /** Update the Act phase and complete the cycle */
  recordAct(topic: string, cycleNumber: number, actData: PdcaAct): PdcaCycle {
    const cycle = this.getCycle(topic, cycleNumber);
    if (!cycle) throw new Error(`Cycle ${cycleNumber} not found for topic "${topic}"`);
    cycle.act = actData;
    cycle.status = actData.decision === 'abandon' ? 'abandoned' : 'completed';
    cycle.endDate = now();
    this.saveCycle(topic, cycle);
    return cycle;
  }

  /** Calculate cumulative improvement across all completed cycles */
  calculateCumulative(topic: string): CumulativeMetric[] {
    const baseline = this.getBaseline(topic);
    if (!baseline) return [];

    // Find the latest completed cycle with check data
    const dir = this.topicDir(topic);
    const files = listDir(dir).filter((f) => f.match(/^cycle-\d+\.json$/));
    if (files.length === 0) return [];

    const cycles = files
      .map((f) => readJson<PdcaCycle>(path.join(dir, f)))
      .sort((a, b) => b.cycle - a.cycle);

    const latestWithCheck = cycles.find((c) => c.check);
    if (!latestWithCheck?.check) return [];

    return baseline.metrics.map((metric) => {
      const result = latestWithCheck.check!.results.find(
        (r) => r.metric === metric.name,
      );
      const currentVal = result?.actual ?? metric.baselineValue;
      const change = currentVal - metric.baselineValue;
      const pct = metric.baselineValue !== 0
        ? (change / Math.abs(metric.baselineValue)) * 100
        : 0;

      return {
        name: metric.name,
        originalBaseline: metric.baselineValue,
        currentValue: currentVal,
        totalChange: change,
        totalChangePercent: Math.round(pct * 100) / 100,
      };
    });
  }

  /** Generate and write the status.md file */
  updateStatus(topic: string): PdcaStatus {
    const dir = this.topicDir(topic);
    const baseline = this.getBaseline(topic);
    if (!baseline) throw new Error(`No baseline found for topic "${topic}"`);

    const files = listDir(dir).filter((f) => f.match(/^cycle-\d+\.json$/));
    const cycles = files
      .map((f) => readJson<PdcaCycle>(path.join(dir, f)))
      .sort((a, b) => a.cycle - b.cycle);

    const latest = cycles[cycles.length - 1];
    const cumulative = this.calculateCumulative(topic);

    const status: PdcaStatus = {
      topic: slugify(topic),
      currentCycle: latest?.cycle ?? 0,
      currentPhase: latest?.status ?? 'planning',
      lastUpdated: now(),
      cycleHistory: cycles.map((c) => ({
        cycle: c.cycle,
        start: c.startDate,
        end: c.endDate,
        outcome: c.act?.decision ?? 'in progress',
        keyMetricChange: c.check?.results
          ?.map((r) => `${r.metric}: ${r.baseline} → ${r.actual}`)
          .join(', ') ?? '—',
      })),
      cumulativeImprovement: cumulative,
    };

    writeText(path.join(dir, 'status.md'), this.renderStatusMd(status));
    return status;
  }

  /** Render a cycle as Markdown */
  private renderCycleMd(cycle: PdcaCycle): string {
    const lines: string[] = [
      '---',
      `cycle: ${cycle.cycle}`,
      `topic: "${cycle.topic}"`,
      `start_date: "${cycle.startDate}"`,
      `end_date: ${cycle.endDate ? '"' + cycle.endDate + '"' : 'null'}`,
      `status: "${cycle.status}"`,
      '---',
      '',
      `# PDCA Cycle #${cycle.cycle}: ${cycle.topic}`,
      '',
      '## P — Plan',
      `- **Problem**: ${cycle.plan.problem}`,
      `- **Goal**: ${cycle.plan.goal}`,
      `- **Root cause**: ${cycle.plan.rootCause}`,
      `- **Intervention**: ${cycle.plan.intervention}`,
      '- **Metrics**:',
      '| Metric | Baseline | Target |',
      '|--------|----------|--------|',
      ...cycle.plan.metrics.map(
        (m) => `| ${m.name} | ${m.baseline} | ${m.target} |`,
      ),
      '',
    ];

    if (cycle.do) {
      lines.push(
        '## D — Do',
        `- **Actions taken**: ${cycle.do.actionsTaken}`,
        `- **Execution period**: ${cycle.do.executionPeriod}`,
        `- **Deviations**: ${cycle.do.deviations}`,
        '',
      );
    }

    if (cycle.check) {
      lines.push(
        '## C — Check',
        '| Metric | Baseline | Target | Actual | Status |',
        '|--------|----------|--------|--------|--------|',
        ...cycle.check.results.map(
          (r) =>
            `| ${r.metric} | ${r.baseline} | ${r.target} | ${r.actual} | ${r.status === 'pass' ? '✅' : '❌'} |`,
        ),
        '',
        `- **Unexpected outcomes**: ${cycle.check.unexpectedOutcomes}`,
        `- **Key learnings**: ${cycle.check.keyLearnings}`,
        '',
      );
    }

    if (cycle.act) {
      lines.push(
        '## A — Act',
        `- **Decision**: ${cycle.act.decision}`,
        `- **Standardized process**: ${cycle.act.standardizedProcess || 'N/A'}`,
        `- **Next cycle**: ${cycle.act.nextCycleFocus || 'N/A'}`,
        '',
      );
    }

    return lines.join('\n');
  }

  /** Render status as Markdown */
  private renderStatusMd(status: PdcaStatus): string {
    const lines: string[] = [
      `# PDCA Status: ${status.topic}`,
      '',
      `**Current Cycle**: #${status.currentCycle}`,
      `**Current Phase**: ${status.currentPhase}`,
      `**Last Updated**: ${status.lastUpdated}`,
      '',
      '## Cycle History',
      '| Cycle | Start | End | Outcome | Key Metric Change |',
      '|-------|-------|-----|---------|-------------------|',
      ...status.cycleHistory.map(
        (h) =>
          `| #${h.cycle} | ${h.start.slice(0, 10)} | ${h.end?.slice(0, 10) ?? '—'} | ${h.outcome} | ${h.keyMetricChange} |`,
      ),
      '',
      '## Cumulative Improvement',
      '| Metric | Original Baseline | Current Value | Total Change |',
      '|--------|------------------|---------------|-------------|',
      ...status.cumulativeImprovement.map(
        (m) =>
          `| ${m.name} | ${m.originalBaseline} | ${m.currentValue} | ${m.totalChange > 0 ? '+' : ''}${m.totalChange} (${m.totalChangePercent > 0 ? '+' : ''}${m.totalChangePercent}%) |`,
      ),
      '',
    ];

    return lines.join('\n');
  }
}
