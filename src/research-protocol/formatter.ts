// ============================================================
// research-protocol/formatter.ts
// Citation formatting and report generation
// ============================================================

import type { DataPoint, CollectionReport, ValidationResult } from './types.js';
import { validateAll, identifyGaps, summarizeReport } from './validator.js';

/** Format a single data point as a citation entry */
export function formatCitation(dp: DataPoint): string {
  const dateStr = dp.publishedDate
    ? new Date(dp.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'n.d.';

  return `${dp.source} (${dateStr}). ${dp.dataPoint}. Retrieved from ${dp.url}`;
}

/** Format a data point as a table row */
export function formatTableRow(dp: DataPoint): string {
  const dateStr = dp.publishedDate ? dp.publishedDate.slice(0, 10) : '—';
  return `| ${dp.id} | ${dp.dataPoint} | ${dp.value} | ${dp.source} | ${dp.tier} | ${dateStr} | ${dp.url} |`;
}

/** Generate a complete collection report */
export function generateReport(
  topic: string,
  timeframe: string,
  dataPoints: DataPoint[],
  requirements?: Array<{ dimension: string; dataNeeded: string; priority: string }>,
): CollectionReport {
  const validationResults = validateAll(dataPoints);
  const gaps = requirements
    ? identifyGaps(requirements, dataPoints)
    : [];
  const summary = summarizeReport(dataPoints, validationResults);

  return {
    topic,
    collectionDate: new Date().toISOString(),
    timeframe,
    dataPoints,
    validationResults,
    gaps,
    summary,
  };
}

/** Render a collection report as Markdown */
export function renderReportMd(report: CollectionReport): string {
  const lines: string[] = [
    `## Research Data Collection: ${report.topic}`,
    '',
    `**Collection Date**: ${report.collectionDate.slice(0, 10)}`,
    `**Timeframe Scope**: ${report.timeframe}`,
    '',
  ];

  // Group data points by skill and dimension
  const grouped = new Map<string, DataPoint[]>();
  for (const dp of report.dataPoints) {
    const key = `${dp.skill} — ${dp.dimension}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(dp);
  }

  for (const [key, points] of grouped) {
    lines.push(`### ${key}`);
    lines.push('| # | Data Point | Value | Source | Tier | Published | URL |');
    lines.push('|---|-----------|-------|--------|------|-----------|-----|');
    for (const dp of points) {
      lines.push(formatTableRow(dp));
    }
    lines.push('');
  }

  // Validation summary
  lines.push('### Validation Summary');
  lines.push(`- Total data points collected: ${report.summary.totalDataPoints}`);
  lines.push(`- T1-T3 sources: ${report.summary.t1ToT3Count} (${report.summary.t1ToT3Percent}%)`);
  lines.push(`- Cross-referenced (≥2 sources): ${report.summary.crossReferencedCount} (${report.summary.crossReferencedPercent}%)`);
  lines.push(`- Flagged for uncertainty: ${report.summary.flaggedCount} (${report.summary.flaggedPercent}%)`);
  lines.push('');

  // Confidence levels
  lines.push('### Confidence Levels');
  for (const vr of report.validationResults) {
    const dp = report.dataPoints.find((d) => d.id === vr.dataPointId);
    if (!dp) continue;
    const icon = vr.overallConfidence === 'high' ? '🟢' : vr.overallConfidence === 'medium' ? '🟡' : '🔴';
    lines.push(`${icon} ${dp.dataPoint} — ${vr.overallConfidence}`);
    if (vr.issues.length > 0) {
      for (const issue of vr.issues) {
        lines.push(`  - ⚠️ ${issue}`);
      }
    }
  }
  lines.push('');

  // Data gaps
  if (report.gaps.length > 0) {
    lines.push('### Data Gaps');
    lines.push('| Dimension | Missing Data | Impact | Recommended Action |');
    lines.push('|-----------|-------------|--------|-------------------|');
    for (const gap of report.gaps) {
      lines.push(
        `| ${gap.dimension} | ${gap.missingData} | ${gap.impactOnAnalysis} | ${gap.recommendedAction} |`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

/** Create a new DataPoint with auto-generated ID */
let dataPointCounter = 0;
export function createDataPoint(
  input: Omit<DataPoint, 'id' | 'collectedAt'>,
): DataPoint {
  dataPointCounter++;
  return {
    ...input,
    id: `DP-${String(dataPointCounter).padStart(3, '0')}`,
    collectedAt: new Date().toISOString(),
  };
}
