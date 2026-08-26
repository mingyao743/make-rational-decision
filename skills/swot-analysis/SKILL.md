---
name: swot-analysis
description: "Use this to evaluate a situation, project, or organization from internal (Strengths, Weaknesses) and external (Opportunities, Threats) dimensions. Ideal for strategic planning, competitive analysis, and go/no-go decisions."
---

# SWOT Analysis

Evaluate the current state and strategic position of a subject by examining internal and external factors across four quadrants.

## When to Use

- Strategic planning and business decisions
- Evaluating a new project, product, or initiative
- Competitive analysis and market positioning
- Personal or team capability assessment
- Go/no-go decision gates

## The Four Quadrants

```
                    Internal              External
                 ┌──────────────┐   ┌──────────────┐
                 │  STRENGTHS   │   │ OPPORTUNITIES│
   Positive     │              │   │              │
                 │ What we do   │   │ External     │
                 │ well         │   │ trends we    │
                 │              │   │ can leverage │
                 ├──────────────┤   ├──────────────┤
   Negative     │  WEAKNESSES  │   │   THREATS    │
                 │              │   │              │
                 │ Internal     │   │ External     │
                 │ gaps and     │   │ risks that   │
                 │ limitations  │   │ could harm   │
                 └──────────────┘   └──────────────┘
```

## Process

1. **Define the subject and objective**
   - What are you analyzing? (product, team, project, organization)
   - What decision will this analysis inform?

2. **Brainstorm each quadrant** (time-box each to 10-15 min)
   - Start with Strengths — build confidence and engagement
   - Move to Weaknesses — honest internal assessment
   - Then Opportunities — scan the external landscape
   - Finish with Threats — identify external risks

3. **Prioritize within each quadrant**
   - Rank items by impact (high/medium/low)
   - Focus on the top 3-5 items per quadrant

4. **Cross-analyze (TOWS matrix)**
   - S×O: How can strengths help capture opportunities?
   - S×T: How can strengths mitigate threats?
   - W×O: How can opportunities help overcome weaknesses?
   - W×T: How can we defend against threats exploiting weaknesses?

5. **Formulate strategy**
   - Translate cross-analysis insights into actionable strategies

## Output Format

```
## SWOT Analysis: [Subject]

**Objective**: [What decision this analysis informs]

### Strengths (Internal, Positive)
1. [Strength] — Impact: High
2. [Strength] — Impact: Medium
3. [Strength] — Impact: Low

### Weaknesses (Internal, Negative)
1. [Weakness] — Impact: High
2. [Weakness] — Impact: Medium

### Opportunities (External, Positive)
1. [Opportunity] — Impact: High
2. [Opportunity] — Impact: Medium

### Threats (External, Negative)
1. [Threat] — Impact: High
2. [Threat] — Impact: Medium

### Strategy (TOWS Cross-Analysis)
| Strategy | Type | Leveraged From |
|----------|------|----------------|
| [Strategy 1] | S×O | Strength 1 + Opportunity 1 |
| [Strategy 2] | W×T | Weakness 1 mitigation vs Threat 1 |
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid templates for rendering the SWOT quadrant chart and color-coded matrix
- **`_shared/research-protocol.md`** — Data collection methodology for the external O/T quadrants
- **`_shared/multi-input-protocol.md`** — Round-robin protocol for collecting SWOT input from multiple participants
- **`_shared/skill-workflows.md`** — Workflow 2 (Strategy Chain) and Workflow 3 (Decision Chain) use SWOT
- **`_shared/examples-library.md`** — Example 3 shows a complete SWOT with TOWS cross-analysis

## Rules

- Strengths and Weaknesses are **internal** — things within your control
- Opportunities and Threats are **external** — things outside your control
- Each item should be specific and evidence-based, not vague
- Avoid listing the same item in multiple quadrants — if it's both a strength and a weakness, split it into distinct items
- Prioritization is essential — a SWOT with 20 items per quadrant is useless; aim for 3-5 per quadrant
