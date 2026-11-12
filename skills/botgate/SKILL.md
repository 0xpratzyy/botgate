---
name: botgate
description: >-
  Block the web bots that take a site's pages and give nothing back, and leave
  the ones that send visitors or citations. Covers AI training crawlers
  (GPTBot, ClaudeBot, CCBot, Bytespider, and about 30 more), scrape-for-hire
  tools and data vendors, and SEO crawlers (AhrefsBot, SemrushBot, MJ12bot),
  while keeping search engines, AI answer engines, and link previews. Use when
  the user mentions AEO, AI crawlers, training bots, scrapers, robots.txt,
  blocking bots, GPTBot, ClaudeBot, or AhrefsBot.
---

# botgate

Sort every bot into one of two piles. A bot that sends visitors, citations, or link previews stays. A bot that only takes pages is removed.

The ready-to-paste block list is [robots.txt](robots.txt), and the matching edge rules are in [edge/](edge/). Every token, its operator, and what blocking it costs is in [bots.md](bots.md). IP lists and signature keys for the spoof check are in [sources.md](sources.md).

## What gets removed by default

Three groups, 70 tokens, all in [robots.txt](robots.txt).

1. **AI training crawlers.** GPTBot, ClaudeBot, CCBot, Amazonbot, meta-externalagent, Bytespider, MistralAI-Training, KimiBot, DeepSeekBot, and the rest. Also `Applebot-Extended` and `__usage_ai-training`, which are opt-out tokens and never crawl.
2. **Scrape-for-hire tools and data vendors.** Diffbot, Webzio, Firecrawl, Apify, Bright Data, ZoomInfo, BuiltWith, and the rest.
3. **SEO and marketing crawlers.** AhrefsBot, SemrushBot, MJ12bot, dotbot, DataForSeoBot, and the rest. Blocking these changes nothing in Google or Bing.

## What is never removed

- **Search engines.** Googlebot, bingbot, Applebot, DuckDuckBot, YandexBot, Baiduspider, and the smaller ones.
- **AI answer engines.** OAI-SearchBot, Claude-SearchBot, PerplexityBot, DuckAssistBot, MistralAI-Index, meta-webindexer, Amzn-SearchBot, and the rest. Blocking one drops the site out of that engine's answers.
- **Fetches a person asked for.** ChatGPT-User, Claude-User, Perplexity-User, MistralAI-User, meta-externalfetcher, Google-Agent, Amzn-User. Several of these ignore robots.txt because a person started the visit. Do not edge-block them.
- **Link previews.** facebookexternalhit, WhatsApp, Slackbot, Discordbot, Pinterestbot, LinkedInBot, and the rest. Blocking one breaks the card people see when the link is shared.

The full keep list is in [bots.md](bots.md).

## Ask before removing

These cost the owner something. Name the cost and let them choose.

| Token | What blocking costs |
|---|---|
| Google-Extended | Stops Gemini training, and also stops Gemini from citing the site through grounding. Google Search is unaffected. Google has no separate token for the two. |
| Timpibot, QwenBot, ERNIEBot, Doubaobot | Each one trains a model and feeds that company's answers under one token. |
| ShapBot, TerraCotta | Search APIs that AI apps call to find and cite pages. |
| AhrefsSiteAudit, SiteAuditBot, SemrushBot-SI, SemrushBot-SWA, SemrushBot-ESI, SplitSignalBot, RyteBot, rogerbot, lumar, deepcrawl, Oncrawl, similarweb, Screaming Frog SEO Spider | Audit bots. They only crawl a site when someone runs an audit on it, often the owner. Block them only if the owner uses none of these tools. |
| AhrefsBot | On the default list. It also feeds Yep, Ahrefs' small search engine. |
| SemrushBot | On the default list. Some robots.txt parsers match by prefix, so this rule can also stop the Semrush audit bots above. If the owner runs Semrush audits, add an explicit `Allow: /` group for the audit tokens they use. |

## Edge rules

robots.txt only stops bots that choose to honor it. Also block the same names at the edge, where the request is turned away before it reaches the site. `ISSCyberRiskCrawler` and `LAIONDownloader` are reported to ignore robots.txt, so the edge rule is the only thing that stops them.

Use the ready-made rules in [edge/](edge/). Do not write the match list by hand: they are generated from [robots.txt](robots.txt) by `node scripts/edge.mjs`, so the two never drift apart.

| Where the site runs | File | How to apply |
|---|---|---|
| Cloudflare (any plan) | [edge/cloudflare.txt](edge/cloudflare.txt) | Security → WAF → Custom rules → new rule, "Edit expression", paste, action Block. Or the Rulesets API: POST it as a rule with `"action": "block"` to the zone's `http_request_firewall_custom` entrypoint. One rule, about 3 KB, within the 4 KB limit. |
| nginx | [edge/nginx.conf](edge/nginx.conf) | The `map` goes in `http {}`, the `if` in each `server {}`. |
| Next.js (Vercel, Cloudflare, Node) | [edge/middleware.ts](edge/middleware.ts) | Save as `middleware.ts` at the app root. If one exists, merge the check into it. |

What the generator already handles, so you don't have to:

- Matching is case-insensitive substring on the User-Agent header.
- `/robots.txt` is never blocked, so a blocked bot can still read why.
- Short or ambiguous names use a safer form: `diffbot/` (so `Diffbot-User`, a person opening the page, gets through), `ccbot/`, `yibot/`. `YaK` is robots.txt-only, because `yak` appears in ordinary words.
- `Applebot-Extended`, `Google-Extended` and `__usage_ai-training` are left out. They are opt-out tokens and never crawl.
- A name covered by a shorter one is dropped: `semrushbot` covers `SemrushBot-BA`, `webzio` covers `Webzio-Extended`.

If the owner runs Semrush audits on their own site, the `semrushbot` match also blocks `SemrushBot-SI`, `-SWA` and `-ESI`. Add an exception for the audit bot they use before applying it.

**Generic tools.** `curl`, `Wget`, `python-requests`, `Python-urllib`, `Go-http-client`, `Scrapy`, `HeadlessChrome`, and `Lightpanda` are library defaults that many scrapers leave unchanged. They are not in robots.txt because these tools do not read it. Blocking them at the edge also blocks the owner's own scripts, webhooks, health checks, and deploy hooks. Offer it, list what would break, and allow the owner's own paths and IPs first.

## What a name list cannot stop

Tell the owner this plainly. Do not claim the site is closed to all bots.

- Oxylabs, ScrapingBee, Zyte, Jina Reader, and Bright Data's proxy network send ordinary browser user agents. They publish no token to block.
- Firecrawl, Apify, and Crawl4AI usually send a browser user agent too. Their robots.txt lines only catch the ones that honor robots.txt.
- Any scraper can rename itself.

These need behaviour-based protection: rate limits, a managed bot-protection product, or a challenge on suspicious traffic. That is a separate job from this list.

## Spoof check

A famous name from an address outside the operator's published list is a spoof, not that bot. Block it as a scraper, even if the name is on the keep list. Fetch the operator's file from [sources.md](sources.md) at check time. Do not paste IP ranges from memory.

## When you apply it

1. Read the live robots.txt. Add every default token that is missing, grouped as in [robots.txt](robots.txt). Do not delete an existing allow for a keep token. If a broad `User-agent: *` disallow would catch a keep token, add an explicit `Allow: /` group for it.
2. Ask about the "Ask before removing" rows that apply.
3. Add the edge block from [edge/](edge/) for the platform the site runs on.
4. On a live site, show the diff first. Apply it when the owner says to.
5. Run `node scripts/check.mjs https://<site> /` and report the result. It sends a request as each bot and shows leaks (a listed bot that still gets in) and anything kept that got blocked. Run it again after any change to robots.txt or the edge rule.

## Keeping the list current

Run `node scripts/sync.mjs` now and then. It lists names the community list [ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt) has that botgate has not decided on yet, and source URLs in [sources.md](sources.md) that stopped answering. It changes nothing. Add a name only after reading the operator's own page, and put it in [bots.md](bots.md) and [robots.txt](robots.txt), then regenerate [edge/](edge/).
