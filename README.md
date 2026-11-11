# block-training-bots

An agent skill that sorts AI bots at your site's door. Crawlers that get you cited in ChatGPT, Claude, and Perplexity walk in. Crawlers that only scrape your pages for model training stay out.

Most "block AI bots" lists block everything, which also drops your site out of the answer engines. This one keeps the two groups apart.

## What it does

When you ask your coding agent about AI crawlers, robots.txt, or AEO, the skill tells it to:

1. Read your live robots.txt and add a `Disallow` for each training crawler that is missing.
2. Block those crawlers at the edge too, because robots.txt only stops bots that choose to honor it.
3. Leave every answer-engine and search bot alone.
4. Treat a known bot name from the wrong network as a spoof, checked against the operator's live IP list.
5. Show you the diff before it changes a live site.

## Stay out (training only)

GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Amazonbot, meta-externalagent, Bytespider, Diffbot, AI2Bot, AI2Bot-Dolma, ImagesiftBot, MistralAI-Training, Webzio-Extended, Omgilibot.

## Walk in (they cite or link you)

OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, DuckAssistBot, MistralAI-Index, MistralAI-User, Meta-WebIndexer, meta-externalfetcher, Google-Agent, Amzn-SearchBot, Amzn-User, Applebot, Googlebot, bingbot.

The full tables, with what each block does and the ready-to-paste robots.txt, are in [skills/block-training-bots/SKILL.md](skills/block-training-bots/SKILL.md). The operators' live IP lists and signature keys are in [skills/block-training-bots/sources.md](skills/block-training-bots/sources.md).

## Install

Copy the skill folder into your agent's skills directory.

```sh
git clone https://github.com/0xpratzyy/block-training-bots
cp -r block-training-bots/skills/block-training-bots ~/.claude/skills/    # Claude Code
cp -r block-training-bots/skills/block-training-bots ~/.cursor/skills/    # Cursor
```

Then ask your agent something like "remove the AI training crawlers from this site".

## Keeping it current

Bot names change. The lists were checked against each operator's own docs on 2026-11-11. If you spot a new training crawler or a renamed one, open an issue or a PR.

## License

MIT
