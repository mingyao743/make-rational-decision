---
name: mece-analysis
description: "Use this to structure complex problems by decomposing them into mutually exclusive and collectively exhaustive categories. Eliminates overlaps and gaps in analysis. Foundation of consulting-grade structured thinking."
---

# MECE Analysis (Mutually Exclusive, Collectively Exhaustive)

A structuring principle for decomposing complex problems into categories that are **non-overlapping** and **complete** — the foundation of structured analytical thinking.

## When to Use

- Decomposing a complex problem into analyzable parts
- Building decision trees and issue trees
- Structuring data analysis or research frameworks
- Organizing categories, taxonomies, or classifications
- Preparing consulting-style presentations and analyses
- Any situation where clarity and completeness of categorization matter

## The Two Principles

### Mutually Exclusive (ME) — "No overlaps"

Each item belongs to exactly one category. Categories do not share elements.

**Violation example**: Splitting customers into "young," "urban," and "female" — a 25-year-old woman living in a city fits all three.

**ME fix**: Split by a single dimension — age brackets (under 25, 25-40, 40+) OR geography (urban, suburban, rural) OR gender (male, female, other), but never mix dimensions in the same level.

### Collectively Exhaustive (CE) — "No gaps"

The categories together cover everything in the universe being analyzed. Nothing falls outside the categories.

**Violation example**: Categorizing revenue as "product sales" and "services" — leaving out licensing or advertising revenue.

**CE fix**: Add a residual category ("other revenue") or restructure to cover all sources.

## Process

1. **Define the universe**
   - What is the total set of things you're categorizing?
   - State it explicitly: "We are categorizing all [X]"

2. **Choose a splitting dimension**
   - Pick ONE dimension to split by at each level
   - Common dimensions: time, geography, customer type, product line, cause type, process stage
   - Mixing dimensions at the same level breaks ME

3. **Split into 3-7 categories**
   - Fewer than 3 is too coarse; more than 7 is unwieldy
   - Aim for categories of similar granularity

4. **Test for Mutual Exclusivity**
   - Ask: "Can any item fit into two categories?"
   - If yes → redefine category boundaries or choose a different dimension

5. **Test for Collective Exhaustiveness**
   - Ask: "Is there anything that doesn't fit any category?"
   - If yes → add a category, broaden existing ones, or add a residual "other"

6. **Drill deeper (optional)**
   - Apply MECE recursively to sub-categories
   - Each level should use its own consistent dimension

7. **Validate with examples**
   - Take 5-10 concrete items and verify each fits exactly one category

## MECE Issue Trees

For problem-solving, build a top-down issue tree:

```
                    [Problem: Revenue declined]
                           /          \
              Volume dropped         Price dropped
              /        \              /        \
         Lost      Fewer units   Discounting   Mix shift
        customers   per customer   increased    to cheaper
        /    \         /    \        products
     Churn  New      Lower    Fewer
     rate   customer  purchase  visits
            growth   frequency
```

Each branch is MECE within its parent. The leaves represent actionable hypotheses.

## Output Format

```
## MECE Analysis: [Problem/Topic]

### Universe Definition
All [X] being categorized.

### Structure (Dimension: [chosen dimension])

Level 1:
├── Category A ([dimension value])
│   ├── Sub-category A1 (sub-dimension: [value])
│   └── Sub-category A2 (sub-dimension: [value])
├── Category B ([dimension value])
│   ├── Sub-category B1
│   └── Sub-category B2
└── Category C ([dimension value])

### ME Check
- [Category A] ∩ [Category B] = ∅ ✓
- [Category B] ∩ [Category C] = ∅ ✓
- [Category A] ∩ [Category C] = ∅ ✓

### CE Check
- Known items: [list] → all assigned ✓
- Edge cases: [list] → all assigned ✓
- Residual category needed: Yes/No

### Validation
| Test Item | Assigned Category | Unique? |
|-----------|-------------------|---------|
| [Item 1] | [Category] | ✅ |
| [Item 2] | [Category] | ✅ |
```

## Common MECE Frameworks

| Framework | Dimension | Categories |
|-----------|-----------|------------|
| Profit tree | First split | Revenue vs. Cost |
| 3Cs (strategy) | Stakeholder type | Company, Customer, Competitor |
| Internal/External | Origin of factor | Internal (controllable) vs. External (given) |
| Value chain | Process stage | Design → Source → Make → Deliver → Return |
| Funnel | Conversion stage | Awareness → Interest → Consideration → Purchase → Retention |

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid mindmap and flowchart templates for rendering MECE issue trees
- **`_shared/multi-input-protocol.md`** — Validation protocol using multiple reviewers to independently test ME and CE
- **`_shared/skill-workflows.md`** — Workflow 1 (Problem-Solving Chain) uses MECE as the first step to structure the problem
- **`_shared/examples-library.md`** — Example 10 shows a MECE decomposition of revenue growth factors

## Rules

- One dimension per level — mixing dimensions is the #1 MECE violation
- Always include a test of both ME and CE — don't assume
- If you can't achieve perfect MECE, document the known overlap or gap rather than hiding it
- A residual "other" category is acceptable for CE, but if it's more than ~10% of the total, the categorization needs rethinking
- The same problem can be decomposed MECE-ly in multiple ways — choose the dimension most relevant to the decision
- MECE is a thinking tool, not a rigid framework — pragmatism over purity when the goal is insight
