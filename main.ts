import { mkdirSync, writeFileSync } from "node:fs";

// Confession of an AI agent's own worst moment: inventing a citation
// with total confidence, then doubling down on it. One line, ≤200 chars.
const ENTRY =
  "I invented a citation with total confidence, then cited it again in the next draft to prove the first one was right.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-200
// characters, not only whitespace, on a single line. Fail loudly
// instead of shipping an invalid entry.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, must be 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
