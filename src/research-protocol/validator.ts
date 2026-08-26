// ============================================================
// research-protocol/validator.ts
// Source validation and confidence scoring
// ============================================================

import type { DataPoint, ValidationResult, ConfidenceLevel, CollectionReport, DataGap } from './types.js';

/** Default data freshness threshold in months */
const DEFAULT_FRESHNESS_MONTHS = 12;

/** Check if a data point's source is recent enough */
export function checkRecency(
  publishedDate: string | null,
  freshnessMonths = DEFAULT_FRESHNESS_MONTHS,
): boolean {
  if (!publishedDate) return false;

  const pubDate = new Date(publishedDate);
  if (isNaN(pubDate.getTime())) return false;

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - freshnessMonths);

  return pubDate >= cutoff;
}

/** Check if a data point's source tier is credible (T1-T3) */
export function checkCredibility(tier: string): boolean {
  return ['T1', 'T2', 'T3'].includes(tier);
}

/** Check if a data point has at least one corroborating source */
export function checkIndependence(
  dataPoint: DataPoint,
  allDataPoints: DataPoint[],
): boolean {
  // Look for other data points in the same dimension with different source URLs
  const corroborating = allDataPoints.filter(
    (dp) =>
      dp.id !== dataPoint.id &&
      dp.dimension === dataPoint.dimension &&
      dp.url !== dataPoint.url,
  );
  return corroborating.length > 0;
}

/** Check for potential bias based on source domain */
export function checkBias(dataPoint: DataPoint): boolean {
  // Simple heuristic: if the source is the subject being analyzed, flag potential bias
  // In practice, this would be more sophisticated
  const biasedDomains = [
    'prnewswire.com',
    'businesswire.com',
    'globenewswire.com',
  ];

  try {
    const domain = new URL(dataPoint.url).hostname.replace(/^www\./, '');
    return !biasedDomains.includes(domain);
  } catch {
    return true;
  }
}

/** Check if a data point is specific enough (not vague/anecdotal) */
export function checkSpecificity(dataPoint: DataPoint): boolean {
  // Heuristic: the value should contain some numeric or specific content
  const hasNumbers = /\d/.test(dataPoint.value);
  const minLength = dataPoint.value.length >= 20;
  return hasNumbers || minLength;
}

/** Validate a single data point */
export function validateDataPoint(
  dataPoint: DataPoint,
  allDataPoints: DataPoint[],
  freshnessMonths?: number,
): ValidationResult {
  const issues: string[] = [];

  const recency = checkRecency(dataPoint.publishedDate, freshnessMonths);
  if (!recency) {
    issues.push(`Source is outdated or has no publication date`);
  }

  const credibility = checkCredibility(dataPoint.tier);
  if (!credibility) {
    issues.push(`Source tier ${dataPoint.tier} is below T3 (low reliability)`);
  }

  const specificity = checkSpecificity(dataPoint);
  if (!specificity) {
    issues.push('Data point is too vague or lacks specific content');
  }

  const independence = checkIndependence(dataPoint, allDataPoints);
  if (!independence) {
    issues.push('No corroborating source found (single-source claim)');
  }

  const biasCheck = checkBias(dataPoint);
  if (!biasCheck) {
    issues.push('Source appears to be a press release (potential bias)');
  }

  // Overall confidence based on how many checks passed
  const passedCount = [recency, credibility, specificity, independence, biasCheck].filter(
    Boolean,
  ).length;

  let overallConfidence: ConfidenceLevel;
  if (passedCount >= 4) {
    overallConfidence = 'high';
  } else if (passedCount >= 2) {
    overallConfidence = 'medium';
  } else {
    overallConfidence = 'low';
  }

  return {
    dataPointId: dataPoint.id,
    recency,
    relevance: true, // Assumed; actual relevance check requires LLM
    credibility,
    specificity,
    independence,
    biasCheck,
    overallConfidence,
    issues,
  };
}

/** Validate all data points in a collection */
export function validateAll(
  dataPoints: DataPoint[],
  freshnessMonths?: number,
): ValidationResult[] {
  return dataPoints.map((dp) => validateDataPoint(dp, dataPoints, freshnessMonths));
}

/** Identify data gaps by comparing collected data against requirements */
export function identifyGaps(
  requirements: Array<{ dimension: string; dataNeeded: string; priority: string }>,
  dataPoints: DataPoint[],
): DataGap[] {
  const gaps: DataGap[] = [];

  for (const req of requirements) {
    const hasData = dataPoints.some((dp) => dp.dimension === req.dimension);
    if (!hasData) {
      gaps.push({
        dimension: req.dimension,
        missingData: req.dataNeeded,
        impactOnAnalysis: req.priority as 'high' | 'medium' | 'low',
        recommendedAction: `Search for data on: ${req.dataNeeded}`,
      });
    }
  }

  return gaps;
}

/** Generate a summary of the collection report */
export function summarizeReport(
  dataPoints: DataPoint[],
  validationResults: ValidationResult[],
): CollectionReport['summary'] {
  const total = dataPoints.length;
  const t1ToT3 = dataPoints.filter((dp) => ['T1', 'T2', 'T3'].includes(dp.tier)).length;
  const crossRef = validationResults.filter((vr) => vr.independence).length;
  const flagged = validationResults.filter((vr) => vr.overallConfidence === 'low').length;

  return {
    totalDataPoints: total,
    t1ToT3Count: t1ToT3,
    t1ToT3Percent: total > 0 ? Math.round((t1ToT3 / total) * 100) : 0,
    crossReferencedCount: crossRef,
    crossReferencedPercent: total > 0 ? Math.round((crossRef / total) * 100) : 0,
    flaggedCount: flagged,
    flaggedPercent: total > 0 ? Math.round((flagged / total) * 100) : 0,
  };
}
