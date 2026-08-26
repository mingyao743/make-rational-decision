---
name: 3w-analysis
description: "Use this for rapid problem decomposition and action planning. Walks through What (current situation) → Why (root cause) → What next (concrete actions) in three clear steps."
---

# 3W Analysis

A simple yet powerful three-step framework for problem decomposition and decision-making: **What → Why → What next**.

## When to Use

- Quick problem triage and initial assessment
- Incident response and post-mortem analysis
- Situations requiring fast, structured thinking without heavy ceremony
- Kickoff discussions for new tasks or initiatives

## The Three Steps

### Step 1: What — Describe the Current Situation

Establish a clear, factual picture of what has happened or what is happening.

- What is the observable problem or event?
- What is the scope and impact?
- What is the current state vs. the expected state?

**Output**: A concise, factual statement of the situation.

### Step 2: Why — Identify the Cause

Dig into the reasons behind the situation.

- Why did this happen? (Ask "why" up to 5 times to reach root cause)
- Why is this a problem? (Understand the impact chain)
- Why wasn't it prevented? (Identify process gaps)

**Output**: Root cause(s) ranked by contribution to the problem.

### Step 3: What Next — Define Actions

Convert understanding into concrete next steps.

- What immediate actions are needed? (Containment)
- What corrective actions address the root cause? (Resolution)
- What preventive actions stop recurrence? (Prevention)

**Output**: A prioritized action list with owners and timelines.

## Process

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   WHAT      │────▶│    WHY      │────▶│  WHAT NEXT   │
│             │     │             │     │              │
│ What        │     │ Why did it  │     │ What actions │
│ happened?   │     │ happen?     │     │ are needed?  │
│             │     │             │     │              │
│ Fact-based  │     │ Cause-based │     │ Action-based │
│ description │     │ analysis    │     │ planning     │
└─────────────┘     └─────────────┘     └──────────────┘
```

## Output Format

```
## 3W Analysis: [Topic]

### What — Current Situation
- **Observation**: [What happened]
- **Impact**: [Who/what is affected]
- **Current vs. Expected**: [Gap description]

### Why — Root Cause
- **Direct cause**: [Immediate reason]
- **Root cause**: [Underlying reason, reached via 5-Whys]
- **Contributing factors**: [Secondary causes]

### What Next — Action Plan
| Priority | Action | Type | Owner | Timeline |
|----------|--------|------|-------|----------|
| P0 | [Action] | Containment | [Name] | [Date] |
| P1 | [Action] | Corrective | [Name] | [Date] |
| P2 | [Action] | Preventive | [Name] | [Date] |
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid template for rendering the 3W flow diagram
- **`_shared/skill-workflows.md`** — Workflow 1 (Problem-Solving Chain) and Workflow 4 (Root Cause Investigation) use 3W as a key step
- **`_shared/examples-library.md`** — Example 2 shows a complete 3W analysis

## Rules

- Step 1 (What) must be purely factual — no speculation or opinion
- Step 2 (Why) should drill to root cause, not stop at symptoms
- Step 3 (What next) must produce actionable items, not vague intentions
- Each step's output feeds directly into the next step's input
