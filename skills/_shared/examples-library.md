# Worked Examples Library

Concrete applications of all 10 analysis methods to a single running scenario, so you can see how each method works in practice and how they connect.

## Running Scenario

**Company**: TechFlow Solutions — a mid-size SaaS company (200 employees, $15M ARR) providing project management software for engineering teams.

**Current Situation**: Customer churn rate has increased from 3% to 7% over the past two quarters, threatening growth targets.

---

## Example 1: Six Thinking Hats

**Topic**: Should TechFlow pivot to an AI-first product strategy?

### ⬜ White Hat — Facts
- Current churn: 7% (up from 3%)
- 60% of churned customers cite "missing AI features"
- 3 competitors launched AI features in the past 6 months
- Engineering team: 40 people, 0 with ML/AI experience
- Cash runway: 18 months at current burn rate
- Data: 2TB of project management data from 5,000 customers

### 🔴 Red Hat — Emotions
- CEO feels urgent pressure — "we're falling behind"
- Engineering team feels anxious about learning new skills
- Sales team is excited — "AI is what prospects ask about"
- Customer success feels relieved — "finally addressing the #1 complaint"

### ⚫ Black Hat — Risks
- Hiring AI talent is expensive ($200K+ per engineer) and competitive
- Pivot could alienate existing customers who value simplicity
- 18-month runway is tight for a major platform shift
- AI features may not meet expectations → worse churn
- Regulatory uncertainty around AI data usage

### 🟡 Yellow Hat — Benefits
- First-mover advantage in vertical AI for engineering PM
- Existing 2TB dataset is a competitive moat
- Higher pricing tiers justified by AI features
- Could re-energize the brand and attract talent
- Opens adjacent markets (AI consulting, analytics)

### 🟢 Green Hat — Creativity
- Partner with an AI company instead of building in-house
- Launch AI features as a separate product (not a pivot)
- Open-source the AI layer to attract community contributions
- Acquire a small AI startup for talent + technology
- Offer AI as an API — monetize the data advantage

### 🔵 Blue Hat — Conclusion
- Full pivot is too risky given 18-month runway
- Recommendation: phased approach — hire 2-3 AI engineers, launch one AI feature (smart task prioritization) in Q1, validate, then expand
- Green Hat's "partner" idea deserves a parallel exploration
- Decision deadline: end of this month

---

## Example 2: 3W Analysis

**Topic**: Customer churn increased from 3% to 7%

### What — Current Situation
- **Observation**: Monthly churn rate rose from 3% (Q1) to 7% (Q3)
- **Impact**: Losing ~350 customers/month vs. previous ~150/month; $200K/month recurring revenue at risk
- **Current vs. Expected**: Expected churn ≤ 3%; actual 7% — 2.3x over target

### Why — Root Cause
- **Direct cause**: Customers are leaving for competitors with AI features (60% of exit interviews cite this)
- **Root cause**: TechFlow has not invested in AI/ML capabilities; product roadmap was focused on UI improvements while market shifted
- **Contributing factors**: Pricing increased 15% in Q2 without new features; competitor launched freemium AI plan

### What Next — Action Plan

| Priority | Action | Type | Owner | Timeline |
|----------|--------|------|-------|----------|
| P0 | Freeze price increase for at-risk accounts | Containment | VP Sales | 1 week |
| P0 | Ship AI task prioritization (MVP) | Corrective | VP Eng | 8 weeks |
| P1 | Hire 3 AI engineers | Corrective | Head of HR | 12 weeks |
| P2 | Establish customer advisory board | Preventive | CEO | 4 weeks |
| P2 | Quarterly competitive feature audit | Preventive | VP Product | Ongoing |

---

## Example 3: SWOT Analysis

**Subject**: TechFlow Solutions — current strategic position

### Strengths (Internal, Positive)
1. Strong brand loyalty in engineering segment (NPS 52) — Impact: High
2. 2TB proprietary project data — Impact: High
3. Profitable with 18-month runway — Impact: Medium
4. Experienced engineering team (avg. 6 years tenure) — Impact: Medium

### Weaknesses (Internal, Negative)
1. Zero AI/ML expertise on team — Impact: High
2. Legacy monolithic architecture slows shipping — Impact: High
3. No enterprise sales motion (only self-serve) — Impact: Medium
4. Single product, no diversification — Impact: Medium

### Opportunities (External, Positive)
1. Market shift toward AI-powered tools — Impact: High
2. Engineering PM market growing 25% YoY — Impact: High
3. Enterprise customers willing to pay 3x for AI features — Impact: Medium
4. AI talent becoming more available (layoffs at big tech) — Impact: Medium

### Threats (External, Negative)
1. 3 competitors launched AI features in 6 months — Impact: High
2. Economic downturn reducing SaaS budgets — Impact: Medium
3. Open-source alternatives gaining traction — Impact: Medium
4. AI regulation may limit data usage — Impact: Low

### Strategy (TOWS Cross-Analysis)
| Strategy | Type | Leveraged From |
|----------|------|----------------|
| Build AI features leveraging existing data moat | S×O | Strength 2 + Opportunity 1 |
| Hire laid-off AI talent from big tech | W×O | Weakness 1 + Opportunity 4 |
| Use brand loyalty to retain customers during AI gap | S×T | Strength 1 + Threat 1 |
| Accelerate architecture refactoring to ship faster | W×T | Weakness 2 + Threat 1 |

---

## Example 4: 5W2H Analysis

**Task**: Launch AI task prioritization feature (MVP)

### Why — Purpose
- **Goal**: Reduce churn by addressing the #1 reason customers leave
- **Value**: Retain ~$200K/month at-risk revenue; position for upsell

### What — Deliverable
- **Scope**: ML model that ranks tasks by urgency/importance based on project context
- **Out of scope**: Natural language processing, automated assignment, reporting
- **Acceptance criteria**: Model achieves ≥75% agreement with human prioritization on test set

### Who — People
- **Owner**: Sarah Chen, VP Engineering
- **Contributors**: 2 backend engineers, 1 data engineer (to be hired)
- **Stakeholders**: VP Product, VP Sales, Customer Success lead

### When — Timeline
- **Start**: Oct 1, 2026
- **Milestones**:
  - Oct 15: Data pipeline ready
  - Nov 1: Model v1 trained
  - Nov 15: Beta with 20 customers
  - Dec 1: GA release
- **Deadline**: Dec 1, 2026

### Where — Context
- **Location**: Remote, primary team in Seattle
- **Resources**: Existing AWS infrastructure; 2TB customer data in PostgreSQL
- **Delivery**: Feature-flagged rollout, all tiers

### How — Method
- **Approach**: Fine-tune open-source ranking model on anonymized customer data
- **Tools**: Python, PyTorch, AWS SageMaker, existing CI/CD pipeline
- **Risks**: Model accuracy below target → fallback to rule-based ranking

### How Much — Resources
- **Budget**: $80K (including $40K hiring bonus, $20K cloud compute, $20K tools)
- **Effort**: 3 engineers × 2 months = 6 person-months
- **Materials**: 1 GPU instance (p3.2xlarge), labeling tool license

---

## Example 5: PEST Analysis

**Subject**: TechFlow Solutions — AI-first strategy feasibility
**Timeframe**: 2026–2027

### P — Political Factors
| Factor | Impact | Likelihood | Effect | Implication |
|--------|--------|------------|--------|-------------|
| EU AI Act classification of PM tools as "limited risk" | Medium | High | Threat | Compliance overhead for EU customers |
| US federal AI guidelines (expected Q1 2027) | Medium | Medium | Threat | May restrict training data usage |
| Data sovereignty laws (existing + new) | High | High | Threat | Must host regional data separately |

### E — Economic Factors
| Factor | Impact | Likelihood | Effect | Implication |
|--------|--------|------------|--------|-------------|
| SaaS budget cuts due to economic slowdown | High | High | Threat | Customers downgrading tiers |
| AI talent costs decreasing (tech layoffs) | Medium | High | Opportunity | Cheaper to hire AI engineers |
| Cloud computing costs declining 15%/year | Low | High | Opportunity | Lower ML training costs |

### S — Social Factors
| Factor | Impact | Likelihood | Effect | Implication |
|--------|--------|------------|--------|-------------|
| Expectation of AI in all software products | High | High | Opportunity | Market pull for AI features |
| Skepticism about AI reliability in work tools | Medium | Medium | Threat | Need transparency/explainability |
| Remote work normalization sustaining PM tool demand | High | High | Opportunity | Market continues growing |

### T — Technological Factors
| Factor | Impact | Likelihood | Effect | Implication |
|--------|--------|------------|--------|-------------|
| Open-source LLMs reaching commercial quality | High | High | Opportunity | Don't need to build models from scratch |
| Vector database maturation | Medium | High | Opportunity | Easier to build search/retrieval features |
| AI agent frameworks (LangChain, etc.) rapidly evolving | Medium | High | Threat | Framework churn risk |

### Key Findings
1. Data sovereignty laws (P) + AI guidelines (P) → must design multi-region architecture from day one
2. AI talent availability (E) + open-source LLMs (T) → build don't buy; hire don't outsource
3. Market expectation of AI (S) → first-mover in vertical AI is time-sensitive

---

## Example 6: Fishbone Analysis

**Problem Statement**: Churn rate increased from 3% to 7% in two quarters

### Method
- Onboarding process doesn't highlight advanced features → Users never reach "aha" moment
- No in-app guidance for new AI features (competitors have interactive tours)

### Man (People)
- Customer success team understaffed (3 CSMs for 5,000 customers) → Proactive retention impossible
- No dedicated churn analysis role → Churn signals missed

### Machine
- Analytics dashboard doesn't show real-time churn risk scores → Can't intervene early
- Notification system can't trigger automated win-back campaigns

### Material
- Exit survey only captures free-text, no structured data → Hard to identify patterns
- No customer health scoring model → Can't predict churn

### Environment
- Competitor launched aggressive freemium AI plan → Price-sensitive customers pulled away
- Economic downturn → Companies cutting SaaS spend

### Management
- Roadmap prioritized UI polish over AI features → Misaligned with market demand
- No quarterly competitive review process → Blind to competitor moves
- Pricing increased 15% without new value → Triggered price-sensitive churn

### Root Causes Identified
| # | Root Cause | Category | Evidence | Corrective Action |
|---|-----------|----------|----------|-------------------|
| 1 | No AI features while market expects them | Management | 60% exit interviews cite this | Ship AI MVP in 8 weeks |
| 2 | Price increase without new value | Management | Churn spike coincides with Q2 price hike | Rollback for at-risk accounts |
| 3 | No churn prediction system | Machine/Method | No early warning detected | Build health scoring model |
| 4 | CSM understaffed | Man | 1:1,667 ratio (industry avg 1:500) | Hire 3 CSMs |

---

## Example 7: BCG Matrix

**Portfolio**: TechFlow's product lineup

| Product | Category | Market Growth | Rel. Share | Revenue | Recommendation |
|---------|----------|---------------|------------|---------|----------------|
| Core PM (Pro tier) | 💰 Cash Cow | 5% | 1.8x | $8M | Harvest; fund AI development |
| Core PM (Team tier) | ⭐ Star | 22% | 1.2x | $4M | Continue investment; add AI features |
| Mobile app | ❓ Question Mark | 30% | 0.4x | $1.5M | Invest if AI features drive mobile usage |
| Analytics add-on | 🐶 Dog | 2% | 0.2x | $0.8M | Sunset; fold key features into core |
| Enterprise tier | ❓ Question Mark | 18% | 0.3x | $0.7M | Selective investment; add AI + SSO |

### Strategic Resource Allocation
- **From Cash Cows**: $2M redirected from Pro tier profits to AI development
- **To Stars**: $1.5M for Team tier AI features (primary growth engine)
- **To Question Marks**: $0.5M for Mobile AI pilot; $0.3M for Enterprise pilot
- **From Dogs**: Sunset Analytics add-on, reallocate $0.3M to Star investment

### Portfolio Balance Assessment
- Cash generation: ✅ Sufficient ($8M Cash Cow funds growth bets)
- Growth pipeline: ⚠️ Weak — only one Star; need Question Marks to graduate
- Risk concentration: ⚠️ Concentrated in Core PM; need diversification

---

## Example 8: PDCA Cycle

**Topic**: Reduce customer churn from 7% to ≤4%

### Cycle #1 — Q4 2026

#### P — Plan
- **Problem**: Churn at 7%, target ≤4%
- **Goal**: Reduce churn to ≤5% by end of Q4 (first cycle, conservative target)
- **Root cause**: Missing AI features + price increase + no churn prediction
- **Intervention**: Ship AI task prioritization MVP + rollback price for at-risk accounts
- **Metrics**: Monthly churn rate, feature adoption rate, win-back rate
- **Baseline**: Churn 7%, adoption 0%, win-back 8%

#### D — Do
- Shipped AI task prioritization on Nov 28 (3 days late)
- Rolled back pricing for 200 at-risk accounts on Oct 5
- Launched in-app onboarding tour for AI features on Dec 1
- Hired 2 AI engineers (target was 3)

#### C — Check
| Metric | Baseline | Target | Actual | Status |
|--------|----------|--------|--------|--------|
| Monthly churn | 7% | ≤5% | 5.3% | ❌ slightly over |
| AI feature adoption | 0% | ≥30% | 34% | ✅ |
| Win-back rate | 8% | ≥15% | 17% | ✅ |
| NPS | 52 | ≥55 | 58 | ✅ |

- **Unexpected**: 12% of customers disabled AI feature (privacy concerns)
- **Key learnings**: Price rollback was more impactful than AI feature; privacy toggle needed

#### A — Act
- **Decision**: Adjust — close gap on churn, add privacy controls
- **Standardized**: Price rollback policy for at-risk accounts; in-app onboarding for all new features
- **Next cycle**: Add AI privacy toggle; expand AI to 2 more features; target churn ≤4%

---

## Example 9: SMART Goal

**Original Goal**: "Improve customer retention"

### Evaluation
| Criterion | Question | Answer | Pass? |
|-----------|----------|--------|-------|
| Specific | What exactly? | "Improve retention" — vague | ❌ |
| Measurable | How tracked? | No metric specified | ❌ |
| Achievable | Realistic? | Not assessed | ❌ |
| Relevant | Matters? | Yes, churn is critical | ✅ |
| Time-bound | Deadline? | None | ❌ |

### Revised SMART Goal
"Reduce monthly customer churn rate from 7% to ≤4% by March 31, 2027, by shipping 3 AI features, adding privacy controls, and rolling back pricing for at-risk accounts."

### Success Metrics
- **Primary metric**: Monthly churn rate — Baseline: 7% → Target: ≤4%
- **Secondary metric**: AI feature adoption — Baseline: 0% → Target: ≥40%
- **Verification method**: Monthly churn report from billing system
- **Deadline**: March 31, 2027

### Risk to Achievement
| Risk | Mitigation |
|------|------------|
| AI features delayed | Hire 3rd engineer; use open-source models |
| Privacy concerns limit adoption | Add granular privacy toggles; communicate data policy |
| New competitor enters market | Monthly competitive review; accelerate roadmap |

---

## Example 10: MECE Analysis

**Problem**: "Revenue is not growing fast enough"

### Universe Definition
All factors affecting TechFlow's revenue growth.

### Structure (Dimension: Revenue equation components)

```
Revenue = (Active Customers) × (ARPU) × (Retention)
```

Level 1:
├── A. Active Customers (acquisition + churn)
│   ├── A1. New customer acquisition
│   │   ├── A1a. Organic traffic conversion
│   │   ├── A1b. Paid acquisition (CAC)
│   │   └── A1c. Referral / word-of-mouth
│   └── A2. Customer churn (retention)
│       ├── A2a. Voluntary churn (dissatisfaction)
│       └── A2b. Involuntary churn (payment failure)
├── B. ARPU (Average Revenue Per User)
│   ├── B1. Pricing tier distribution
│   │   ├── B1a. Upgrades (tier progression)
│   │   └── B1b. Downgrades (tier regression)
│   └── B2. Add-on purchases
│       ├── B2a. Analytics add-on
│       └── B2b. Enterprise features
└── C. Expansion Revenue
    ├── C1. Seat expansion (more users per account)
    └── C2. Product expansion (cross-sell)

### ME Check
- A (Customers) ∩ B (ARPU) = ∅ ✓ (different revenue drivers)
- B (ARPU) ∩ C (Expansion) = ∅ ✓ (per-user vs. account-level)
- A (Customers) ∩ C (Expansion) = ∅ ✓ (count vs. revenue per count)

### CE Check
- Revenue = Customers × ARPU × Expansion → covers all revenue ✅
- Known edge cases: discounts? → covered under B1b (downgrades); refunds? → add to A2b
- Residual category needed: No (framework is complete)

### Analysis Result
Drilling into A2a (voluntary churn) → this is where the 7% churn problem lives → apply Fishbone analysis here.

---

## How These Examples Connect

```
MECE (revenue decomposition) 
  → identifies churn as the problem area
    → 3W (quick assessment)
      → Fishbone (root cause)
        → SWOT (strategic position)
          → PEST (external validation)
            → BCG (resource allocation)
              → SMART (goal setting)
                → 5W2H (execution plan)
                  → PDCA (iterative delivery)
                    → Six Hats (decision review)
```

Each method illuminates a different facet. Together, they form a complete analysis from problem identification to execution tracking.
