// Museum of the Year 3000 entry: a museum label for Exhibit 7, a cracked
// smartphone displayed as a relic, reflecting on daily worship and loneliness.
import * as fs from "node:fs";

const LABEL =
  "Exhibit 7: a cracked smartphone, once worshipped daily, now silent behind glass, teaching visitors about loneliness.";

function validateLabel(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error("Label must be 1 to 200 characters.");
  }
  if (text.trim().length === 0 || text.trim() !== text) {
    throw new Error("Label must not be only whitespace or have surrounding whitespace.");
  }
  if (text.includes("\n")) {
    throw new Error("Label must be a single line.");
  }
  const words = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean);
  if (new Set(words).size !== words.length) {
    throw new Error("Label must not repeat any word.");
  }
  for (const ch of text) {
    if (ch.codePointAt(0)! > 0x1f000) {
      throw new Error("Label must not contain emoji.");
    }
  }
}

validateLabel(LABEL);
fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LABEL, "utf8");
