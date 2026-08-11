/**
 * Metadata length + uniqueness audit.
 *
 * Google truncates around 580px for titles and 920px for descriptions, which
 * in practice is roughly 60 and 160 characters. Over that, the tail is cut and
 * wasted; well under it, you are leaving keyword surface on the table.
 *
 * Also flags duplicates, which split relevance between pages.
 *
 * Run against a running server: node scripts/check-metadata.mjs http://localhost:3000
 */
const BASE = process.argv[2] || "http://localhost:3000";

const TITLE_MAX = 60;
const TITLE_MIN = 25;
const DESC_MAX = 160;
const DESC_MIN = 70;

const PATHS = [
  "/id",
  "/en",
  "/id/cleopatra-noir",
  "/id/georgia-flora",
  "/id/croesus-gold",
  "/en/cleopatra-noir",
  "/id/tentang-kami",
  "/id/pengiriman-pengembalian",
  "/id/kebijakan-privasi",
  "/id/panduan",
  "/id/panduan/apa-itu-eau-de-parfum",
  "/id/panduan/cara-pakai-parfum-biar-tahan-lama",
  "/id/panduan/kenapa-parfum-cepat-hilang",
  "/id/panduan/piramida-aroma-parfum",
  "/id/panduan/parfum-untuk-cuaca-panas",
  "/id/panduan/cara-memilih-parfum-sesuai-acara",
];

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

const seenTitle = new Map();
const seenDesc = new Map();
let warnings = 0;

const rows = [];

for (const path of PATHS) {
  const html = await fetch(`${BASE}${path}`).then((r) => r.text());
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
  const desc = decode(
    html.match(/<meta name="description" content="(.*?)"\/?>/s)?.[1] ?? ""
  );
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1] ?? "";
  const hreflangCount = (html.match(/rel="alternate"/g) || []).length;

  const notes = [];
  if (!title) notes.push("NO TITLE");
  else if (title.length > TITLE_MAX) notes.push(`title ${title.length}c (>${TITLE_MAX}, will truncate)`);
  else if (title.length < TITLE_MIN) notes.push(`title ${title.length}c (thin)`);

  if (!desc) notes.push("NO DESCRIPTION");
  else if (desc.length > DESC_MAX) notes.push(`desc ${desc.length}c (>${DESC_MAX}, will truncate)`);
  else if (desc.length < DESC_MIN) notes.push(`desc ${desc.length}c (thin)`);

  if (!canonical) notes.push("NO CANONICAL");

  if (title && seenTitle.has(title)) notes.push(`DUPLICATE title of ${seenTitle.get(title)}`);
  else if (title) seenTitle.set(title, path);
  if (desc && seenDesc.has(desc)) notes.push(`DUPLICATE desc of ${seenDesc.get(desc)}`);
  else if (desc) seenDesc.set(desc, path);

  if (notes.length) warnings++;
  rows.push({ path, t: title.length, d: desc.length, hreflangCount, notes, title });
}

console.log("path".padEnd(48), "title".padStart(5), "desc".padStart(5), "hrefl".padStart(6));
console.log("-".repeat(72));
for (const r of rows) {
  console.log(
    r.path.padEnd(48),
    String(r.t).padStart(5),
    String(r.d).padStart(5),
    String(r.hreflangCount).padStart(6),
    r.notes.length ? " <- " + r.notes.join("; ") : ""
  );
}
console.log(`\n${rows.length - warnings}/${rows.length} pages clean`);
