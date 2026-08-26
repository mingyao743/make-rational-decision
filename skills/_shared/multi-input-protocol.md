# Multi-Input Protocol Extension

Defines how to collect, structure, and synthesize input from multiple participants or perspectives for skills that benefit from diverse viewpoints (Six Thinking Hats, SWOT, MECE validation).

## When to Use

- **Six Thinking Hats** — each hat represents a different perspective; ideally different people contribute
- **SWOT Analysis** — diverse perspectives prevent blind spots in S/W/O/T identification
- **MECE Analysis** — multiple reviewers can spot overlaps and gaps that a single person misses
- Any skill where a single analyst's perspective may be insufficient

---

## Input Collection Modes

### Mode 1: Sequential Interview (default)

Collect input from each participant one at a time, then synthesize.

```
Participant A → Participant B → Participant C → Synthesis
```

**Best for**: Small groups (2-5 people), in-person or chat-based sessions.

**Process**:
1. Pose the same question to each participant independently
2. Record their response without modification
3. After all responses are collected, synthesize into a unified view
4. Present synthesis back to all participants for validation

### Mode 2: Round-Robin

Each participant contributes to each dimension in turn.

```
              Dim 1    Dim 2    Dim 3
Person A  →   [input]  [input]  [input]
Person B  →   [input]  [input]  [input]
Person C  →   [input]  [input]  [input]
```

**Best for**: Six Thinking Hats (each hat = dimension), SWOT (each quadrant = dimension).

**Process**:
1. Define all dimensions (hats, quadrants, categories)
2. Person A contributes to Dim 1, then Person B to Dim 1, etc.
3. Rotate to Dim 2, repeat
4. No discussion during collection — pure input gathering
5. Discussion and synthesis happen after all inputs are collected

### Mode 3: Diverge-Converge

All participants brainstorm freely, then the facilitator structures the input.

```
All participants → Free-form input → Facilitator structures → Group validates
```

**Best for**: Large groups, open-ended problems, creative phases (Green Hat).

**Process**:
1. Open the floor for unstructured input on the topic
2. Collect all ideas without judgment or filtering
3. Facilitator organizes ideas into the skill's structure (hats, quadrants, categories)
4. Present organized structure to group for validation and refinement

---

## Role-Based Input Templates

### For Six Thinking Hats

Assign hat roles to participants based on their natural strengths, or rotate to force new perspectives:

```
## Hat Assignments

| Participant | Primary Hat | Secondary Hat |
|-------------|-------------|---------------|
| [Person A] | ⬜ White (Data) | ⚫ Black (Risk) |
| [Person B] | 🟡 Yellow (Optimism) | 🟢 Green (Creativity) |
| [Person C] | 🔴 Red (Emotion) | ⬜ White (Data) |
| [Facilitator] | 🔵 Blue (Process) | — |
```

**Input template per hat**:

```
### [Hat Color] Hat Input — [Participant Name]

**Perspective**: [hat role description]
**Key points**:
1. [point]
2. [point]
3. [point]
**Confidence**: High / Medium / Low
```

### For SWOT

Assign quadrant ownership, then cross-validate:

```
## SWOT Input Collection

### Round 1: Independent Assessment
Each participant fills ALL four quadrants independently:

**[Participant A]**
- S: [strengths they see]
- W: [weaknesses they see]
- O: [opportunities they see]
- T: [threats they see]

**[Participant B]**
- S: ...
- W: ...
- O: ...
- T: ...

### Round 2: Synthesis
Merge all inputs, identify consensus and disagreements:

| Quadrant | Consensus Items | Disagreements | Resolution |
|----------|----------------|---------------|------------|
| S | [agreed by all] | [A said X, B said Y] | [resolved how] |
| W | ... | ... | ... |

### Round 3: Validation
Present synthesized SWOT to all participants for final approval.
```

### For MECE Validation

Use multiple reviewers to test ME and CE independently:

```
## MECE Validation Protocol

### ME (Mutual Exclusive) Check
- Reviewer 1: "Can any item fit into two categories?"
- Reviewer 2: Same check, independently
- Compare results: if either finds an overlap, the structure needs revision

### CE (Collectively Exhaustive) Check
- Reviewer 3: "Is there anything that doesn't fit any category?"
- Reviewer 4: Same check with a different set of test items
- Compare results: if either finds a gap, add or redefine categories

### Agreement Threshold
- ME and CE must be confirmed by at least 2 independent reviewers
- Disagreements require discussion and structural revision
```

---

## Synthesis Protocol

When combining multiple inputs into a unified output:

### Step 1: De-duplicate
- Merge identical or near-identical points
- Keep the most precisely worded version

### Step 2: Categorize conflicts
- **Consensus**: All participants agree → include directly
- **Majority**: Most agree, some disagree → include with note
- **Split**: Equal disagreement → present both views, flag for discussion
- **Unique**: Only one person raised it → include if substantive, note as "individual perspective"

### Step 3: Weight by expertise
```
| Expertise Level | Weight |
|----------------|--------|
| Domain expert on this topic | 1.5x |
| Generalist / stakeholder | 1.0x |
| Outside perspective | 0.8x (valuable for blind spots, not for detail) |
```

### Step 4: Produce unified output
Format according to the parent skill's output template, adding attribution:

```
### [Dimension] — Synthesized
1. [point] *(consensus)*
2. [point] *(majority: A, B; dissent: C — "[C's objection]")*
3. [point] *(individual: D)*
```

---

## Output Format

```
## Multi-Input Session Record

**Skill**: [which skill was used]
**Participants**: [list with roles]
**Mode**: [Sequential / Round-Robin / Diverge-Converge]
**Date**: [date]

### Raw Inputs
[Stored per the templates above]

### Synthesis
[Merged output following the parent skill's format]

### Disagreements
| # | Topic | Positions | Resolution |
|---|-------|-----------|------------|
| 1 | [issue] | A: [view], B: [view] | [how resolved] |

### Participant Feedback
[Post-synthesis validation: did all participants agree with the synthesis?]
```

## Rules

- Raw inputs must be recorded before synthesis — never paraphrase during collection
- The facilitator (Blue Hat / synthesizer) does not contribute content, only structure
- Disagreements are valuable data — never suppress them in synthesis
- If a participant dominates, use Round-Robin mode to ensure equal contribution
- Time-box each collection round to prevent drift (typically 5-10 minutes per dimension)
