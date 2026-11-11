# Check URLs

Fetch at check time. A copied IP range goes stale.

A request that claims a keep-list name is still a scraper if its IP is outside the published list, or its signature does not verify.

## Remove list, where they publish ranges

| Token | Verify |
|---|---|
| GPTBot | https://openai.com/gptbot.json |
| ClaudeBot | https://claude.com/crawling/bots.json (same file as Claude-SearchBot and Claude-User; the user agent decides which) |
| CCBot | https://index.commoncrawl.org/ccbot.json |
| Amazonbot | Amazon's published IP page |

Google-Extended and Applebot-Extended publish nothing to match. They are robots.txt tokens.

Bytespider, Diffbot, AI2Bot, ImagesiftBot, MistralAI-Training, Webzio-Extended, and Omgilibot: block on the user-agent token. No stable public IP file worth pinning.

## Keep list, where they publish ranges

| Token | Verify |
|---|---|
| OAI-SearchBot | https://openai.com/searchbot.json |
| ChatGPT-User | https://openai.com/chatgpt-user.json |
| Claude-SearchBot, Claude-User | https://claude.com/crawling/bots.json |
| PerplexityBot | https://www.perplexity.ai/perplexitybot.json |
| Perplexity-User | https://www.perplexity.ai/perplexity-user.json |
| DuckAssistBot | https://duckduckgo.com/duckassistbot.json |
| Google-Agent | Signature, some requests: https://agent.bot.goog/.well-known/http-message-signatures-directory . Else https://developers.google.com/static/search/apis/ipranges/user-triggered-agents.json |
| Googlebot | https://developers.google.com/static/search/apis/ipranges/googlebot.json and reverse DNS to googlebot.com |
| bingbot | https://www.bing.com/toolbox/bingbot.json |
| Applebot | https://search.developer.apple.com/applebot.json |
| ChatGPT agent (cloud browser) | Signature. `Signature-Agent: "https://chatgpt.com"`. Keys: https://chatgpt.com/.well-known/http-message-signatures-directory |

Docs: https://developers.openai.com/api/docs/bots and https://docs.perplexity.ai/docs/resources/perplexity-crawlers

Meta's keep tokens (Meta-WebIndexer, meta-externalfetcher) and Mistral's (MistralAI-Index, MistralAI-User) publish no IP list. Allow the token. Do not call the visit proven.
