// ============================================================
// diagram-renderer/renderer.ts
// Mermaid string generation from structured data
// ============================================================

import type {
  FishboneData,
  SwotData,
  BcgData,
  PdcaData,
  MeceData,
  SixHatsData,
  ThreeWData,
  FiveW2hData,
  DiagramData,
  HatColor,
  MeceNode,
} from './types.js';

// ---- Helpers --------------------------------------------------

/** Escape special Mermaid characters in a string */
function escape(str: string): string {
  return str.replace(/"/g, '#quot;').replace(/\[/g, '(').replace(/\]/g, ')');
}

/** Sanitize a string for use as a Mermaid node ID */
function nodeId(prefix: string, index: number): string {
  return `${prefix}${index}`;
}

// ---- Fishbone -------------------------------------------------

const FISHBONE_CATEGORIES = [
  'method',
  'man',
  'machine',
  'material',
  'environment',
  'management',
] as const;

const FISHBONE_LABELS: Record<string, string> = {
  method: 'Method',
  man: 'Man (People)',
  machine: 'Machine',
  material: 'Material',
  environment: 'Environment',
  management: 'Management',
};

export function renderFishbone(data: FishboneData): string {
  const lines: string[] = ['flowchart LR'];
  lines.push(`    Problem["${escape(data.problem)}"]`);

  // Category bones
  for (const cat of FISHBONE_CATEGORIES) {
    const causes = data.categories[cat];
    if (!causes || causes.length === 0) continue;
    lines.push(`    ${cat}["${FISHBONE_LABELS[cat]}"] --- Problem`);
  }

  // Cause leaves
  for (const cat of FISHBONE_CATEGORIES) {
    const causes = data.categories[cat];
    if (!causes || causes.length === 0) continue;
    causes.forEach((cause, i) => {
      const cid = nodeId(`${cat}_c`, i);
      lines.push(`    ${cid}["${escape(cause.text)}"] --- ${cat}`);
      // Sub-causes
      cause.subCauses?.forEach((sub, j) => {
        const sid = nodeId(`${cat}_s`, i * 100 + j);
        lines.push(`    ${sid}["${escape(sub)}"] --- ${cid}`);
      });
    });
  }

  // Styling
  lines.push(
    `    style Problem fill:#ff6b6b,color:#fff,stroke:#333,stroke-width:2px`,
  );
  for (const cat of FISHBONE_CATEGORIES) {
    const causes = data.categories[cat];
    if (!causes || causes.length === 0) continue;
    lines.push(`    style ${cat} fill:#4ecdc4,color:#fff`);
  }

  return lines.join('\n');
}

// ---- SWOT -----------------------------------------------------

export function renderSwot(data: SwotData): string {
  const lines: string[] = ['flowchart TB'];

  // Four quadrants as subgraphs
  const sections: Array<[string, string, SwotData['strengths'], string]> = [
    ['S', 'Strengths (Internal +)', data.strengths, '#22c55e'],
    ['W', 'Weaknesses (Internal −)', data.weaknesses, '#f59e0b'],
    ['O', 'Opportunities (External +)', data.opportunities, '#3b82f6'],
    ['T', 'Threats (External −)', data.threats, '#ef4444'],
  ];

  for (const [key, label, items, color] of sections) {
    lines.push(`    subgraph ${key}["${label}"]`);
    items.forEach((item, i) => {
      const nid = nodeId(`${key}_i`, i);
      lines.push(`        ${nid}["${escape(item.text)} [${item.impact}]"]`);
    });
    lines.push(`    end`);
    lines.push(`    style ${key} fill:${color}20,stroke:${color},stroke-width:2px`);
  }

  // Title
  lines.unshift(`%%{init: {"flowchart": {"title": "SWOT: ${escape(data.subject)}"}}}%%`);

  return lines.join('\n');
}

// ---- BCG Matrix -----------------------------------------------

export function renderBcg(data: BcgData): string {
  const lines: string[] = ['quadrantChart'];
  lines.push(`    title BCG Matrix: ${escape(data.name)}`);
  lines.push(`    x-axis "Low Rel. Market Share" --> "High Rel. Market Share"`);
  lines.push(`    y-axis "Low Market Growth" --> "High Market Growth"`);
  lines.push(`    quadrant-1 "Stars"`);
  lines.push(`    quadrant-2 "Question Marks"`);
  lines.push(`    quadrant-3 "Dogs"`);
  lines.push(`    quadrant-4 "Cash Cows"`);

  for (const p of data.products) {
    // Mermaid quadrantChart uses 0-1 range
    const x = Math.min(Math.max(p.relativeShare, 0), 1);
    const y = Math.min(Math.max(p.marketGrowth, 0), 1);
    lines.push(`    "${escape(p.name)}": [${x}, ${y}]`);
  }

  return lines.join('\n');
}

// ---- PDCA Cycle -----------------------------------------------

const PDCA_COLORS: Record<string, string> = {
  plan: '#3b82f6',
  do: '#f59e0b',
  check: '#8b5cf6',
  act: '#22c55e',
};

export function renderPdca(data: PdcaData): string {
  const lines: string[] = ['flowchart TB'];
  lines.push(`    Plan["📋 PLAN — Set goals & design plan"]`);
  lines.push(`    Do["🔨 DO — Execute (small scale)"]`);
  lines.push(`    Check["📊 CHECK — Measure vs goals"]`);
  lines.push(`    Act{"✅ ACT — Goals met?"}`);

  lines.push(`    Plan --> Do`);
  lines.push(`    Do --> Check`);
  lines.push(`    Check --> Act`);

  const goalsMet = data.goalsMet ?? 'yes';
  if (goalsMet === 'yes') {
    lines.push(`    Act -- "Yes: Standardize" --> Next["🔄 Next Cycle"]`);
    lines.push(`    Next --> Plan`);
  } else if (goalsMet === 'partial') {
    lines.push(`    Act -- "Partial: Adjust" --> Plan`);
  } else {
    lines.push(`    Act -- "No: Re-analyze" --> Plan`);
  }

  // Highlight current phase
  const current = data.currentPhase.charAt(0).toUpperCase() + data.currentPhase.slice(1);
  if (PDCA_COLORS[data.currentPhase]) {
    lines.push(`    style ${current} fill:${PDCA_COLORS[data.currentPhase]},color:#fff,stroke:#333,stroke-width:3px`);
  }

  // Style non-current phases
  for (const phase of ['Plan', 'Do', 'Check']) {
    if (phase !== current) {
      const phaseKey = phase.toLowerCase();
      lines.push(`    style ${phase} fill:${PDCA_COLORS[phaseKey]}40,color:#000`);
    }
  }
  lines.push(`    style Act fill:#22c55e,color:#fff`);

  return lines.join('\n');
}

// ---- MECE Issue Tree ------------------------------------------

function renderMeceNode(node: MeceNode, parentId: string | null, nodeId: string): string[] {
  const lines: string[] = [];
  lines.push(`    ${nodeId}["${escape(node.label)}"]`);

  if (parentId) {
    lines.push(`    ${parentId} --> ${nodeId}`);
  }

  if (node.children && node.children.length > 0) {
    node.children.forEach((child, i) => {
      const childId = `${nodeId}_${i}`;
      lines.push(...renderMeceNode(child, nodeId, childId));
    });
  }

  return lines;
}

export function renderMece(data: MeceData): string {
  const lines: string[] = ['flowchart TD'];
  lines.push(`    Root(("${escape(data.problem)}"))`);

  data.branches.forEach((branch, i) => {
    const branchId = `B${i}`;
    lines.push(`    Root --> ${branchId}`);
    lines.push(`    ${branchId}["${escape(branch.label)}"]`);

    if (branch.children && branch.children.length > 0) {
      branch.children.forEach((child, j) => {
        const childId = `${branchId}_${j}`;
        lines.push(...renderMeceNode(child, branchId, childId));
      });
    }
  });

  lines.push(`    style Root fill:#ef4444,color:#fff,stroke:#333,stroke-width:2px`);

  return lines.join('\n');
}

// ---- Six Thinking Hats ----------------------------------------

const HAT_META: Record<HatColor, { label: string; color: string; textColor: string }> = {
  blue: { label: '🔵 Blue Hat — Process', color: '#3b82f6', textColor: '#fff' },
  white: { label: '⬜ White Hat — Facts', color: '#f3f4f6', textColor: '#000' },
  red: { label: '🔴 Red Hat — Emotions', color: '#ef4444', textColor: '#fff' },
  black: { label: '⚫ Black Hat — Risks', color: '#1f2937', textColor: '#fff' },
  yellow: { label: '🟡 Yellow Hat — Benefits', color: '#fbbf24', textColor: '#000' },
  green: { label: '🟢 Green Hat — Creativity', color: '#22c55e', textColor: '#fff' },
};

export function renderSixHats(data: SixHatsData): string {
  const lines: string[] = ['flowchart LR'];

  data.sequence.forEach((hat, i) => {
    const meta = HAT_META[hat];
    const nid = `H${i}`;
    lines.push(`    ${nid}["${meta.label}"]`);
    if (i > 0) {
      lines.push(`    H${i - 1} --> ${nid}`);
    }
    lines.push(`    style ${nid} fill:${meta.color},color:${meta.textColor}`);
  });

  return lines.join('\n');
}

// ---- 3W Flow --------------------------------------------------

export function render3w(data: ThreeWData): string {
  const lines: string[] = ['flowchart LR'];
  lines.push(`    What["What — ${escape(data.what)}"]`);
  lines.push(`    Why["Why — ${escape(data.why)}"]`);
  lines.push(`    WhatNext["What Next — ${escape(data.whatNext)}"]`);
  lines.push(`    What --> Why`);
  lines.push(`    Why --> WhatNext`);
  lines.push(`    style What fill:#ef4444,color:#fff`);
  lines.push(`    style Why fill:#f59e0b,color:#fff`);
  lines.push(`    style WhatNext fill:#22c55e,color:#fff`);
  return lines.join('\n');
}

// ---- 5W2H Mindmap ---------------------------------------------

const W2H_LABELS: Record<string, string> = {
  why: '🎯 Why — Purpose',
  what: '📦 What — Deliverable',
  who: '👤 Who — People',
  when: '📅 When — Timeline',
  where: '📍 Where — Context',
  how: '🔧 How — Method',
  howMuch: '💰 How Much — Resources',
};

export function render5w2h(data: FiveW2hData): string {
  const lines: string[] = ['mindmap'];
  lines.push(`    root((${escape(data.taskName)}))`);

  for (const dim of data.dimensions) {
    const label = W2H_LABELS[dim.dimension] ?? dim.dimension;
    lines.push(`        ${label}`);
    lines.push(`            ${escape(dim.value)}`);
  }

  return lines.join('\n');
}

// ---- Main dispatch --------------------------------------------

/**
 * Render any diagram type to a Mermaid string.
 * @param input - Tagged union of diagram data
 * @returns Mermaid diagram string (without ```mermaid fences)
 */
export function renderDiagram(input: DiagramData): string {
  switch (input.type) {
    case 'fishbone':
      return renderFishbone(input.data);
    case 'swot':
      return renderSwot(input.data);
    case 'bcg':
      return renderBcg(input.data);
    case 'pdca':
      return renderPdca(input.data);
    case 'mece':
      return renderMece(input.data);
    case 'sixHats':
      return renderSixHats(input.data);
    case '3w':
      return render3w(input.data);
    case '5w2h':
      return render5w2h(input.data);
    default: {
      const _: never = input;
      throw new Error(`Unknown diagram type: ${JSON.stringify(input)}`);
    }
  }
}

/**
 * Wrap a Mermaid string in fenced code block for Markdown embedding.
 */
export function wrapMermaid(mermaidStr: string): string {
  return `\`\`\`mermaid\n${mermaidStr}\n\`\`\``;
}
