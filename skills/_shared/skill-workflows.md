# Skill Workflows Extension

Defines natural chains and orchestration patterns between the 10 analysis skills. Use this when a single method is insufficient and multiple skills should be applied in sequence.

## When to Use

- Complex problems requiring multi-method analysis
- When a user's request spans problem identification, root cause, strategy, and execution
- When one skill's output naturally feeds another skill's input

---

## Workflow 1: Problem-Solving Chain

**Scenario**: A problem has occurred and you need to find root cause, plan fix, and track improvement.

```
MECE → Fishbone → 3W → SMART → PDCA
```

| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 1 | MECE | Unstructured problem description | Structured problem decomposition |
| 2 | Fishbone | Decomposed problem | Root cause(s) with evidence |
| 3 | 3W | Root cause | What happened → Why → What to do |
| 4 | SMART | Action items from 3W | Concrete, measurable goals |
| 5 | PDCA | SMART goals + plan | Execute, verify, standardize |

**Trigger**: "We have a problem and need to solve it end-to-end."

---

## Workflow 2: Strategy Formulation Chain

**Scenario**: You need to develop a strategic plan for a product, team, or organization.

```
PEST → SWOT → BCG Matrix → SMART → 5W2H
```

| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 1 | PEST | Market/industry context | External macro factors |
| 2 | SWOT | PEST findings + internal data | Strategic position assessment |
| 3 | BCG Matrix | Product/portfolio data | Resource allocation priorities |
| 4 | SMART | Strategic priorities | Concrete strategic goals |
| 5 | 5W2H | SMART goals | Detailed execution plan |

**Trigger**: "We need a strategy for [product/organization/initiative]."

---

## Workflow 3: Decision-Making Chain

**Scenario**: A decision needs to be made among options, with balanced evaluation.

```
Six Hats → SWOT → 3W
```

| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 1 | Six Hats | Decision options | Multi-perspective evaluation |
| 2 | SWOT | Leading option from Six Hats | Risk/benefit matrix |
| 3 | 3W | SWOT conclusion | Decision + rationale + actions |

**Trigger**: "We need to decide between [options]."

---

## Workflow 4: Root Cause Investigation

**Scenario**: An incident or defect occurred; you need thorough RCA before fixing.

```
3W (What) → Fishbone → 3W (Why → What Next) → PDCA
```

| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 1 | 3W — What only | Incident report | Factual situation description |
| 2 | Fishbone | Factual description | Categorized potential causes |
| 3 | 3W — Why + What Next | Verified root causes | Corrective action plan |
| 4 | PDCA | Action plan | Track fix effectiveness over time |

**Trigger**: "An incident occurred and we need root cause analysis."

---

## Workflow 5: Goal-to-Execution Chain

**Scenario**: A high-level goal needs to be broken down into executable plans.

```
SMART → MECE → 5W2H → PDCA
```

| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 1 | SMART | Vague aspiration | Well-formed goal |
| 2 | MECE | Well-formed goal | Decomposed sub-objectives |
| 3 | 5W2H | Each sub-objective | Detailed execution plan |
| 4 | PDCA | Execution plan | Iterative delivery with checkpoints |

**Trigger**: "We have a goal and need to make it happen."

---

## Workflow 6: Quality Improvement Chain

**Scenario**: Continuous quality improvement for a process or product.

```
Fishbone → 3W → SMART → PDCA → (loop)
```

| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 1 | Fishbone | Quality defect | Root cause |
| 2 | 3W | Root cause | Action plan |
| 3 | SMART | Action items | Measurable improvement goal |
| 4 | PDCA | Improvement plan | Execute → Check → Act |
| 5 | (loop) | PDCA Check results | Next Fishbone if new issues surface |

**Trigger**: "Quality is below target and we need continuous improvement."

---

## Workflow 7: Comprehensive Analysis

**Scenario**: Maximum-thoroughness analysis for a critical decision.

```
PEST → SWOT → Six Hats → MECE → BCG → SMART → 5W2H → PDCA
```

Use this only for high-stakes, one-time strategic decisions where the cost of analysis is justified.

**Trigger**: "This is a critical decision and we need maximum thoroughness."

---

## Orchestration Rules

1. **Sequential, not parallel** — each skill's output feeds the next skill's input. Do not skip ahead.
2. **Pass context forward** — when transitioning between skills, carry forward the previous skill's output as structured context.
3. **Checkpoint with user** — after each skill completes, present the output and confirm before proceeding to the next skill.
4. **Branching is allowed** — if a skill reveals the problem is different than expected, you may switch to a different workflow.
5. **Not every workflow needs all skills** — truncate workflows when the remaining steps add no value.
6. **Document the chain** — when using a workflow, state which workflow you're following and which step you're on.

## Transition Prompts

When moving from one skill to the next, use these transition prompts:

```
[Skill A] complete. Here's the summary:
[summary]

This feeds into [Skill B] because [reason].
Proceeding with [Skill B]...
```
