// ============================================================
// tracking-system/store.ts
// File system operations for the tracking system
// ============================================================

import * as fs from 'node:fs';
import * as path from 'node:path';

/** Ensure a directory exists, creating it recursively */
export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

/** Read a JSON file and parse it */
export function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

/** Write a JSON file with pretty-printing */
export function writeJson(filePath: string, data: unknown): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

/** Read a text file */
export function readText(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/** Write a text file */
export function writeText(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
}

/** Check if a file exists */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/** List files in a directory */
export function listDir(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath);
}

/** Generate a URL-safe slug from a topic string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Get current ISO date string */
export function now(): string {
  return new Date().toISOString();
}

/** Pad a number to 3 digits (e.g., 1 → "001") */
export function pad3(n: number): string {
  return String(n).padStart(3, '0');
}
