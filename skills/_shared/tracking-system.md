# Tracking System Extension

Provides a file-based persistence mechanism for skills that operate across time periods (PDCA cycles, SMART goals). Enables longitudinal tracking of baselines, progress, and outcomes.

## When to Use

- **PDCA Cycle** — track cycle iterations, baselines, and outcomes over time
- **SMART Goals** — track goal progress, periodic reviews, and completion status
- Any skill where results need to be compared against a historical baseline

---

## File Structure

```
analysis-tracking/
├── pdca/
│   ├── [topic-slug]/
│   │   ├── cycle-001.md       # First PDCA cycle record
│   │   ├── cycle-002.md       # Second iteration
│   │   ├── baseline.json      # Original baseline metrics
│   │   └── status.md          # Current cycle status
│   └── ...
├── smart-goals/
│   ├── [goal-slug]/
│   │   ├── goal-definition.md  # SMART goal specification
│   │   ├── review-log.md       # Periodic review entries
│   │   └── status.md           # Current status
│   └── ...
└── index.md                    # Master index of all tracked items
```

---

## PDCA Cycle Tracking

### Baseline File (`baseline.json`)

```json
{
  "topic": "[improvement topic]",
  "created": "[ISO date]",
  "metrics": [
    {
      "name": "[metric name]",
      "unit": "[unit]",
      "baseline_value": [number],
      "target_value": [number],
      "measurement_method": "[how to measure]"
    }
  ]
}
```

### Cycle Record (`cycle-NNN.md`)

```markdown
---
cycle: 1
topic: "[topic]"
start_date: "[date]"
end_date: "[date]"
status: "completed"  # planning | executing | checking | completed | abandoned
---

# PDCA Cycle #1: [Topic]

## P — Plan
- **Problem**: [description]
- **Goal**: [SMART goal]
- **Root cause**: [from fishbone/3W]
- **Intervention**: [what change]
- **Metrics**:
  | Metric | Baseline | Target |
  |--------|----------|--------|
  | [name] | [value] | [value] |

## D — Do
- **Actions taken**: [description]
- **Execution period**: [dates]
- **Deviations**: [notes]

## C — Check
- **Results**:
  | Metric | Baseline | Target | Actual | Delta | Status |
  |--------|----------|--------|--------|-------|--------|
  | [name] | [value] | [value] | [value] | [±] | ✅/❌ |
- **Key learnings**: [insights]

## A — Act
- **Decision**: [standardize / adjust / abandon]
- **Standardized process**: [new procedure, if applicable]
- **Next cycle**: [focus area for cycle N+1]
```

### Status File (`status.md`)

```markdown
# PDCA Status: [Topic]

**Current Cycle**: #3
**Current Phase**: Check
**Last Updated**: [date]

## Cycle History
| Cycle | Start | End | Outcome | Key Metric Change |
|-------|-------|-----|---------|-------------------|
| #1 | [date] | [date] | Adjusted | [metric]: [before] → [after] |
| #2 | [date] | [date] | Standardized | [metric]: [before] → [after] |
| #3 | [date] | — | In progress | — |

## Cumulative Improvement
| Metric | Original Baseline | Current Value | Total Change |
|--------|------------------|---------------|-------------|
| [name] | [value] | [value] | [±value] ([±%]) |
```

---

## SMART Goal Tracking

### Goal Definition (`goal-definition.md`)

```markdown
---
goal_id: "[slug]"
created: "[date]"
deadline: "[date]"
status: "active"  # active | achieved | missed | abandoned
---

# SMART Goal: [Goal Statement]

**Specific**: [what exactly]
**Measurable**: [metric: baseline → target]
**Achievable**: [why it's realistic]
**Relevant**: [connects to which higher objective]
**Time-bound**: [deadline]

## Milestones
| # | Milestone | Target Date | Status |
|---|-----------|-------------|--------|
| 1 | [milestone] | [date] | ✅/⏳/❌ |
| 2 | [milestone] | [date] | ✅/⏳/❌ |
```

### Review Log (`review-log.md`)

```markdown
# Review Log: [Goal Statement]

## Review #1 — [Date]
- **Current metric value**: [value]
- **Progress**: [X]% toward target
- **On track?**: Yes / Behind / Ahead
- **Blockers**: [list]
- **Adjustments needed**: [none / description]

## Review #2 — [Date]
- **Current metric value**: [value]
- **Progress**: [X]%
- **On track?**: Yes / Behind / Ahead
- **Notes**: [observations]
```

---

## Master Index (`index.md`)

```markdown
# Analysis Tracking Index

Last updated: [date]

## Active PDCA Cycles
| Topic | Current Cycle | Phase | Last Update | Trend |
|-------|--------------|-------|-------------|-------|
| [topic] | #3 | Check | [date] | ↑ improving |

## Active SMART Goals
| Goal | Deadline | Progress | Status | Last Review |
|------|----------|----------|--------|-------------|
| [goal] | [date] | 65% | On track | [date] |

## Completed PDCA Cycles
| Topic | Cycles | Final Outcome | Duration |
|-------|--------|---------------|----------|
| [topic] | 5 | Standardized | 6 months |

## Achieved SMART Goals
| Goal | Achieved Date | Final Value |
|------|--------------|-------------|
| [goal] | [date] | [value] |
```

---

## Operations

### Starting a New PDCA Cycle
1. Create `analysis-tracking/pdca/[topic-slug]/` directory
2. Write `baseline.json` with original metric values
3. Create `cycle-001.md` from the PDCA skill output
4. Initialize `status.md`
5. Update `index.md`

### Completing a PDCA Cycle
1. Fill in Check and Act sections in the cycle file
2. Update `status.md` with cumulative metrics
3. If standardizing: document the new process
4. If continuing: create `cycle-NNN+1.md`
5. Update `index.md`

### Reviewing a SMART Goal
1. Append a new review entry to `review-log.md`
2. Update milestone statuses in `goal-definition.md`
3. Update `status.md` if goal is achieved/missed
4. Update `index.md`

## Rules

- Never overwrite historical cycle records — each cycle is a permanent record
- Baselines are immutable once set — if scope changes, start a new tracking series
- Status files are the only mutable files — update them freely
- Review SMART goals at the cadence defined in the goal (weekly, monthly, quarterly)
- If a metric cannot be measured, flag it immediately rather than estimating
