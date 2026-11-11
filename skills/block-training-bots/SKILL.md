---
name: block-training-bots
description: >-
  Remove AI training crawlers that do not help answer-engine optimization, and
  leave the crawlers that get a site cited. The remove list is GPTBot,
  ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Amazonbot,
  meta-externalagent, Bytespider, Diffbot, AI2Bot, ImagesiftBot,
  MistralAI-Training, and Webzio-Extended. Use when the user mentions AEO,
  AI crawlers, training bots, GPTBot, ClaudeBot, robots.txt, blocking scrapers,
  or DNA by D3.
---

# Remove training crawlers

These bots scrape pages for model training. They do not send shoppers or citations. Remove them. Do not remove the answer-engine bots in the keep list. Blocking those drops the site out of ChatGPT, Claude, Perplexity, and the rest.

People in browsers, Googlebot, and Bingbot stay as they are.

## Remove

Operator-documented training crawlers and training opt-out tokens. Disallow every one in robots.txt. At the edge, block the crawlers when the user agent matches. The two tokens never show up in logs. robots.txt is the only switch for them.

| Token | Who | What blocking does |
|---|---|---|
| GPTBot | OpenAI | Out of OpenAI training. ChatGPT search uses OAI-SearchBot and stays. |
| ClaudeBot | Anthropic | Out of Anthropic training. Claude search uses Claude-SearchBot and stays. |
| Google-Extended | Google | Token, not a crawler. Out of Gemini training. Google Search stays. It never appears in logs. |
| Applebot-Extended | Apple | Token, not a crawler. Out of Apple model training. Spotlight, Siri, and Safari search stay. It never appears in logs. |
| CCBot | Common Crawl | Out of future Common Crawl archives, which training sets reuse. |
| Amazonbot | Amazon | Out of Amazon's crawl, which they say may train models. Alexa search uses Amzn-SearchBot and stays. |
| meta-externalagent | Meta | Out of Meta's training crawl. Meta AI search uses Meta-WebIndexer and stays. |
| Diffbot | Diffbot | Out of their knowledge-graph crawl. |
| AI2Bot | Allen Institute | Out of their model-training crawl. Also disallow AI2Bot-Dolma, the Dolma dataset crawler. |
| ImagesiftBot | Hive | Out of their image-and-alt-text crawl. Name it. With no rule of its own it copies the Googlebot rule. |
| MistralAI-Training | Mistral | Out of Mistral training. Their search index uses MistralAI-Index and stays. |
| Webzio-Extended | Webz.io | Out of Webz.io's AI-use dataset. Also disallow Omgilibot, their old name. |
| Bytespider | ByteDance | Training crawler. ByteDance does not publish a doc for it. Still remove it. It is common and it does not cite you. |

Also add the shared training preference. It is not a crawler. Google, Microsoft, and OpenAI have said they will honor it. It does not block search.

```
User-agent: __usage_ai-training
Disallow: /
```

## Keep

These fetch pages so an answer engine can cite or link the site. Allow them.

| Token | Who | Why it stays |
|---|---|---|
| OAI-SearchBot | OpenAI | ChatGPT search citations |
| ChatGPT-User | OpenAI | A person asked ChatGPT to open the page |
| Claude-SearchBot | Anthropic | Claude search citations |
| Claude-User | Anthropic | A person asked Claude to open the page |
| PerplexityBot | Perplexity | Perplexity citations. They say it is not used for training. |
| Perplexity-User | Perplexity | A person asked Perplexity to open the page |
| DuckAssistBot | DuckDuckGo | Cited DuckAssist answers. They say it is not used for training. |
| MistralAI-Index | Mistral | Mistral search. They say the index is not used for training. |
| MistralAI-User | Mistral | A person asked Mistral to open the page |
| Meta-WebIndexer | Meta | Meta AI search citations |
| meta-externalfetcher | Meta | A person asked Meta AI to open the page |
| Google-Agent | Google | An agent acting for a person |
| Amzn-SearchBot | Amazon | Alexa and Amazon search, not training |
| Amzn-User | Amazon | A person asked Alexa |
| Applebot | Apple | Spotlight, Siri, Safari search |
| Googlebot | Google | Google Search |
| bingbot | Microsoft | Bing and Copilot search |

ChatGPT-User, Perplexity-User, meta-externalfetcher, Google-Agent, and Amzn-User may ignore robots.txt because a person started the visit. Do not edge-block them.

## robots.txt

One group per token. Leave every keep token unlisted, or write `Allow: /` if a broad `User-agent: *` would catch it.

```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: AI2Bot
Disallow: /

User-agent: AI2Bot-Dolma
Disallow: /

User-agent: ImagesiftBot
Disallow: /

User-agent: MistralAI-Training
Disallow: /

User-agent: Webzio-Extended
Disallow: /

User-agent: Omgilibot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: __usage_ai-training
Disallow: /
```

robots.txt only stops crawlers that choose to honor it. For every name in the remove table except Google-Extended and Applebot-Extended, also block that user agent at the edge. Match the token, not a whole browser string.

A famous name from an address outside the operator's published list is a spoof, not that bot. Block it as a scraper. Do not let it through because the token is on the keep list. Live check URLs are in [sources.md](sources.md). Fetch the file at check time. Do not paste IP ranges from memory.

## When you apply it

1. Read the live robots.txt. Add any remove token that is missing. Do not delete a keep token's allow.
2. Add the edge block for the crawlers, not the two tokens.
3. On a live site, show the diff first. Apply it when the owner has asked to remove them.

Verify URLs and the spoof check: [sources.md](sources.md).
