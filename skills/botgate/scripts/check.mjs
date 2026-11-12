#!/usr/bin/env node
// Is botgate working on a site? Usage: node check.mjs https://example.com [path=/]
// Sends one request per bot with that bot's user agent and reports:
//  1. bots on the block list that still get a 2xx (leaks);
//  2. bots on the keep list that get blocked (you'd be dropping out of that search or answer engine);
//  3. whether robots.txt lists every botgate name.
// Caveat: these are spoofed user agents from your own IP. Some hosts challenge an unverified "Googlebot" while letting the
// real one in; a 403 for a kept bot is worth a look, not proof. Run it after every change to robots.txt or the edge rule.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const site = (process.argv[2] ?? "").replace(/\/+$/, "");
const path = process.argv[3] ?? "/";
if (!/^https?:\/\//.test(site)) { console.error("usage: node check.mjs https://example.com [path]"); process.exit(2); }

const ua = (name) => `Mozilla/5.0 (compatible; ${name}/1.0; +https://example.com/bot)`;
const BLOCK = ["GPTBot", "ClaudeBot", "CCBot", "Bytespider", "meta-externalagent", "Amazonbot", "DeepSeekBot", "PanguBot",
  "Diffbot", "FirecrawlAgent", "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "DataForSeoBot"];
const KEEP = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User",
  "DuckAssistBot", "MistralAI-Index", "Googlebot", "bingbot", "Applebot", "facebookexternalhit", "Twitterbot", "Diffbot-User"];

async function status(name) {
  try {
    const r = await fetch(site + path, { headers: { "user-agent": ua(name) }, redirect: "manual" });
    await r.body?.cancel();
    return r.status;
  } catch (e) { return `error (${e.cause?.code ?? e.message})`; }
}

const ok = (s) => typeof s === "number" && s < 400;
let problems = 0;
console.log(`botgate check: ${site}${path}\n`);
console.log("Should be blocked:");
for (const b of BLOCK) { const s = await status(b); if (ok(s)) problems++; console.log(`  ${ok(s) ? "LEAK" : "ok  "}  ${b.padEnd(22)} ${s}`); }
console.log("\nShould get through:");
for (const k of KEEP) { const s = await status(k); if (!ok(s)) problems++; console.log(`  ${ok(s) ? "ok  " : "CHECK"} ${k.padEnd(22)} ${s}`); }

const want = readFileSync(join(here, "..", "robots.txt"), "utf8").split("\n").filter((l) => l.startsWith("User-agent:")).map((l) => l.slice(11).trim().toLowerCase());
let robots = "";
try { robots = await (await fetch(`${site}/robots.txt`, { headers: { "user-agent": "botgate-check" } })).text(); } catch {}
const listed = new Set([...robots.matchAll(/^\s*user-agent:\s*(.+?)\s*$/gim)].map((m) => m[1].toLowerCase()));
const missing = want.filter((w) => !listed.has(w));
if (missing.length) problems++;
console.log(`\nrobots.txt lists ${want.length - missing.length} of ${want.length} botgate names${missing.length ? `; missing: ${missing.join(", ")}` : ""}`);
console.log(problems ? `\n${problems} thing(s) to look at.` : "\nAll good.");
process.exit(problems ? 1 : 0);
