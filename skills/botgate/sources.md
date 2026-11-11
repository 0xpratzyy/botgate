# Check URLs

Fetch at check time. A copied IP range goes stale. Every URL here returned 200 on 2026-11-11.

A request that claims a keep-list name is still a scraper if its IP is outside the published list, or its signature does not verify.

## IP range files

| Token | URL |
|---|---|
| GPTBot | https://openai.com/gptbot.json |
| OAI-SearchBot | https://openai.com/searchbot.json |
| ChatGPT-User | https://openai.com/chatgpt-user.json |
| OAI-AdsBot | https://openai.com/adsbot.json |
| ClaudeBot, Claude-SearchBot, Claude-User | https://claude.com/crawling/bots.json (one file; the user agent decides which) |
| PerplexityBot | https://www.perplexity.ai/perplexitybot.json |
| Perplexity-User | https://www.perplexity.ai/perplexity-user.json |
| CCBot | https://index.commoncrawl.org/ccbot.json |
| Googlebot and Google's other common crawlers | https://developers.google.com/static/crawling/ipranges/common-crawlers.json |
| Google special-case crawlers | https://developers.google.com/static/crawling/ipranges/special-crawlers.json |
| Google-Agent | https://developers.google.com/static/crawling/ipranges/user-triggered-agents.json |
| Google user-triggered fetchers | https://developers.google.com/static/crawling/ipranges/user-triggered-fetchers.json and https://developers.google.com/static/crawling/ipranges/user-triggered-fetchers-google.json |
| bingbot | https://www.bing.com/toolbox/bingbot.json |
| Applebot | https://search.developer.apple.com/applebot.json |
| Amazonbot | https://developer.amazon.com/amazonbot/ip-addresses/ |
| Amzn-SearchBot | https://developer.amazon.com/amazonbot/searchbot-ip-addresses/ |
| Amzn-User | https://developer.amazon.com/amazonbot/live-ip-addresses/ |
| MistralAI-Index | https://mistral.ai/mistralai-index-ips.json |
| MistralAI-User | https://mistral.ai/mistralai-user-ips.json |
| DuckAssistBot | https://duckduckgo.com/duckassistbot.json |
| DuckDuckBot | https://duckduckgo.com/duckduckbot.json |
| LinkupBot | https://www.linkup.so/linkupbot-ips.txt |
| Qwantbot | https://help.qwant.com/qwantbot.json |
| SeznamBot | https://search.seznam.cz/ipranges/seznambot.json |
| Yeti | https://searchadvisor.naver.com/doc/naverbot.json |
| MojeekBot | https://www.mojeek.com/mojeekbot.json |

Google's older paths under `/static/search/apis/ipranges/` now redirect to the ones above.

## Signature key directories

For bots that sign requests (HTTP Message Signatures).

| Bot | URL |
|---|---|
| ChatGPT agent (`Signature-Agent: "https://chatgpt.com"`) | https://chatgpt.com/.well-known/http-message-signatures-directory |
| Google-Agent (some requests) | https://agent.bot.goog/.well-known/http-message-signatures-directory |
| YouBot | https://you.com/.well-known/http-message-signatures-directory |
| ExaSearchBot | https://crawler.exa.ai/.well-known/http-message-signatures-directory |

## Reverse DNS instead of a file

| Bot | Check |
|---|---|
| Googlebot | Reverse DNS to `googlebot.com` or `google.com`, then a forward lookup. |
| YandexBot | Reverse DNS to `yandex.ru`, `yandex.net`, or `yandex.com`, then a forward lookup. |
| Baiduspider | Reverse DNS to `*.baidu.com` or `*.baidu.jp`. |
| MojeekBot | Reverse DNS to `*.mojeek.com`. |
| YouBot | Reverse DNS to `youbot-*.search.you.com`. |
| Pinterestbot | Reverse DNS to `pinterest.com` or `pinterestcrawler.com`. Pinterest says not to pin IPs. |
| Kagibot | Kagi prints its addresses on https://kagi.com/bot and publishes no file. |

## No published list

Meta (meta-webindexer, meta-externalfetcher), MistralAI-Training, and the tokens marked "Directory" in [bots.md](bots.md) publish no IP list. Allow or block on the token. Do not call the visit proven.

## Operator docs

- OpenAI: https://developers.openai.com/api/docs/bots
- Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Google: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
- Meta: https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
- Mistral: https://docs.mistral.ai/robots
- Amazon: https://developer.amazon.com/docs/amazonbot/amazonbot.html
- Apple: https://support.apple.com/en-us/119829
- Community list: https://github.com/ai-robots-txt/ai.robots.txt
