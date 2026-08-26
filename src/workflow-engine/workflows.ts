// ============================================================
// workflow-engine/workflows.ts
// 7 pre-defined workflow chains
// ============================================================

import type { WorkflowDefinition } from './types.js';

/** All pre-defined workflows */
export const WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'problem-solving',
    name: 'Problem-Solving Chain',
    trigger: 'A problem has occurred and you need to solve it end-to-end.',
    steps: [
      { step: 1, skill: 'mece-analysis', input: 'Unstructured problem description', output: 'Structured problem decomposition' },
      { step: 2, skill: 'fishbone-analysis', input: 'Decomposed problem', output: 'Root cause(s) with evidence' },
      { step: 3, skill: '3w-analysis', input: 'Root cause', output: 'What happened → Why → What to do' },
      { step: 4, skill: 'smart-goals', input: 'Action items from 3W', output: 'Concrete, measurable goals' },
      { step: 5, skill: 'pdca-cycle', input: 'SMART goals + plan', output: 'Execute, verify, standardize' },
    ],
  },
  {
    id: 'strategy-formulation',
    name: 'Strategy Formulation Chain',
    trigger: 'You need to develop a strategic plan for a product, team, or organization.',
    steps: [
      { step: 1, skill: 'pest-analysis', input: 'Market/industry context', output: 'External macro factors' },
      { step: 2, skill: 'swot-analysis', input: 'PEST findings + internal data', output: 'Strategic position assessment' },
      { step: 3, skill: 'bcg-matrix', input: 'Product/portfolio data', output: 'Resource allocation priorities' },
      { step: 4, skill: 'smart-goals', input: 'Strategic priorities', output: 'Concrete strategic goals' },
      { step: 5, skill: '5w2h-analysis', input: 'SMART goals', output: 'Detailed execution plan' },
    ],
  },
  {
    id: 'decision-making',
    name: 'Decision-Making Chain',
    trigger: 'A decision needs to be made among options, with balanced evaluation.',
    steps: [
      { step: 1, skill: 'six-thinking-hats', input: 'Decision options', output: 'Multi-perspective evaluation' },
      { step: 2, skill: 'swot-analysis', input: 'Leading option from Six Hats', output: 'Risk/benefit matrix' },
      { step: 3, skill: '3w-analysis', input: 'SWOT conclusion', output: 'Decision + rationale + actions' },
    ],
  },
  {
    id: 'root-cause-investigation',
    name: 'Root Cause Investigation',
    trigger: 'An incident or defect occurred; you need thorough RCA before fixing.',
    steps: [
      { step: 1, skill: '3w-analysis', input: 'Incident report (What only)', output: 'Factual situation description' },
      { step: 2, skill: 'fishbone-analysis', input: 'Factual description', output: 'Categorized potential causes' },
      { step: 3, skill: '3w-analysis', input: 'Verified root causes (Why + What Next)', output: 'Corrective action plan' },
      { step: 4, skill: 'pdca-cycle', input: 'Action plan', output: 'Track fix effectiveness over time' },
    ],
  },
  {
    id: 'goal-to-execution',
    name: 'Goal-to-Execution Chain',
    trigger: 'A high-level goal needs to be broken down into executable plans.',
    steps: [
      { step: 1, skill: 'smart-goals', input: 'Vague aspiration', output: 'Well-formed goal' },
      { step: 2, skill: 'mece-analysis', input: 'Well-formed goal', output: 'Decomposed sub-objectives' },
      { step: 3, skill: '5w2h-analysis', input: 'Each sub-objective', output: 'Detailed execution plan' },
      { step: 4, skill: 'pdca-cycle', input: 'Execution plan', output: 'Iterative delivery with checkpoints' },
    ],
  },
  {
    id: 'quality-improvement',
    name: 'Quality Improvement Chain',
    trigger: 'Continuous quality improvement for a process or product.',
    steps: [
      { step: 1, skill: 'fishbone-analysis', input: 'Quality defect', output: 'Root cause' },
      { step: 2, skill: '3w-analysis', input: 'Root cause', output: 'Action plan' },
      { step: 3, skill: 'smart-goals', input: 'Action items', output: 'Measurable improvement goal' },
      { step: 4, skill: 'pdca-cycle', input: 'Improvement plan', output: 'Execute → Check → Act → loop' },
    ],
  },
  {
    id: 'comprehensive-analysis',
    name: 'Comprehensive Analysis',
    trigger: 'Critical, high-stakes decision requiring maximum thoroughness.',
    steps: [
      { step: 1, skill: 'pest-analysis', input: 'Macro environment context', output: 'External factors (P/E/S/T)' },
      { step: 2, skill: 'swot-analysis', input: 'PEST + internal data', output: 'Strategic position' },
      { step: 3, skill: 'six-thinking-hats', input: 'Strategic options', output: 'Multi-perspective evaluation' },
      { step: 4, skill: 'mece-analysis', input: 'Decision space', output: 'Structured decomposition' },
      { step: 5, skill: 'bcg-matrix', input: 'Portfolio data', output: 'Resource allocation' },
      { step: 6, skill: 'smart-goals', input: 'Strategic priorities', output: 'Concrete goals' },
      { step: 7, skill: '5w2h-analysis', input: 'Goals', output: 'Execution plan' },
      { step: 8, skill: 'pdca-cycle', input: 'Plan', output: 'Iterative delivery' },
    ],
  },
];

/** Get a workflow definition by ID */
export function getWorkflow(id: string): WorkflowDefinition | undefined {
  return WORKFLOWS.find((wf) => wf.id === id);
}

/** List all workflow IDs and names */
export function listWorkflows(): Array<{ id: string; name: string; trigger: string; stepCount: number }> {
  return WORKFLOWS.map((wf) => ({
    id: wf.id,
    name: wf.name,
    trigger: wf.trigger,
    stepCount: wf.steps.length,
  }));
}

/** Find workflows that contain a specific skill */
export function findWorkflowsContaining(skill: string): WorkflowDefinition[] {
  return WORKFLOWS.filter((wf) => wf.steps.some((s) => s.skill === skill));
}
