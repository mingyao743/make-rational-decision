---
name: bcg-matrix
description: "Use this to evaluate a product or project portfolio and allocate resources. Maps items on market growth rate vs. relative market share to classify them as Stars, Cash Cows, Question Marks, or Dogs."
---

# BCG Matrix Analysis (Boston Consulting Group Matrix)

A portfolio analysis tool that classifies products, projects, or business units by market growth rate and relative market share to guide resource allocation.

## When to Use

- Product portfolio review and investment decisions
- Resource allocation across multiple projects or initiatives
- Identifying which products to invest in, harvest, or divest
- Strategic portfolio balancing

## The Four Quadrants

```
       High  ┌──────────────────┬──────────────────┐
             │                  │                  │
   Market    │    ★ STARS       │   ? QUESTION     │
   Growth    │                  │     MARKS        │
             │  Invest heavily  │  Selective       │
             │  to sustain      │  investment      │
             │  growth          │                  │
             ├──────────────────┼──────────────────┤
             │                  │                  │
             │   $ CASH COWS    │   🐶 DOGS        │
   Low       │                  │                  │
             │  Harvest profits  │  Consider       │
             │  Minimize        │  divesting       │
             │  investment      │                  │
             └──────────────────┴──────────────────┘
              High               Low
              
              Relative Market Share (vs. competitor)
```

## The Four Categories

| Category | Growth | Share | Strategy |
|----------|--------|-------|----------|
| **Stars** ⭐ | High | High | Invest to maintain growth and market leadership. Will become Cash Cows as growth slows. |
| **Cash Cows** 💰 | Low | High | Harvest profits with minimal investment. Fund Stars and Question Marks. |
| **Question Marks** ❓ | High | Low | Selective investment — some will become Stars, others will become Dogs. Requires careful evaluation. |
| **Dogs** 🐶 | Low | Low | Consider divesting or restructuring. May provide niche value but drains resources. |

## Process

1. **Define the scope**
   - What portfolio are you analyzing? (products, projects, business units, features)
   - What market/competitive context applies?

2. **Gather data for each item**
   - Market growth rate: industry CAGR, segment growth, or demand trend
   - Relative market share: your share vs. largest competitor's share
   - Revenue and profit contribution
   - Investment requirements

3. **Plot each item on the matrix**
   - X-axis: relative market share (high = dominant, low = minor player)
   - Y-axis: market growth rate (high = expanding, low = mature/declining)
   - Size of bubble = revenue or investment (optional but informative)

4. **Classify each item**
   - Assign each item to one of the four quadrants
   - Document the rationale for classification

5. **Develop portfolio strategy**
   - **Stars**: Continue investment, protect market position
   - **Cash Cows**: Optimize profitability, redirect excess cash to Stars/Question Marks
   - **Question Marks**: Evaluate each individually — invest in promising ones, divest unpromising ones
   - **Dogs**: Divest, restructure, or retain only if strategic value exists

6. **Balance the portfolio**
   - Ensure sufficient Cash Cows to fund Stars and Question Marks
   - Avoid over-investment in Dogs
   - Maintain a pipeline of Question Marks to feed future Stars

## Output Format

```
## BCG Matrix: [Portfolio Name]

### Portfolio Overview

| Item | Category | Market Growth | Rel. Share | Revenue | Recommendation |
|------|----------|---------------|------------|---------|----------------|
| [Item A] | ⭐ Star | 25% | 1.5x | $5M | Continue investment |
| [Item B] | 💰 Cash Cow | 3% | 2.0x | $10M | Harvest, fund Item A |
| [Item C] | ❓ Question Mark | 20% | 0.3x | $1M | Invest or divest? |
| [Item D] | 🐶 Dog | -2% | 0.1x | $0.5M | Divest |

### Strategic Resource Allocation
- **From Cash Cows**: $[amount] redirected to Stars and Question Marks
- **To Stars**: $[amount] for growth investment
- **To Question Marks**: $[amount] for selective bets
- **From Dogs**: Divest [items], reallocate $[amount]

### Portfolio Balance Assessment
- Cash generation: [Sufficient/Insufficient]
- Growth pipeline: [Healthy/Weak]
- Risk concentration: [Diversified/Concentrated]
```

## Extensions

This skill is enhanced by the following shared extensions:

- **`_shared/diagram-renderer.md`** — Mermaid quadrantChart template for rendering the BCG matrix
- **`_shared/research-protocol.md`** — Data collection methodology for market growth rates and market share figures
- **`_shared/skill-workflows.md`** — Workflow 2 (Strategy Chain) uses BCG Matrix for resource allocation
- **`_shared/examples-library.md`** — Example 7 shows a complete BCG matrix for a SaaS product portfolio

## Rules

- Market share is **relative** — it's your share divided by the leading competitor's share, not absolute percentage
- Growth rate threshold for "high" vs "low" should be defined explicitly (commonly 10% for the dividing line)
- Classification is a snapshot — positions shift over time as markets evolve
- The matrix informs but does not dictate strategy — consider qualitative factors alongside the quantitative classification
- A balanced portfolio needs items in all four quadrants, not just Stars and Cash Cows
