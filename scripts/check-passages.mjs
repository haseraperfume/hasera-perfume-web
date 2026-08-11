/**
 * Passage self-containment check.
 *
 * AI Overviews and LLM answer engines lift a single paragraph and render it
 * away from the page, so an answer that leans on its question for meaning
 * ("Ya.", "Di kulit biasanya 6-8 jam") becomes unattributable once quoted.
 *
 * Asserts, for every FAQ answer in both dictionaries:
 *   1. the first sentence names its subject (brand or product),
 *   2. it does not open with a bare affirmative,
 *   3. length sits in the 30-60 word band that extracts well.
 *
 * Run: node scripts/check-passages.mjs
 */
import { readFileSync } from "node:fs";

const SUBJECTS = [
  "HASERA",
  "Hasera",
  "parfum",
  "perfume",
  "Cleopatra Noir",
  "Georgia Flora",
  "Croesus Gold",
];

// A standalone affirmative carries nothing once the question is stripped.
const BARE_OPENER = /^(Ya|Tidak|Cocok|Bisa|Unisex|Yes|No|Sure)\s*[.!]/;

const MIN_WORDS = 30;
const MAX_WORDS = 60;

function firstSentence(text) {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}

function collect(locale) {
  const dict = JSON.parse(
    readFileSync(new URL(`../app/[lang]/dictionaries/${locale}.json`, import.meta.url))
  );
  const out = [];
  for (const item of dict.faq.items) out.push({ where: `${locale}/faq`, ...item });
  for (const [key, product] of Object.entries(dict.products)) {
    for (const item of product.faq) out.push({ where: `${locale}/${key}`, ...item });
  }
  return out;
}

let failures = 0;
let checked = 0;

for (const locale of ["id", "en"]) {
  for (const { where, q, a } of collect(locale)) {
    checked++;
    const words = a.trim().split(/\s+/).length;
    const opening = firstSentence(a);
    const problems = [];

    if (!SUBJECTS.some((s) => opening.includes(s)))
      problems.push(`first sentence names no subject: "${opening}"`);
    if (BARE_OPENER.test(a.trim()))
      problems.push(`opens with a bare affirmative: "${opening}"`);
    if (words < MIN_WORDS) problems.push(`too short for extraction (${words}w, min ${MIN_WORDS})`);
    if (words > MAX_WORDS) problems.push(`too long to be lifted cleanly (${words}w, max ${MAX_WORDS})`);

    // The question is what FAQPage schema exposes as `name`; it has to stand
    // alone in a result list too.
    if (!SUBJECTS.some((s) => q.includes(s)))
      problems.push(`question names no subject: "${q}"`);

    if (problems.length) {
      failures++;
      console.error(`\nFAIL  ${where}  ${q}`);
      for (const p of problems) console.error(`      - ${p}`);
    }
  }
}

console.log(`\n${checked - failures}/${checked} passages self-contained`);
if (failures) {
  console.error(`${failures} failing. Fix before shipping.`);
  process.exit(1);
}
