---
name: 5w2h-analysis
description: "Use this to thoroughly define a task, project, or plan by answering seven dimensions: Who, What, When, Where, Why, How, and How much. Ensures nothing is overlooked in planning and execution."
---

# 5W2H Analysis

A seven-dimension framework that ensures complete coverage of any task, plan, or problem by systematically answering: **Who, What, When, Where, Why, How, How much**.

## When to Use

- Project planning and kickoff
- Task definition and delegation
- Requirements gathering
- Process documentation
- Incident investigation
- Any situation where completeness matters

## The Seven Dimensions

| Dimension | Question | Focus |
|-----------|----------|-------|
| **Who** | Who is responsible? Who is involved? | People and roles |
| **What** | What is the task/deliverable? What is the scope? | Content and objectives |
| **When** | When does it start? When is the deadline? | Timeline and milestones |
| **Where** | Where will it happen? Where are the resources? | Location and context |
| **Why** | Why is this needed? What's the goal? | Purpose and motivation |
| **How** | How will it be done? What's the method? | Approach and process |
| **How much** | How much will it cost? How many resources? | Budget and quantity |

## Process

1. **Start with Why** — establish purpose before anything else
   - Without a clear "why", all other dimensions lack direction
   - Ask: What problem does this solve? What value does it create?

2. **Define What** — clarify the deliverable
   - What exactly needs to be produced or achieved?
   - What does "done" look like? (acceptance criteria)

3. **Identify Who** — assign ownership
   - Who is the responsible owner (single person)?
   - Who are the contributors and stakeholders?
   - Who needs to be informed?

4. **Determine When** — establish timeline
   - What is the start date and end date?
   - What are the key milestones?
   - What are the dependencies?

5. **Specify Where** — define context
   - Where will the work be performed? (physical/virtual)
   - Where are the inputs and resources located?
   - Where will the outputs be delivered?

6. **Plan How** — outline the approach
   - What is the step-by-step method?
   - What tools and processes will be used?
   - What are the potential obstacles and mitigations?

7. **Calculate How much** — quantify resources
   - What is the estimated cost?
   - How many people-hours are needed?
   - What materials or resources are required?

## Output Format

```
## 5W2H Analysis: [Task/Project Name]

### Why — Purpose
- **Goal**: [Why this task exists]
- **Value**: [Expected outcome/benefit]

### What — Deliverable
- **Scope**: [What is included]
- **Out of scope**: [What is explicitly excluded]
- **Acceptance criteria**: [Definition of done]

### Who — People
- **Owner**: [Single accountable person]
- **Contributors**: [Team members]
- **Stakeholders**: [Interested parties]

### When — Timeline
- **Start**: [Date]
- **Milestones**: [Key dates]
- **Deadline**: [Date]

### Where — Context
- **Location**: [Physical/virtual]
- **Resources**: [Where inputs come from]
- **Delivery**: [Where outputs go]

### How — Method
- **Approach**: [Step-by-step plan]
- **Tools**: [Required tools/systems]
- **Risks**: [Obstacles and mitigations]

### How Much — Resources
- **Budget**: [Cost estimate]
- **Effort**: [Person-hours/days]
- **Materials**: [Required resources]
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid mindmap template for rendering the 7 dimensions
- **`_shared/skill-workflows.md`** — Workflow 2 (Strategy Chain) and Workflow 5 (Goal-to-Execution Chain) use 5W2H as the final planning step
- **`_shared/examples-library.md`** — Example 4 shows a complete 5W2H for launching an AI feature

## Rules

- Every dimension must have a concrete answer — "TBD" is only acceptable during initial drafting
- "Who" must name a single accountable person, not a team or department
- "When" must include specific dates, not relative terms like "soon" or "ASAP"
- "How much" must include a numeric estimate, even if approximate
- If any dimension cannot be answered, it should be flagged as a risk
