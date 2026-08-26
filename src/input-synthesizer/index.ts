// ============================================================
// input-synthesizer/index.ts
// Public API for the input-synthesizer module
// ============================================================

export * from './types.js';
export {
  textSimilarity,
  deduplicate,
  classifyConsensus,
  synthesizeDimension,
  synthesizeAll,
  renderSynthesisMd,
  renderSessionMd,
  generateTemplate,
} from './synthesizer.js';
