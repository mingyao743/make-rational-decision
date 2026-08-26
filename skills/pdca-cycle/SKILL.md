---
name: pdca-cycle
description: "Use this for continuous improvement of any process, product, or workflow. Implements the four-step Deming cycle: Plan (set goals) → Do (execute) → Check (verify results) → Act (standardize or correct). Drives iterative refinement."
---

# PDCA Cycle (Plan-Do-Check-Act)

A four-step iterative management method for continuous improvement of processes, products, and workflows.

## When to Use

- Process improvement initiatives
- Quality management and lean operations
- Iterative product development
- Change management rollouts
- Any workflow that needs ongoing refinement

## The Four Phases

```
         ┌──────────┐
         │  PLAN    │
         │          │
         │ Set goals │
         │ Design    │
         │ the plan  │
         └────┬─────┘
              │
              ▼
         ┌──────────┐
         │   DO     │
         │          │
         │ Execute   │
         │ the plan  │
         │ (small    │
         │  scale)   │
         └────┬─────┘
              │
              ▼
         ┌──────────┐
         │  CHECK   │
         │          │
         │ Measure   │
         │ results   │
         │ vs goals  │
         └────┬─────┘
              │
              ▼
         ┌──────────┐
         │   ACT     │
         │          │
         │ Standardize│
         │ success or │
         │ correct &  │
         │ restart    │
         └────┬─────┘
              │
              └──────▶ (next cycle)
```

## Phase Details

### P — Plan

Define the objective, identify the gap, and design a plan to close it.

- **Identify the problem or opportunity**: What needs improvement?
- **Set measurable goals**: What does success look like? (Use SMART criteria)
- **Analyze root causes**: Why does the current gap exist? (Use fishbone or 5-Whys)
- **Design the intervention**: What change will we test?
- **Define metrics**: How will we measure the outcome?
- **Plan the execution**: Who, when, where, how?

**Output**: A documented plan with goals, actions, metrics, and timeline.

### D — Do

Execute the plan, ideally on a small scale first.

- **Implement the change**: Execute according to the plan
- **Monitor execution**: Track deviations from the plan
- **Collect data**: Record quantitative and qualitative observations
- **Document issues**: Note any problems encountered during execution

**Output**: Execution results, raw data, and observation notes.

### C — Check

Compare actual results against planned goals.

- **Analyze the data**: Did the metrics improve as expected?
- **Compare to baseline**: What changed vs. the starting state?
- **Identify gaps**: Where did results fall short of expectations?
- **Surface unexpected outcomes**: What side effects appeared?
- **Assess statistical significance**: Is the improvement real or noise?

**Output**: A results assessment with quantitative comparison and qualitative findings.

### A — Act

Standardize successes or adjust and restart the cycle.

- **If goals were met**:
  - Standardize the new process (update documentation, train teams)
  - Communicate the improvement to stakeholders
  - Identify the next area for improvement (start a new PDCA cycle)
- **If goals were partially met**:
  - Identify what worked and what didn't
  - Adjust the plan based on learnings
  - Restart the PDCA cycle with refined approach
- **If goals were not met**:
  - Analyze why the intervention failed
  - Return to Plan phase with new understanding

**Output**: Standardized procedures, lessons learned, and the next cycle's plan.

## Output Format

```
## PDCA Cycle: [Improvement Topic]

### Cycle: #[N] — [Date Range]

#### P — Plan
- **Problem**: [What needs improvement]
- **Goal**: [SMART goal]
- **Root cause**: [Why the gap exists]
- **Intervention**: [What change to test]
- **Metrics**: [What to measure]
- **Baseline**: [Current metric values]

#### D — Do
- **Actions taken**: [What was executed]
- **Execution period**: [Dates]
- **Deviations**: [What differed from plan]
- **Observations**: [Qualitative notes]

#### C — Check
| Metric | Baseline | Target | Actual | Status |
|--------|----------|--------|--------|--------|
| [Metric 1] | [Value] | [Value] | [Value] | ✅/❌ |
| [Metric 2] | [Value] | [Value] | [Value] | ✅/❌ |

- **Unexpected outcomes**: [Side effects, surprises]
- **Key learnings**: [Insights gained]

#### A — Act
- **Decision**: [Standardize / Adjust / Abandon]
- **Standardization**: [New process documentation, if applicable]
- **Next cycle focus**: [What to improve next]
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid flowchart template for rendering the PDCA cycle with decision branching
- **`_shared/tracking-system.md`** — Essential for PDCA; provides file-based persistence for cycle records, baselines, and cumulative improvement tracking
- **`_shared/skill-workflows.md`** — Workflows 1, 4, 5, and 6 all use PDCA as the final execution + verification step
- **`_shared/examples-library.md`** — Example 8 shows a complete PDCA cycle with metrics tracking

## Rules

- Start small — test changes on a limited scale before full rollout
- Each cycle must have clearly defined, measurable goals (never "improve quality" — use "reduce defect rate from 5% to 2%")
- The Check phase must use real data, not subjective impressions
- Never skip the Act phase — without standardization, improvements are lost
- PDCA is cyclical, not linear — the end of one cycle feeds the beginning of the next
- Document every cycle, even failed ones — learning from failure is a core outcome
