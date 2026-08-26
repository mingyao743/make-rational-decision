# Diagram Renderer Extension

Shared Mermaid diagram templates for all visual analysis skills. Use these to render professional diagrams instead of ASCII art when the output supports Mermaid rendering.

## Usage

When a skill produces a visual output, replace the ASCII diagram in the skill's output format with the corresponding Mermaid template below. Fill in the placeholders with actual content.

---

## Fishbone Diagram (Ishikawa)

```mermaid
flowchart LR
    Problem["{{PROBLEM_STATEMENT}}"]

    Method["Method"] --- Problem
    Man["Man (People)"] --- Problem
    Machine["Machine"] --- Problem
    Material["Material"] --- Problem
    Environment["Environment"] --- Problem
    Management["Management"] --- Problem

    %% Method causes
    M1["{{METHOD_CAUSE_1}}"] --- Method
    M2["{{METHOD_CAUSE_2}}"] --- Method

    %% Man causes
    P1["{{MAN_CAUSE_1}}"] --- Man
    P2["{{MAN_CAUSE_2}}"] --- Man

    %% Machine causes
    Mac1["{{MACHINE_CAUSE_1}}"] --- Machine
    Mac2["{{MACHINE_CAUSE_2}}"] --- Machine

    %% Material causes
    Mat1["{{MATERIAL_CAUSE_1}}"] --- Material

    %% Environment causes
    E1["{{ENV_CAUSE_1}}"] --- Environment

    %% Management causes
    Mg1["{{MGMT_CAUSE_1}}"] --- Management
    Mg2["{{MGMT_CAUSE_2}}"] --- Management

    style Problem fill:#ff6b6b,color:#fff,stroke:#333,stroke-width:2px
    style Method fill:#4ecdc4,color:#fff
    style Man fill:#4ecdc4,color:#fff
    style Machine fill:#4ecdc4,color:#fff
    style Material fill:#4ecdc4,color:#fff
    style Environment fill:#4ecdc4,color:#fff
    style Management fill:#4ecdc4,color:#fff
```

---

## SWOT Matrix

```mermaid
quadrantChart
    title SWOT Analysis: {{SUBJECT}}
    x-axis "Negative Internal" --> "Positive Internal"
    y-axis "Negative External" --> "Positive External"
    quadrant-1 "Strengths"
    quadrant-2 "Weaknesses"
    quadrant-3 "Threats"
    quadrant-4 "Opportunities"
    "{{STRENGTH_ITEM_1}}": [0.8, 0.75]
    "{{STRENGTH_ITEM_2}}": [0.7, 0.7]
    "{{WEAKNESS_ITEM_1}}": [0.3, 0.25]
    "{{WEAKNESS_ITEM_2}}": [0.2, 0.3]
    "{{OPPORTUNITY_ITEM_1}}": [0.6, 0.8]
    "{{OPPORTUNITY_ITEM_2}}": [0.7, 0.85]
    "{{THREAT_ITEM_1}}": [0.25, 0.2]
    "{{THREAT_ITEM_2}}": [0.35, 0.15]
```

### SWOT Table Alternative (if quadrantChart unsupported)

```mermaid
block-beta
    columns 2
    block:strengths:1
        columns 1
        hS["Strengths (Internal +)"]
        s1["{{S1}}"]
        s2["{{S2}}"]
    end
    block:opportunities:1
        columns 1
        hO["Opportunities (External +)"]
        o1["{{O1}}"]
        o2["{{O2}}"]
    end
    block:weaknesses:1
        columns 1
        hW["Weaknesses (Internal −)"]
        w1["{{W1}}"]
        w2["{{W2}}"]
    end
    block:threats:1
        columns 1
        hT["Threats (External −)"]
        t1["{{T1}}"]
        t2["{{T2}}"]
    end

    style hS fill:#22c55e,color:#fff
    style hO fill:#3b82f6,color:#fff
    style hW fill:#f59e0b,color:#fff
    style hT fill:#ef4444,color:#fff
```

---

## BCG Matrix

```mermaid
quadrantChart
    title BCG Matrix: {{PORTFOLIO_NAME}}
    x-axis "Low Relative Market Share" --> "High Relative Market Share"
    y-axis "Low Market Growth Rate" --> "High Market Growth Rate"
    quadrant-1 "Stars"
    quadrant-2 "Question Marks"
    quadrant-3 "Dogs"
    quadrant-4 "Cash Cows"
    "{{PRODUCT_A}}": [0.8, 0.75]
    "{{PRODUCT_B}}": [0.3, 0.8]
    "{{PRODUCT_C}}": [0.75, 0.25]
    "{{PRODUCT_D}}": [0.2, 0.2]
```

---

## PDCA Cycle

```mermaid
flowchart TB
    Plan["📋 PLAN\nSet goals & design plan"]
    Do["🔨 DO\nExecute (small scale)"]
    Check["📊 CHECK\nMeasure vs goals"]
    Act{"✅ ACT\nGoals met?"}

    Plan --> Do
    Do --> Check
    Check --> Act
    Act -- "Yes: Standardize" --> NextCycle["🔄 Next Cycle\nIdentify new improvement"]
    Act -- "Partial: Adjust" --> Plan
    Act -- "No: Re-analyze" --> Plan

    NextCycle --> Plan

    style Plan fill:#3b82f6,color:#fff
    style Do fill:#f59e0b,color:#fff
    style Check fill:#8b5cf6,color:#fff
    style Act fill:#22c55e,color:#fff
    style NextCycle fill:#6b7280,color:#fff
```

---

## MECE Issue Tree

```mermaid
mindmap
    root(("{{PROBLEM}}"))
        BranchA["{{CATEGORY_A}}"]
            A1["{{SUB_A1}}"]
                A1a["{{LEAF_A1a}}"]
                A1b["{{LEAF_A1b}}"]
            A2["{{SUB_A2}}"]
        BranchB["{{CATEGORY_B}}"]
            B1["{{SUB_B1}}"]
            B2["{{SUB_B2}}"]
        BranchC["{{CATEGORY_C}}"]
            C1["{{SUB_C1}}"]
            C2["{{SUB_C2}}"]
```

### MECE Issue Tree (Flowchart variant)

```mermaid
flowchart TD
    Root["{{PROBLEM}}"]

    A["{{CATEGORY_A}}"]
    B["{{CATEGORY_B}}"]
    C["{{CATEGORY_C}}"]

    Root --> A
    Root --> B
    Root --> C

    A --> A1["{{SUB_A1}}"]
    A --> A2["{{SUB_A2}}"]
    B --> B1["{{SUB_B1}}"]
    B --> B2["{{SUB_B2}}"]
    C --> C1["{{SUB_C1}}"]
    C --> C2["{{SUB_C2}}"]

    style Root fill:#ef4444,color:#fff,stroke:#333,stroke-width:2px
    style A fill:#3b82f6,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#3b82f6,color:#fff
```

---

## Six Thinking Hats Sequence

```mermaid
flowchart LR
    Blue1["🔵 Blue Hat\nSet Agenda"] --> White["⬜ White Hat\nFacts & Data"]
    White --> Red["🔴 Red Hat\nEmotions"]
    Red --> Black["⚫ Black Hat\nRisks"]
    Black --> Yellow["🟡 Yellow Hat\nBenefits"]
    Yellow --> Green["🟢 Green Hat\nCreativity"]
    Green --> Blue2["🔵 Blue Hat\nSummarize"]

    style Blue1 fill:#3b82f6,color:#fff
    style White fill:#f3f4f6,color:#000,stroke:#999
    style Red fill:#ef4444,color:#fff
    style Black fill:#1f2937,color:#fff
    style Yellow fill:#fbbf24,color:#000
    style Green fill:#22c55e,color:#fff
    style Blue2 fill:#3b82f6,color:#fff
```

---

## 3W Flow

```mermaid
flowchart LR
    What["What\nCurrent Situation"] --> Why["Why\nRoot Cause"] --> WhatNext["What Next\nAction Plan"]

    style What fill:#ef4444,color:#fff
    style Why fill:#f59e0b,color:#fff
    style WhatNext fill:#22c55e,color:#fff
```

---

## 5W2H Radar

```mermaid
mindmap
    root(("{{TASK_NAME}}"))
        Why["🎯 Why — Purpose"]
        What["📦 What — Deliverable"]
        Who["👤 Who — People"]
        When["📅 When — Timeline"]
        Where["📍 Where — Context"]
        How["🔧 How — Method"]
        HowMuch["💰 How Much — Resources"]
```

---

## Rendering Notes

- All templates use `{{PLACEHOLDER}}` syntax — replace with actual content before rendering
- If the output environment does not support Mermaid, fall back to the ASCII diagrams in the skill's SKILL.md
- Bubble sizes in quadrant charts can encode revenue/investment by adjusting the position spread
- Colors follow a consistent scheme: green = positive, red = negative, blue = neutral/process, amber = caution
