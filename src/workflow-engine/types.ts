// ============================================================
// workflow-engine/types.ts
// Type definitions for skill workflow orchestration
// ============================================================

/** All available skill slugs */
export type SkillSlug =
  | 'mece-analysis'
  | 'fishbone-analysis'
  | '3w-analysis'
  | 'smart-goals'
  | 'pdca-cycle'
  | 'pest-analysis'
  | 'swot-analysis'
  | 'bcg-matrix'
  | '5w2h-analysis'
  | 'six-thinking-hats';

/** A single step in a workflow */
export interface WorkflowStep {
  /** Step number (1-indexed) */
  step: number;
  /** Skill to invoke at this step */
  skill: SkillSlug;
  /** What this step receives as input */
  input: string;
  /** What this step produces as output */
  output: string;
}

/** A workflow status */
export type StepStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';

/** A recorded step execution */
export interface StepExecution {
  step: number;
  skill: SkillSlug;
  status: StepStatus;
  /** Timestamp when step started */
  startedAt: string;
  /** Timestamp when step completed */
  completedAt: string | null;
  /** Output produced by this step */
  output: string | null;
  /** User confirmed before proceeding? */
  checkpointPassed: boolean;
}

/** A complete workflow definition */
export interface WorkflowDefinition {
  /** Unique workflow ID */
  id: string;
  /** Human-readable name */
  name: string;
  /** When to use this workflow */
  trigger: string;
  /** Ordered list of steps */
  steps: WorkflowStep[];
}

/** A workflow session (runtime state) */
export interface WorkflowSession {
  /** Session ID */
  id: string;
  /** Workflow definition ID */
  workflowId: string;
  /** Current step index (0-indexed, -1 = not started) */
  currentStepIndex: number;
  /** All step executions */
  executions: StepExecution[];
  /** Context accumulated across steps */
  context: Record<string, string>;
  /** Session status */
  status: 'active' | 'completed' | 'abandoned' | 'branched';
  /** ISO timestamp when session started */
  startedAt: string;
  /** ISO timestamp when session ended */
  endedAt: string | null;
  /** If branched, which workflow was switched to */
  branchedTo: string | null;
}
