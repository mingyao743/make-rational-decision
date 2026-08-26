// ============================================================
// input-synthesizer/types.ts
// Type definitions for multi-perspective input synthesis
// ============================================================

/** Input collection mode */
export type CollectionMode = 'sequential' | 'round-robin' | 'diverge-converge';

/** A single participant's input on a single dimension */
export interface ParticipantInput {
  /** Participant identifier */
  participant: string;
  /** Dimension being contributed to (e.g., "white-hat", "strengths", "Method") */
  dimension: string;
  /** The content of their input */
  content: string;
  /** Key points extracted from the content */
  points: string[];
  /** Confidence expressed by the participant */
  confidence?: 'high' | 'medium' | 'low';
}

/** A participant in the session */
export interface Participant {
  /** Name or identifier */
  name: string;
  /** Role (e.g., "Blue Hat facilitator", "Domain Expert") */
  role: string;
  /** Expertise weight multiplier (default 1.0) */
  expertiseWeight: number;
}

/** Classification of how inputs relate across participants */
export type ConsensusType = 'consensus' | 'majority' | 'split' | 'unique';

/** A synthesized item that merged multiple inputs */
export interface SynthesizedItem {
  /** The merged content */
  content: string;
  /** Which participants contributed */
  sources: string[];
  /** Type of consensus */
  consensus: ConsensusType;
  /** Attribution detail */
  attribution: string;
  /** Weighted confidence score */
  weightedConfidence: number;
}

/** A disagreement between participants */
export interface Disagreement {
  topic: string;
  positions: Array<{ participant: string; position: string }>;
  resolution: 'unresolved' | 'deferred' | 'resolved';
  resolutionNote?: string;
}

/** A complete synthesis result */
export interface SynthesisResult {
  /** Dimension that was synthesized */
  dimension: string;
  /** Synthesized items */
  items: SynthesizedItem[];
  /** Disagreements found */
  disagreements: Disagreement[];
  /** Summary statistics */
  stats: {
    totalInputs: number;
    participants: number;
    consensusItems: number;
    majorityItems: number;
    splitItems: number;
    uniqueItems: number;
    disagreements: number;
  };
}

/** A complete multi-input session record */
export interface SessionRecord {
  skill: string;
  topic: string;
  mode: CollectionMode;
  participants: Participant[];
  inputs: ParticipantInput[];
  synthesis: SynthesisResult[];
  date: string;
}
