// ============================================================
// diagram-renderer/index.ts
// Public API for the diagram-renderer module
// ============================================================

export * from './types.js';
export { renderDiagram, wrapMermaid } from './renderer.js';
export {
  renderFishbone,
  renderSwot,
  renderBcg,
  renderPdca,
  renderMece,
  renderSixHats,
  render3w,
  render5w2h,
} from './renderer.js';
