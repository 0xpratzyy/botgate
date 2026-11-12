#!/usr/bin/env node
// Is the list still current? Usage: node sync.mjs
//  1. Compares bots.md with the community list ai.robots.txt (github.com/ai-robots-txt/ai.robots.txt): names it has that
//     botgate has never decided on. Each one needs a decision (remove, keep or ask first) and a source before it's added.
//  2. Fetches every URL in sources.md and reports any that no longer answer 200 (renamed or retired IP lists).
// It changes nothing; it prints what to review.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(join(here, "..", f), "utf8");
const known = new Set();
for (const line of read("bots.md").split("\n")) {
  if (!line.startsWith("| ") || /^\|\s*(Token|---)/.test(line)) continue;
  for (const t of line.split("|")[1].split(",")) known.add(t.trim().replace(/`/g, "").toLowerCase());
}
for (const l of read("robots.txt").split("\n")) if (l.startsWith("User-agent:")) known.add(l.slice(11).trim().toLowerCase());

const COMMUNITY = "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.json";
const community = await (await fetch(COMMUNITY)).json();
const fresh = Object.entries(community).filter(([name]) => !known.has(name.toLowerCase()));
console.log(`ai.robots.txt lists ${Object.keys(community).length} names; ${fresh.length} are not in botgate yet.\n`);
console.log("Not decided yet (check the operator's own page before adding):");
for (const [name, v] of fresh) console.log(`  ${name.padEnd(32)} ${String(v.operator ?? "").replace(/\[|\]\(.*?\)/g, "").slice(0, 28).padEnd(28)} ${String(v.function ?? "").slice(0, 60)}`);

const urls = [...new Set([...read("sources.md").matchAll(/https:\/\/[^\s)|`"]+/g)].map((m) => m[0]))];
console.log(`\nChecking ${urls.length} source URLs:`);
let bad = 0;
await Promise.all(urls.map(async (u) => {
  try {
    const r = await fetch(u, { headers: { "user-agent": "botgate-sync" }, redirect: "follow" });
    await r.body?.cancel();
    if (r.status === 429) console.log(`  429  ${u} (rate-limited, not broken; retry later)`);
    else if (r.status !== 200) { bad++; console.log(`  ${r.status}  ${u}`); }
  } catch (e) { bad++; console.log(`  FAIL ${u} (${e.cause?.code ?? e.message})`); }
}));
console.log(bad ? `${bad} source URL(s) to fix in sources.md.` : "  all 200.");
