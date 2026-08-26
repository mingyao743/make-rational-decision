// ============================================================
// research-protocol/index.ts
// Public API for the research-protocol module
// ============================================================

export * from './types.js';
export {
  extractDomain,
  classifySource,
  fetchUrl,
  fetchMultiple,
} from './collector.js';
export type { FetchResult } from './collector.js';
export {
  checkRecency,
  checkCredibility,
  checkIndependence,
  checkBias,
  checkSpecificity,
  validateDataPoint,
  validateAll,
  identifyGaps,
  summarizeReport,
} from './validator.js';
export {
  formatCitation,
  formatTableRow,
  generateReport,
  renderReportMd,
  createDataPoint,
} from './formatter.js';
