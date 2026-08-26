# Research Protocol Extension

Defines how to gather, validate, and cite external data for skills that require real-world information (PEST, SWOT, BCG Matrix).

## When to Use

- PEST Analysis — requires macro-economic, political, social, technological data
- SWOT Analysis — requires competitive intelligence and market data for O/T quadrants
- BCG Matrix — requires market growth rates and market share data
- Any skill where evidence-based claims need external sourcing

---

## Data Collection Framework

### Step 1: Define Data Needs

Before collecting data, list exactly what information each dimension requires:

```
## Data Requirements

| Skill | Dimension | Data Needed | Priority |
|-------|-----------|-------------|----------|
| PEST | Political | [Specific regulation/policy] | High |
| PEST | Economic | [GDP/inflation/interest rate] | High |
| SWOT | Opportunities | [Market trend/competitor gap] | Medium |
| BCG | Growth Rate | [Industry CAGR] | High |
```

### Step 2: Source Hierarchy

Use sources in priority order. Higher-tier sources are more authoritative.

| Tier | Source Type | Examples | Reliability |
|------|------------|----------|-------------|
| T1 | Government/Official | Statistics bureaus, regulatory bodies, central banks | ★★★★★ |
| T2 | Industry Research | Gartner, McKinsey, IDC, Goldman Sachs, industry associations | ★★★★☆ |
| T3 | Major Media | Reuters, Bloomberg, Financial Times, Wall Street Journal | ★★★★☆ |
| T4 | Specialized Media | Industry publications, trade journals, technical blogs | ★★★☆☆ |
| T5 | General Web | News articles, company websites, Wikipedia (as starting point only) | ★★☆☆☆ |

### Step 3: Collection Method

For each data point, follow this process:

1. **Search** — use targeted queries with specific terms
2. **Cross-reference** — find at least 2 independent sources (different tiers preferred)
3. **Timestamp** — record when the data was published/last updated
4. **Assess freshness** — reject data older than the timeframe defined in the analysis scope
5. **Extract** — pull the specific figure or fact, not the surrounding narrative
6. **Cite** — record source name, URL, publication date, and tier

### Step 4: Validation Checklist

Before incorporating data into an analysis, verify:

- [ ] **Recency**: Data is from within the analysis timeframe
- [ ] **Relevance**: Data directly relates to the dimension being analyzed
- [ ] **Credibility**: Source is T1-T3, or T4-T5 with corroboration
- [ ] **Specificity**: Data is specific enough to support a conclusion (not anecdotal)
- [ ] **Independence**: At least 2 sources agree (for critical claims)
- [ ] **Bias check**: Source has no obvious conflict of interest

---

## Output Format

### Data Collection Report

```
## Research Data Collection: [Analysis Topic]

**Collection Date**: [Date]
**Timeframe Scope**: [Period]
**Analyst**: [Name/Agent]

### Collected Data Points

#### PEST — Political
| # | Data Point | Value | Source | Tier | Published | URL |
|---|-----------|-------|--------|------|-----------|-----|
| 1 | [Regulation X] | [Description] | [Source name] | T1 | [Date] | [URL] |
| 2 | [Policy Y] | [Description] | [Source name] | T2 | [Date] | [URL] |

#### PEST — Economic
| # | Data Point | Value | Source | Tier | Published | URL |
|---|-----------|-------|--------|------|-----------|-----|
| 1 | GDP Growth | [Value]% | [Source] | T1 | [Date] | [URL] |
| 2 | Inflation Rate | [Value]% | [Source] | T1 | [Date] | [URL] |

#### SWOT — Opportunities
| # | Data Point | Value | Source | Tier | Published | URL |
|---|-----------|-------|--------|------|-----------|-----|
| 1 | [Market gap] | [Description] | [Source] | T2 | [Date] | [URL] |

#### BCG — Market Data
| # | Product | Market Growth | Rel. Share | Source | Tier |
|---|---------|---------------|------------|--------|------|
| 1 | [Product A] | [Value]% | [Value]x | [Source] | T2 |

### Validation Summary
- Total data points collected: [N]
- T1-T3 sources: [N] ([%])
- Cross-referenced (≥2 sources): [N] ([%])
- Flagged for uncertainty: [N] ([%])

### Data Gaps
| Dimension | Missing Data | Impact on Analysis | Recommended Action |
|-----------|-------------|-------------------|-------------------|
| [Dimension] | [What's missing] | [High/Medium/Low] | [How to obtain] |
```

---

## Handling Uncertainty

When data is incomplete or uncertain:

1. **Flag it** — mark the data point with a confidence level (High/Medium/Low)
2. **State assumptions** — if you must extrapolate, state the assumption explicitly
3. **Sensitivity check** — note whether the conclusion changes if the data point is off by ±20%
4. **Never fabricate** — if data doesn't exist, say so and mark the dimension as "insufficient data"

```
### Confidence Levels
🟢 High — T1-T2 source, cross-referenced, recent
🟡 Medium — T3 source or single-source T1-T2
🔴 Low — T4-T5 source, outdated, or extrapolated
```

## Rules

- Every claim in PEST/SWOT/BCG output must trace back to a cited data point
- "Common knowledge" is not a citation — if you can't find a source, flag it
- Data older than 12 months should be flagged as potentially stale
- Industry jargon or acronyms should be defined on first use
- When sources conflict, present both and explain the discrepancy
