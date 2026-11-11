# botgate

An agent skill that decides which bots get into your site. Bots that send you visitors, citations, or link previews stay. Bots that only take your pages are blocked.

Most "block AI bots" lists block everything, which also drops your site out of ChatGPT, Claude, and Perplexity answers. This one keeps the two groups apart.

## What it blocks

70 robots.txt tokens in three groups, ready to paste from [skills/botgate/robots.txt](skills/botgate/robots.txt).

- **AI training crawlers (31).** GPTBot, ClaudeBot, CCBot, Amazonbot, meta-externalagent, Bytespider, MistralAI-Training, KimiBot, DeepSeekBot, and more.
- **Scrape-for-hire tools and data vendors (25).** Diffbot, Webzio, Firecrawl, Apify, Bright Data, ZoomInfo, BuiltWith, and more.
- **SEO and marketing crawlers (14).** AhrefsBot, SemrushBot, MJ12bot, dotbot, DataForSeoBot, and more.

## What it keeps

53 tokens the skill never blocks.

- **Search engines.** Googlebot, bingbot, Applebot, DuckDuckBot, and the smaller ones.
- **AI answer engines.** OAI-SearchBot, Claude-SearchBot, PerplexityBot, DuckAssistBot, MistralAI-Index, meta-webindexer, and more.
- **Fetches a person asked for.** ChatGPT-User, Claude-User, Perplexity-User, and more.
- **Link previews.** facebookexternalhit, WhatsApp, Slackbot, Discordbot, and more.

## What it asks you first

Some blocks cost you something, so the skill names the cost and lets you choose.

- `Google-Extended` stops Gemini training, and also stops Gemini from citing you.
- A few bots train a model and feed that company's answers under one name.
- SEO audit bots only crawl when someone runs an audit, often you.
- Generic tools such as `curl` and `python-requests` are used by scrapers and by your own scripts.

## What it cannot do

A name list does not close a site to every bot. Scrapers that send an ordinary browser user agent, such as Oxylabs, ScrapingBee, Zyte, and Bright Data's proxy network, publish no name to block. Those need rate limits or a bot-protection product. The skill says so instead of pretending.

## How it works

When you ask your coding agent about AI crawlers, scrapers, robots.txt, or AEO, the skill tells it to:

1. Read your live robots.txt and add each blocked token that is missing.
2. Block the same crawlers at the edge, because robots.txt only stops bots that choose to honor it.
3. Leave every kept bot alone.
4. Treat a known bot name from the wrong network as a spoof, checked against the operator's live IP list.
5. Show you the diff before it changes a live site.

## Files

- [SKILL.md](skills/botgate/SKILL.md): the rules the agent follows.
- [robots.txt](skills/botgate/robots.txt): the block list, ready to paste.
- [bots.md](skills/botgate/bots.md): every bot, who runs it, and what blocking it costs.
- [sources.md](skills/botgate/sources.md): operators' IP lists and signature keys for the spoof check.

## Install

Copy the skill folder into your agent's skills directory.

```sh
git clone https://github.com/0xpratzyy/botgate
cp -r botgate/skills/botgate ~/.claude/skills/    # Claude Code
cp -r botgate/skills/botgate ~/.cursor/skills/    # Cursor
```

Then ask your agent something like "block the bots that scrape this site".

## Keeping it current

Bot names change. The lists were checked on 2026-11-11 against each operator's own docs where they exist, and against the [ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt) and Known Agents directories where they do not. [bots.md](skills/botgate/bots.md) marks which is which. If you spot a new or renamed bot, open an issue or a PR.

## License

MIT
