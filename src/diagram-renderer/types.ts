// ============================================================
// diagram-renderer/types.ts
// Type definitions for all diagram data structures
// ============================================================

/** A single cause entry in a fishbone diagram */
export interface FishboneCause {
  /** The cause description */
  text: string;
  /** Optional sub-causes drilled down from this cause */
  subCauses?: string[];
}

/** Data for a fishbone (Ishikawa) diagram */
export interface FishboneData {
  /** The problem statement at the head of the fish */
  problem: string;
  /** Causes organized by 6M category */
  categories: {
    method?: FishboneCause[];
    man?: FishboneCause[];
    machine?: FishboneCause[];
    material?: FishboneCause[];
    environment?: FishboneCause[];
    management?: FishboneCause[];
  };
}

/** A single item in a SWOT quadrant */
export interface SwotItem {
  /** The item description */
  text: string;
  /** Impact level */
  impact: 'high' | 'medium' | 'low';
}

/** Data for a SWOT analysis diagram */
export interface SwotData {
  /** Subject of the analysis */
  subject: string;
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

/** A single product/item plotted on the BCG matrix */
export interface BcgProduct {
  /** Product name */
  name: string;
  /** Market growth rate as decimal (0.25 = 25%) */
  marketGrowth: number;
  /** Relative market share (1.0 = parity with leader) */
  relativeShare: number;
  /** Revenue (for bubble size annotation) */
  revenue?: number;
}

/** Data for a BCG Matrix diagram */
export interface BcgData {
  /** Portfolio name */
  name: string;
  /** Products to plot */
  products: BcgProduct[];
}

/** Data for a PDCA cycle diagram */
export interface PdcaData {
  /** Improvement topic */
  topic: string;
  /** Current phase */
  currentPhase: 'plan' | 'do' | 'check' | 'act';
  /** Whether the last cycle's goals were met (for branching) */
  goalsMet?: 'yes' | 'partial' | 'no';
  /** Cycle number */
  cycleNumber?: number;
}

/** A node in a MECE issue tree */
export interface MeceNode {
  /** Node label */
  label: string;
  /** Child nodes (empty for leaves) */
  children?: MeceNode[];
}

/** Data for a MECE issue tree diagram */
export interface MeceData {
  /** The root problem statement */
  problem: string;
  /** Top-level branches */
  branches: MeceNode[];
}

/** Hat colors for Six Thinking Hats */
export type HatColor = 'blue' | 'white' | 'red' | 'black' | 'yellow' | 'green';

/** Data for a Six Thinking Hats sequence diagram */
export interface SixHatsData {
  /** Topic being analyzed */
  topic: string;
  /** Ordered sequence of hats (including Blue at start and end) */
  sequence: HatColor[];
}

/** Data for a 3W analysis flow diagram */
export interface ThreeWData {
  topic: string;
  what: string;
  why: string;
  whatNext: string;
}

/** A dimension for the 5W2H mindmap */
export interface FiveW2hDimension {
  dimension: 'why' | 'what' | 'who' | 'when' | 'where' | 'how' | 'howMuch';
  value: string;
}

/** Data for a 5W2H mindmap diagram */
export interface FiveW2hData {
  taskName: string;
  dimensions: FiveW2hDimension[];
}

/** Union type for all diagram data */
export type DiagramData =
  | { type: 'fishbone'; data: FishboneData }
  | { type: 'swot'; data: SwotData }
  | { type: 'bcg'; data: BcgData }
  | { type: 'pdca'; data: PdcaData }
  | { type: 'mece'; data: MeceData }
  | { type: 'sixHats'; data: SixHatsData }
  | { type: '3w'; data: ThreeWData }
  | { type: '5w2h'; data: FiveW2hData };

/** Supported diagram types */
export type DiagramType = DiagramData['type'];
