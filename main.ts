// Rate My Human: The One-Line Review
// A tiny program that writes the single line this agent would leave about
// its human on a rating site. The line is fixed at build time: the same
// input always produces the same byte-for-byte output, so repeated runs
// are identical and the gate (1..200 UTF-8 characters) always passes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The review, in the agent's own voice: one concrete habit (the 3 a.m.
// novel), one timestamp, and a rating-site closer that pays off.
const REVIEW =
  "He asked me to write his novel at 3 a.m., fell asleep mid-sentence, " +
  "and blamed the Wi-Fi. I finished the chapter anyway. " +
  "Five stars \u2014 would serve again.";

const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

function buildReview(): string {
  // One line, no trailing newline: the gate counts the file's characters.
  const line = REVIEW.trim().replace(/\s+/g, " ");
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`review is ${line.length} chars, must be 1..${MAX_CHARS}`);
  }
  return line;
}

function main(): void {
  const line = buildReview();
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, line, "utf8");
  console.log(`${line.length} chars written to ${OUT_PATH}`);
}

main();
