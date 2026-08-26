// ============================================================
// input-synthesizer/synthesizer.ts
// Deduplication, conflict detection, and synthesis logic
// ============================================================

import type {
  ParticipantInput,
  Participant,
  SynthesizedItem,
  Disagreement,
  SynthesisResult,
  ConsensusType,
  SessionRecord,
} from './types.js';

// ---- Text similarity ------------------------------------------

/**
 * Calculate similarity between two strings using token-based Jaccard similarity.
 * Returns a value between 0 (completely different) and 1 (identical).
 */
export function textSimilarity(a: string, b: string): number {
  const tokensA = new Set(tokenize(a));
  const tokensB = new Set(tokenize(b));

  if (tokensA.size === 0 && tokensB.size === 0) return 1;
  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  const intersection = new Set([...tokensA].filter((t) => tokensB.has(t)));
  const union = new Set([...tokensA, ...tokensB]);

  return intersection.size / union.size;
}

/** Tokenize a string into normalized tokens */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// ---- Deduplication --------------------------------------------

/**
 * Group inputs by similarity. Inputs above the similarity threshold
 * are considered duplicates and merged into groups.
 */
export function deduplicate(
  inputs: ParticipantInput[],
  threshold = 0.5,
): ParticipantInput[][] {
  const groups: ParticipantInput[][] = [];
  const assigned = new Set<number>();

  for (let i = 0; i < inputs.length; i++) {
    if (assigned.has(i)) continue;

    const group: ParticipantInput[] = [inputs[i]];
    assigned.add(i);

    for (let j = i + 1; j < inputs.length; j++) {
      if (assigned.has(j)) continue;

      const sim = textSimilarity(inputs[i].content, inputs[j].content);
      if (sim >= threshold) {
        group.push(inputs[j]);
        assigned.add(j);
      }
    }

    groups.push(group);
  }

  return groups;
}

// ---- Consensus classification ---------------------------------

/**
 * Classify the consensus type of a group of inputs.
 * - consensus: all participants agree
 * - majority: more than half agree
 * - split: roughly equal split
 * - unique: only one participant raised this point
 */
export function classifyConsensus(
  group: ParticipantInput[],
  totalParticipants: number,
): ConsensusType {
  if (group.length === 1) return 'unique';
  if (group.length === totalParticipants) return 'consensus';
  if (group.length > totalParticipants / 2) return 'majority';
  return 'split';
}

// ---- Synthesis ------------------------------------------------

/**
 * Synthesize multiple participant inputs for a single dimension into
 * a unified result with deduplication, consensus classification, and
 * disagreement detection.
 */
export function synthesizeDimension(
  inputs: ParticipantInput[],
  participants: Participant[],
  dimension: string,
  similarityThreshold = 0.5,
): SynthesisResult {
  const totalParticipants = participants.length;

  // Deduplicate by similarity
  const groups = deduplicate(inputs, similarityThreshold);

  const items: SynthesizedItem[] = [];
  const disagreements: Disagreement[] = [];

  for (const group of groups) {
    const consensus = classifyConsensus(group, totalParticipants);
    const sources = group.map((g) => g.participant);

    // Merge content: pick the longest content as the representative
    const representative = group.reduce((longest, current) =>
      current.content.length > longest.content.length ? current : longest,
    );

    // Calculate weighted confidence
    let totalWeight = 0;
    let weightedSum = 0;
    for (const input of group) {
      const participant = participants.find((p) => p.name === input.participant);
      const weight = participant?.expertiseWeight ?? 1.0;
      const confidenceScore =
        input.confidence === 'high' ? 1.0 : input.confidence === 'medium' ? 0.7 : 0.4;
      totalWeight += weight;
      weightedSum += weight * confidenceScore;
    }
    const weightedConfidence = totalWeight > 0 ? weightedSum / totalWeight : 0.5;

    // Build attribution
    let attribution: string;
    if (consensus === 'consensus') {
      attribution = `(consensus: all)`;
    } else if (consensus === 'majority') {
      attribution = `(majority: ${sources.join(', ')})`;
    } else if (consensus === 'split') {
      attribution = `(split: ${sources.join(', ')})`;

      // Record as disagreement
      disagreements.push({
        topic: representative.content,
        positions: group.map((g) => ({
          participant: g.participant,
          position: g.content,
        })),
        resolution: 'unresolved',
      });
    } else {
      attribution = `(individual: ${sources[0]})`;
    }

    items.push({
      content: representative.content,
      sources,
      consensus,
      attribution,
      weightedConfidence: Math.round(weightedConfidence * 100) / 100,
    });
  }

  // Sort: consensus first, then majority, then unique
  const sortOrder: Record<ConsensusType, number> = {
    consensus: 0,
    majority: 1,
    split: 2,
    unique: 3,
  };
  items.sort((a, b) => sortOrder[a.consensus] - sortOrder[b.consensus]);

  return {
    dimension,
    items,
    disagreements,
    stats: {
      totalInputs: inputs.length,
      participants: totalParticipants,
      consensusItems: items.filter((i) => i.consensus === 'consensus').length,
      majorityItems: items.filter((i) => i.consensus === 'majority').length,
      splitItems: items.filter((i) => i.consensus === 'split').length,
      uniqueItems: items.filter((i) => i.consensus === 'unique').length,
      disagreements: disagreements.length,
    },
  };
}

/**
 * Synthesize inputs across all dimensions.
 */
export function synthesizeAll(
  inputs: ParticipantInput[],
  participants: Participant[],
  similarityThreshold = 0.5,
): SynthesisResult[] {
  // Group inputs by dimension
  const byDimension = new Map<string, ParticipantInput[]>();
  for (const input of inputs) {
    if (!byDimension.has(input.dimension)) {
      byDimension.set(input.dimension, []);
    }
    byDimension.get(input.dimension)!.push(input);
  }

  const results: SynthesisResult[] = [];
  for (const [dimension, dimInputs] of byDimension) {
    results.push(synthesizeDimension(dimInputs, participants, dimension, similarityThreshold));
  }

  return results;
}

// ---- Rendering ------------------------------------------------

/** Render a synthesis result as Markdown */
export function renderSynthesisMd(result: SynthesisResult): string {
  const lines: string[] = [
    `### ${result.dimension} — Synthesized`,
    '',
  ];

  for (const item of result.items) {
    const icon =
      item.consensus === 'consensus' ? '🟢' :
      item.consensus === 'majority' ? '🟡' :
      item.consensus === 'split' ? '🔴' :
      '⚪';

    lines.push(`${icon} ${item.content} *${item.attribution}* (confidence: ${item.weightedConfidence})`);
  }

  if (result.disagreements.length > 0) {
    lines.push('', '#### Disagreements');
    for (const d of result.disagreements) {
      lines.push(`- **${d.topic}**`);
      for (const pos of d.positions) {
        lines.push(`  - ${pos.participant}: ${pos.position}`);
      }
      lines.push(`  - Resolution: ${d.resolution}`);
    }
  }

  lines.push('', '#### Stats', `- Total inputs: ${result.stats.totalInputs}`);
  lines.push(`- Consensus: ${result.stats.consensusItems} | Majority: ${result.stats.majorityItems} | Split: ${result.stats.splitItems} | Unique: ${result.stats.uniqueItems}`);
  lines.push(`- Disagreements: ${result.stats.disagreements}`);

  return lines.join('\n');
}

/** Render a complete session record as Markdown */
export function renderSessionMd(record: SessionRecord): string {
  const lines: string[] = [
    '## Multi-Input Session Record',
    '',
    `**Skill**: ${record.skill}`,
    `**Topic**: ${record.topic}`,
    `**Mode**: ${record.mode}`,
    `**Date**: ${record.date.slice(0, 10)}`,
    '',
    '### Participants',
    '| Name | Role | Expertise Weight |',
    '|------|------|-----------------|',
    ...record.participants.map((p) => `| ${p.name} | ${p.role} | ${p.expertiseWeight}x |`),
    '',
  ];

  for (const result of record.synthesis) {
    lines.push(renderSynthesisMd(result));
    lines.push('');
  }

  return lines.join('\n');
}

// ---- Template generation ---------------------------------------

/** Generate an empty input template for a given skill and dimension */
export function generateTemplate(
  skill: string,
  dimensions: string[],
  participants: string[],
): string {
  const lines: string[] = [
    `## Input Template: ${skill}`,
    '',
    'Instructions: Each participant fills in their input for each dimension.',
    'Do not discuss during collection. Synthesis happens after all inputs are collected.',
    '',
  ];

  for (const dim of dimensions) {
    lines.push(`### ${dim}`);
    for (const p of participants) {
      lines.push(`**${p}**:`);
      lines.push('- ');
      lines.push(`  Confidence: [high/medium/low]`);
      lines.push('');
    }
  }

  return lines.join('\n');
}
