---
name: smart-goals
description: "Use this to define or evaluate goals against five criteria: Specific, Measurable, Achievable, Relevant, Time-bound. Transforms vague aspirations into actionable, verifiable objectives."
---

# SMART Goal Analysis

A framework for setting and evaluating goals against five criteria to ensure they are clear, actionable, and verifiable.

## When to Use

- Goal setting for individuals, teams, or organizations
- Performance management and OKR definition
- Project objective definition
- Evaluating whether an existing goal is well-formed
- Converting vague aspirations into concrete commitments

## The Five Criteria

| Criterion | Question | Test |
|-----------|----------|------|
| **S**pecific | What exactly will be accomplished? | Can a stranger understand the goal without context? |
| **M**easurable | How will progress and success be tracked? | Is there a numeric metric with a target value? |
| **A**chievable | Is it realistic given current resources? | Is there a credible path from here to the goal? |
| **R**elevant | Does it matter to the broader objective? | Does achieving this goal advance the mission? |
| **T**ime-bound | When will it be completed? | Is there a specific deadline? |

## Process

1. **Draft the goal statement**
   - Start with a plain-language description of what you want to achieve

2. **Evaluate against each criterion**
   - Walk through S-M-A-R-T in order
   - For each criterion, ask the test question
   - If the goal fails any test, revise it

3. **Revise and refine**
   - Rewrite the goal until it passes all five criteria
   - Each revision should make the goal more concrete

4. **Finalize**
   - Produce a single sentence goal statement that satisfies all criteria
   - Document the metrics, baseline, and verification method

5. **Review periodically**
   - Re-assess achievability and relevance as conditions change
   - Adjust the goal if the environment has shifted significantly

## Common Failures and Fixes

| Failure | Example | Fix |
|---------|---------|-----|
| Not Specific | "Improve customer satisfaction" | "Increase CSAT score from 7.2 to 8.5 for the checkout flow" |
| Not Measurable | "Build a better team" | "Hire 3 senior engineers and reduce attrition from 18% to 10%" |
| Not Achievable | "Become #1 in the market this quarter" | "Increase market share from 12% to 15% by Q4" |
| Not Relevant | "Learn Rust" (when the project uses Python) | "Learn advanced Python asyncio for the migration project" |
| Not Time-bound | "Reduce technical debt" | "Reduce P1 bugs from 40 to under 10 by end of Q3 2026" |

## Output Format

```
## SMART Goal Analysis

### Original Goal Statement
[The initial, possibly vague goal]

### Evaluation

| Criterion | Question | Answer | Pass? |
|-----------|----------|--------|-------|
| Specific | What exactly? | [Answer] | ✅/❌ |
| Measurable | How tracked? | [Answer] | ✅/❌ |
| Achievable | Realistic? | [Answer] | ✅/❌ |
| Relevant | Matters? | [Answer] | ✅/❌ |
| Time-bound | Deadline? | [Answer] | ✅/❌ |

### Revised SMART Goal
[The refined goal statement that passes all criteria]

### Success Metrics
- **Primary metric**: [Metric name] — Baseline: [value] → Target: [value]
- **Secondary metric**: [Metric name] — Baseline: [value] → Target: [value]
- **Verification method**: [How success will be confirmed]
- **Deadline**: [Date]

### Risk to Achievement
| Risk | Mitigation |
|------|------------|
| [Risk 1] | [Mitigation] |
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/tracking-system.md`** — Essential for SMART; provides goal definition files, review logs, and status tracking for periodic re-evaluation
- **`_shared/skill-workflows.md`** — Workflows 1, 2, 5, and 6 use SMART to convert analysis output into concrete goals
- **`_shared/examples-library.md`** — Example 9 shows transforming a vague goal into a SMART goal

## Rules

- "Measurable" requires a number — if you can't attach a metric, the goal isn't SMART
- "Achievable" means there's a credible plan, not that it's easy — goals should stretch but not break
- "Relevant" connects upward — the goal must serve a higher-level objective, not exist in isolation
- "Time-bound" means a specific calendar date, not "eventually" or "this year"
- A goal that fails any single criterion is not a SMART goal — all five are mandatory
- Goals should be re-evaluated at regular intervals — a SMART goal from 6 months ago may no longer be relevant
