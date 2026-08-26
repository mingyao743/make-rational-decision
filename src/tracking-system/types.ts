// ============================================================
// tracking-system/types.ts
// Type definitions for PDCA cycles and SMART goals tracking
// ============================================================

/** A single metric tracked across PDCA cycles */
export interface TrackedMetric {
  /** Metric name */
  name: string;
  /** Unit of measurement */
  unit: string;
  /** Original baseline value */
  baselineValue: number;
  /** Target value */
  targetValue: number;
  /** How the metric is measured */
  measurementMethod: string;
}

/** Baseline file (baseline.json) */
export interface Baseline {
  /** Improvement topic */
  topic: string;
  /** ISO date when baseline was created */
  created: string;
  /** Metrics being tracked */
  metrics: TrackedMetric[];
}

/** PDCA cycle phases */
export type PdcaPhase = 'planning' | 'executing' | 'checking' | 'completed' | 'abandoned';

/** Plan phase data */
export interface PdcaPlan {
  problem: string;
  goal: string;
  rootCause: string;
  intervention: string;
  metrics: Array<{ name: string; baseline: number; target: number }>;
}

/** Do phase data */
export interface PdcaDo {
  actionsTaken: string;
  executionPeriod: string;
  deviations: string;
}

/** Check phase data */
export interface PdcaCheck {
  results: Array<{
    metric: string;
    baseline: number;
    target: number;
    actual: number;
    status: 'pass' | 'fail';
  }>;
  unexpectedOutcomes: string;
  keyLearnings: string;
}

/** Act phase data */
export interface PdcaAct {
  decision: 'standardize' | 'adjust' | 'abandon';
  standardizedProcess: string;
  nextCycleFocus: string;
}

/** A complete PDCA cycle record */
export interface PdcaCycle {
  /** Cycle number (1-indexed) */
  cycle: number;
  /** Topic slug */
  topic: string;
  /** ISO start date */
  startDate: string;
  /** ISO end date (null if in progress) */
  endDate: string | null;
  /** Current status */
  status: PdcaPhase;
  /** Plan phase */
  plan: PdcaPlan;
  /** Do phase (filled when status >= executing) */
  do?: PdcaDo;
  /** Check phase (filled when status >= checking) */
  check?: PdcaCheck;
  /** Act phase (filled when status = completed) */
  act?: PdcaAct;
}

/** SMART goal status */
export type SmartStatus = 'active' | 'achieved' | 'missed' | 'abandoned';

/** A SMART goal milestone */
export interface SmartMilestone {
  description: string;
  targetDate: string;
  status: 'pending' | 'done' | 'failed';
}

/** SMART goal definition */
export interface SmartGoal {
  /** Unique slug */
  goalId: string;
  /** ISO creation date */
  created: string;
  /** Deadline */
  deadline: string;
  /** Current status */
  status: SmartStatus;
  /** The SMART goal statement */
  statement: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  /** Milestones */
  milestones: SmartMilestone[];
}

/** A periodic review entry */
export interface ReviewEntry {
  reviewNumber: number;
  date: string;
  currentMetricValue: number;
  progressPercent: number;
  onTrack: 'yes' | 'behind' | 'ahead';
  blockers: string[];
  adjustmentsNeeded: string;
}

/** Cumulative improvement for a single metric */
export interface CumulativeMetric {
  name: string;
  originalBaseline: number;
  currentValue: number;
  totalChange: number;
  totalChangePercent: number;
}

/** PDCA status summary */
export interface PdcaStatus {
  topic: string;
  currentCycle: number;
  currentPhase: PdcaPhase;
  lastUpdated: string;
  cycleHistory: Array<{
    cycle: number;
    start: string;
    end: string | null;
    outcome: string;
    keyMetricChange: string;
  }>;
  cumulativeImprovement: CumulativeMetric[];
}

/** Index entry for a tracked PDCA cycle */
export interface PdcaIndexEntry {
  topic: string;
  currentCycle: number;
  phase: PdcaPhase;
  lastUpdate: string;
  trend: 'improving' | 'stable' | 'declining';
}

/** Index entry for a tracked SMART goal */
export interface SmartIndexEntry {
  goal: string;
  deadline: string;
  progress: number;
  status: SmartStatus;
  lastReview: string | null;
}

/** Master index */
export interface MasterIndex {
  lastUpdated: string;
  activePdca: PdcaIndexEntry[];
  activeSmartGoals: SmartIndexEntry[];
  completedPdca: Array<{ topic: string; cycles: number; finalOutcome: string; duration: string }>;
  achievedGoals: Array<{ goal: string; achievedDate: string; finalValue: string }>;
}
