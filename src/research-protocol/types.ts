// ============================================================
// research-protocol/types.ts
// Type definitions for external data collection
// ============================================================

/** Source reliability tier (T1 = most authoritative) */
export type SourceTier = 'T1' | 'T2' | 'T3' | 'T4' | 'T5';

/** Effect of a data point on the analysis subject */
export type DataEffect = 'opportunity' | 'threat' | 'neutral';

/** Impact level */
export type ImpactLevel = 'high' | 'medium' | 'low';

/** Confidence level based on source quality and corroboration */
export type ConfidenceLevel = 'high' | 'medium' | 'low';

/** A single collected data point */
export interface DataPoint {
  /** Unique ID */
  id: string;
  /** Which skill this data point serves */
  skill: 'PEST' | 'SWOT' | 'BCG' | 'general';
  /** Dimension within the skill (e.g., "Political", "Opportunities") */
  dimension: string;
  /** The data point description */
  dataPoint: string;
  /** The value or finding */
  value: string;
  /** Source name */
  source: string;
  /** Source URL */
  url: string;
  /** Source reliability tier */
  tier: SourceTier;
  /** Publication date (ISO format, or null if unknown) */
  publishedDate: string | null;
  /** When this data point was collected */
  collectedAt: string;
  /** Effect on the subject */
  effect: DataEffect;
  /** Impact level */
  impact: ImpactLevel;
  /** Likelihood of occurrence */
  likelihood: 'high' | 'medium' | 'low';
  /** Confidence in this data point */
  confidence: ConfidenceLevel;
  /** What this data point implies for strategy */
  implication: string;
}

/** A data requirement definition */
export interface DataRequirement {
  skill: string;
  dimension: string;
  dataNeeded: string;
  priority: 'high' | 'medium' | 'low';
}

/** Result of validating a data point */
export interface ValidationResult {
  dataPointId: string;
  recency: boolean;
  relevance: boolean;
  credibility: boolean;
  specificity: boolean;
  independence: boolean;
  biasCheck: boolean;
  overallConfidence: ConfidenceLevel;
  issues: string[];
}

/** A data gap identified during collection */
export interface DataGap {
  dimension: string;
  missingData: string;
  impactOnAnalysis: ImpactLevel;
  recommendedAction: string;
}

/** A complete data collection report */
export interface CollectionReport {
  topic: string;
  collectionDate: string;
  timeframe: string;
  dataPoints: DataPoint[];
  validationResults: ValidationResult[];
  gaps: DataGap[];
  summary: {
    totalDataPoints: number;
    t1ToT3Count: number;
    t1ToT3Percent: number;
    crossReferencedCount: number;
    crossReferencedPercent: number;
    flaggedCount: number;
    flaggedPercent: number;
  };
}

/** Domain classification for source tier mapping */
export interface SourceTierRule {
  /** Domain patterns to match (e.g., "gov.cn", "gartner.com") */
  domains: string[];
  /** Tier assigned when domain matches */
  tier: SourceTier;
}
