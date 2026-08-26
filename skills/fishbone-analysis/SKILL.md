---
name: fishbone-analysis
description: "Use this to trace the root cause of a problem through structured cause-and-effect analysis. Also known as Ishikawa or cause-and-effect diagram. Organizes potential causes into 6M categories: Method, Man, Machine, Material, Environment, Management."
---

# Fishbone Diagram Analysis (Ishikawa / Cause-and-Effect)

A root cause analysis method that traces a problem backward through structured cause categories, visually resembling a fish skeleton.

## When to Use

- Quality defects and manufacturing issues
- Process failures and performance degradation
- Incidents and outages requiring root cause identification
- Any problem where the cause is unknown and multiple factors may contribute

## The 6M Categories

```
                    Method    Man
                      │        │
           ┌──────────┴──┐ ┌───┴────────┐
           │             │ │            │
           │  [Causes]   │ │  [Causes]  │
           │             │ │            │
           └─────────────┘ └────────────┘
                          │
  Management ──────────────┼─────────── Machine
           ┌─────────────┐ │ ┌────────────┐
           │  [Causes]   │ │ │  [Causes]  │
           └─────────────┘ │ └────────────┘
                           │
            Problem ──────▶│◀───── Material
                           │
           ┌─────────────┐ │ ┌────────────┐
           │  [Causes]   │ │ │  [Causes]  │
           └─────────────┘ │ └────────────┘
                           │
                       Environment
```

| Category | Questions to Ask |
|----------|-----------------|
| **Method** | Are the processes/procedures correct? Are they followed? Are they documented? |
| **Man (People)** | Was training adequate? Was fatigue a factor? Was skill level sufficient? Were instructions clear? |
| **Machine** | Is equipment functioning correctly? Is maintenance current? Are there calibration issues? |
| **Material** | Were raw materials within spec? Were components from approved suppliers? Were materials stored properly? |
| **Environment** | Were temperature/humidity/dust within limits? Was lighting adequate? Were there external disruptions? |
| **Management** | Were policies clear? Was supervision adequate? Were resources allocated properly? Was planning sufficient? |

## Process

1. **Define the problem statement** (the "head" of the fish)
   - Write a clear, specific problem description
   - Place it in a box on the right side of the diagram
   - Draw the main horizontal "spine" arrow pointing to the problem

2. **Draw the 6M category branches** (the "bones")
   - Draw diagonal lines from the spine for each of the 6 categories
   - Label each branch with the category name

3. **Brainstorm causes for each category**
   - For each category, ask: "What in this category could cause [problem]?"
   - Use 5-Whys technique to drill deeper on each cause
   - Add sub-causes as smaller branches off the main category bones

4. **Identify the most likely root causes**
   - Circle causes that appear in multiple categories (these are often key)
   - Highlight causes supported by evidence/data
   - Mark causes that, if addressed, would prevent recurrence

5. **Verify root causes**
   - Collect data to confirm or refute suspected causes
   - Test the causal link: "If we change X, does the problem go away?"

6. **Develop corrective actions**
   - For each confirmed root cause, define a specific corrective action
   - Prioritize by impact and feasibility

## Output Format

```
## Fishbone Analysis: [Problem Statement]

### Method
- [Cause 1] → [Sub-cause 1a] → [Sub-cause 1b]
- [Cause 2]

### Man (People)
- [Cause 1]
- [Cause 2] → [Sub-cause 2a]

### Machine
- [Cause 1]
- [Cause 2]

### Material
- [Cause 1]

### Environment
- [Cause 1]

### Management
- [Cause 1]
- [Cause 2]

### Root Causes Identified
| # | Root Cause | Category | Evidence | Corrective Action |
|---|-----------|----------|----------|-------------------|
| 1 | [Root cause] | Method | [Data/evidence] | [Action] |
| 2 | [Root cause] | Machine | [Data/evidence] | [Action] |

### Verification Plan
- [ ] [Verification step 1]
- [ ] [Verification step 2]
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid flowchart template for rendering an actual fishbone diagram
- **`_shared/skill-workflows.md`** — Workflow 1 (Problem-Solving Chain), Workflow 4 (Root Cause Investigation), and Workflow 6 (Quality Improvement Chain) all use Fishbone
- **`_shared/examples-library.md`** — Example 6 shows a complete fishbone analysis for a churn problem

## Rules

- The problem statement must be specific and measurable, not vague
- Brainstorming should be exhaustive — list every plausible cause before filtering
- Every cause on the diagram should answer "why does this lead to the problem?"
- Suspected causes must be verified with data before being declared root causes
- The 6M categories are a guide, not a constraint — add or rename categories if the domain requires it (e.g., in software: replace "Material" with "Data/Inputs")
