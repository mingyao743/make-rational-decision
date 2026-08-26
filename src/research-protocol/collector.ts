// ============================================================
// research-protocol/collector.ts
// Web fetching and source content extraction
// ============================================================

import type { SourceTier, SourceTierRule } from './types.js';

/** Default domain-to-tier mapping rules */
const DEFAULT_TIER_RULES: SourceTierRule[] = [
  // T1: Government / Official
  { domains: ['gov.cn', 'gov.uk', 'europa.eu', 'stats.gov.cn', 'bls.gov', 'bea.gov', 'federalreserve.gov'], tier: 'T1' },
  // T2: Industry Research
  { domains: ['gartner.com', 'mckinsey.com', 'idc.com', 'bcg.com', 'bain.com', 'deloitte.com', 'pwc.com', 'mckinsey.com'], tier: 'T2' },
  // T3: Major Media
  { domains: ['reuters.com', 'bloomberg.com', 'ft.com', 'wsj.com', 'nytimes.com', 'economist.com', 'cnbc.com', 'finance.yahoo.com'], tier: 'T3' },
  // T4: Specialized Media
  { domains: ['techcrunch.com', 'theinformation.com', 'stratechery.com', 'semafor.com'], tier: 'T4' },
  // T5: General Web (anything else)
  { domains: ['wikipedia.org'], tier: 'T5' },
];

/** Extract the domain from a URL */
export function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/** Classify a source URL into a reliability tier */
export function classifySource(url: string, customRules?: SourceTierRule[]): SourceTier {
  const domain = extractDomain(url);
  if (!domain) return 'T5';

  const rules = customRules ?? DEFAULT_TIER_RULES;

  // Check rules from T1 (best) to T5 (worst)
  for (const tier of ['T1', 'T2', 'T3', 'T4'] as SourceTier[]) {
    const tierRules = rules.filter((r) => r.tier === tier);
    for (const rule of tierRules) {
      if (rule.domains.some((d) => domain === d || domain.endsWith(`.${d}`))) {
        return tier;
      }
    }
  }

  return 'T5';
}

/** Result of a fetch attempt */
export interface FetchResult {
  url: string;
  success: boolean;
  content: string;
  title: string | null;
  publishedDate: string | null;
  error: string | null;
  statusCode: number | null;
}

/** Fetch a URL and extract text content */
export async function fetchUrl(url: string, timeoutMs = 15000): Promise<FetchResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'AnalysisTools/1.0 (Research Protocol)',
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        url,
        success: false,
        content: '',
        title: null,
        publishedDate: null,
        error: `HTTP ${response.status} ${response.statusText}`,
        statusCode: response.status,
      };
    }

    const html = await response.text();
    const title = extractTitle(html);
    const publishedDate = extractPublishedDate(html);
    const content = stripHtml(html);

    return {
      url,
      success: true,
      content: content.slice(0, 50000), // Cap at 50K chars
      title,
      publishedDate,
      error: null,
      statusCode: response.status,
    };
  } catch (err) {
    return {
      url,
      success: false,
      content: '',
      title: null,
      publishedDate: null,
      error: err instanceof Error ? err.message : String(err),
      statusCode: null,
    };
  }
}

/** Extract <title> from HTML */
function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

/** Try to extract publication date from meta tags */
function extractPublishedDate(html: string): string | null {
  // Common meta tag patterns
  const patterns = [
    /<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+name=["']pubdate["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+name=["']date["'][^>]+content=["']([^"']+)["']/i,
    /<time[^>]+datetime=["']([^"']+)["']/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const date = new Date(match[1]);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }
  }

  return null;
}

/** Strip HTML tags and return plain text */
function stripHtml(html: string): string {
  return html
    // Remove script and style blocks
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    // Remove nav, header, footer
    .replace(/<(nav|header|footer)[\s\S]*?<\/\1>/gi, '')
    // Remove all remaining tags
    .replace(/<[^>]+>/g, ' ')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/** Batch fetch multiple URLs */
export async function fetchMultiple(
  urls: string[],
  concurrency = 3,
): Promise<FetchResult[]> {
  const results: FetchResult[] = [];
  const batches: string[][] = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    batches.push(urls.slice(i, i + concurrency));
  }

  for (const batch of batches) {
    const batchResults = await Promise.all(batch.map((url) => fetchUrl(url)));
    results.push(...batchResults);
  }

  return results;
}
