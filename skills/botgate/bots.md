# Every bot, by group

Checked 2026-11-11. "Operator page" means the company that runs the bot documents the token itself. "Directory" means the token comes from the ai.robots.txt project or the Known Agents directory, which is weaker evidence.

robots.txt matching is case-insensitive. Edge rules often are not, so match case-insensitively there too.

## Remove: AI training crawlers

| Token | Operator | Notes | Evidence |
|---|---|---|---|
| GPTBot | OpenAI | Training. ChatGPT search uses OAI-SearchBot. | Operator page |
| ClaudeBot | Anthropic | Training. Claude search uses Claude-SearchBot. | Operator page |
| Applebot-Extended | Apple | Opt-out token, never crawls. Stops Apple model training on pages Applebot fetched. | Operator page |
| CCBot | Common Crawl | Public archive that training sets reuse. | Operator page |
| Amazonbot | Amazon | Amazon says the crawl may train models. Alexa search uses Amzn-SearchBot. | Operator page |
| meta-externalagent | Meta | Training crawl. Meta AI search uses meta-webindexer. | Operator page |
| FacebookBot | Meta | Reported to collect speech-model training data. Not the link-preview bot. | Directory |
| Bytespider | ByteDance | Training crawl. No operator doc. | Directory |
| AI2Bot, AI2Bot-Dolma | Allen Institute | Model training and the Dolma dataset. | Operator page |
| ImagesiftBot | Hive | Image and alt-text crawl. With no rule of its own it copies the Googlebot rule. | Operator page |
| MistralAI-Training | Mistral | Training. Mistral search uses MistralAI-Index. | Operator page |
| KimiBot | Moonshot AI | Training. Kimi search uses Kimi-SearchBot. | Operator page |
| MoonshotBot | Moonshot AI | Older or second Moonshot token, classed as training. | Directory |
| ElevenlabsCrawler | ElevenLabs | Training. ElevenlabsBot is a customer knowledge-base fetch and is left alone. | Operator page |
| Reflectionbot | Reflection AI | Builds Reflection's models. | Operator page |
| SBIntuitionsBot | SB Intuitions (SoftBank) | Sarashina model training. Its search bot is a separate token. | Operator page |
| Cotoyogi | ROIS-DS, Japan | Japanese-language text corpus. | Operator page |
| ICC-Crawler | NICT, Japan | Research archive and translation data. | Operator page |
| PanguBot | Huawei | PanGu model training. Huawei search uses PetalBot. | Directory |
| DeepSeekBot | DeepSeek | Model training. | Directory |
| Hunyuan | Tencent | Hunyuan model training. | Directory |
| ChatGLM-Spider | Zhipu AI | Model training and evaluation. | Directory |
| YiBot | 01.AI | Yi model training. | Directory |
| Kangaroo Bot | Kangaroo LLM | Australian open-model training. | Directory |
| FriendlyCrawler | Unknown | Machine-learning datasets. | Directory |
| ISSCyberRiskCrawler | ISS Corporate | Trains cyber-risk models. Reported to ignore robots.txt. | Directory |
| LAIONDownloader | LAION | Research datasets. Reported to ignore robots.txt. | Directory |
| img2dataset | Anyone running the tool | Image dataset downloader. Only matches runs that kept this name. | Directory |
| Sidetrade indexer bot | Sidetrade | Data extraction, including AI product training. | Directory |
| __usage_ai-training | Shared preference | Not a crawler. A training opt-out token from an IETF draft. The community list reports that Anthropic, OpenAI, and Google honor it. | Directory |

## Remove: scrape-for-hire tools and data vendors

| Token | Operator | Notes | Evidence |
|---|---|---|---|
| Diffbot | Diffbot | Knowledge-graph and web-data crawl, sold as structured data. Diffbot-User is a person-started fetch and is left alone. | Operator page |
| Webzio, Webzio-Extended | Webz.io | Paid web-data API, and its AI-use flag. | Operator page |
| omgili, omgilibot | Webz.io | Older names for the same crawl. | Operator page |
| FirecrawlAgent | Firecrawl | Crawl API for other people's LLM apps. This is the robots.txt token; the fetch may send a different header. | Operator page |
| ApifyBot, ApifyWebsiteContentCrawler | Apify | Content crawlers for AI and automation jobs. Most Apify traffic sends a browser user agent. | Directory |
| Brightbot | Bright Data | Their collection crawler, published as `Brightbot 1.0`. Does not cover their proxy network. | Operator page |
| Crawl4AI | Crawl4AI | Open-source crawler. Defaults to a Chrome user agent, so this rarely matches. | Directory |
| Crawlspace | Crawlspace | Hosted crawler for other people's AI agents. | Directory |
| CragCrawler | CragSoftware | AI scraping services. | Directory |
| CloudflareBrowserRenderingCrawler | Cloudflare | A Cloudflare customer rendering and copying this site. Not the site's own Cloudflare proxy. | Directory |
| AgentDataBot | AgentData | Company-intelligence database. | Directory |
| aiHitBot | aiHit | Company-data crawler. | Directory |
| BixelBot | Bixel | Company and market data platform. | Directory |
| Factset_spyderbot | FactSet | Data broker, reported to scrape for model training. | Directory |
| Panscient, panscient.com | Panscient | Business and people records. | Directory |
| VelenPublicWebCrawler | Hunter (Velen) | Business datasets and machine-learning models. | Operator page |
| YaK | Meltwater | Media monitoring. | Directory |
| EchoboxBot | Echobox | Feeds Echobox's social and email products. | Directory |
| netEstate Imprint Crawler | netEstate | Imprint and site-data scraper. | Directory |
| Zoominfobot | ZoomInfo | Business-contact database, sold. | Operator page |
| BuiltWith | BuiltWith | Sells a technology profile of the site. | Operator page |

## Remove: SEO and marketing crawlers

Blocking these does nothing to Google or Bing rankings. The vendor's copy of the site stops updating.

| Token | Operator | Notes | Evidence |
|---|---|---|---|
| AhrefsBot | Ahrefs | Backlink and content database. Also feeds Yep search. | Operator page |
| SemrushBot | Semrush | Backlink database. | Operator page |
| SemrushBot-BA | Semrush | Backlink Audit. | Operator page |
| SemrushBot-OCOB | Semrush | Content Toolkit. | Operator page |
| SemrushBot-FT | Semrush | Plagiarism Checker. | Operator page |
| dotbot | Moz | Link Explorer index. | Operator page |
| MJ12bot | Majestic | Link graph. | Operator page |
| DataForSeoBot | DataForSEO | Backlinks API. | Operator page |
| serpstatbot | Serpstat | Backlink index. | Operator page |
| barkrowler | Babbar | Link metrics. | Operator page |
| SERankingBacklinksBot | SE Ranking | Backlink data. | Operator page |
| AwarioBot, AwarioSmartBot, AwarioRssBot | Awario | Brand-mention monitoring. | Operator page |

## Ask first

| Token | Operator | What blocking costs | Evidence |
|---|---|---|---|
| Google-Extended | Google | Opt-out token, never crawls. Stops Gemini training and also Gemini grounding, so Gemini stops citing the site. Google Search is unaffected. | Operator page |
| Timpibot | Timpi | Trains models and builds Timpi's search index. | Directory |
| QwenBot | Alibaba | Qwen training and Qwen answers. | Directory |
| ERNIEBot | Baidu | ERNIE training and ERNIE answers. | Directory |
| Doubaobot | ByteDance | Doubao training and Doubao answers. | Directory |
| ShapBot | Parallel | Search and extraction API for AI apps. | Directory |
| TerraCotta | Ceramic | Search API for AI apps. | Directory |
| AhrefsSiteAudit | Ahrefs | The owner's Ahrefs Site Audit. | Operator page |
| SiteAuditBot, SemrushBot-SI, SemrushBot-SWA, SemrushBot-ESI, SplitSignalBot, RyteBot | Semrush | The owner's Semrush audits and reports. | Operator page |
| rogerbot | Moz | The owner's Moz Pro site crawl. | Operator page |
| lumar, deepcrawl | Lumar | The owner's Lumar audit. | Operator page |
| Oncrawl | Oncrawl | The owner's Oncrawl audit. | Operator page |
| similarweb | Similarweb | The owner's Similarweb Site Audit. | Operator page |
| Screaming Frog SEO Spider | Screaming Frog | The owner's or an agency's desktop crawl. | Operator page |

## Edge only, with care

Library defaults. Not in robots.txt, because these tools do not read it. Blocking them also blocks the owner's own automation.

| Token | What a block breaks |
|---|---|
| curl | Debugging, deploy hooks, cron fetches, uptime checks that shell out to curl. |
| Wget | Mirror and backup scripts. |
| python-requests, Python-urllib | The owner's scripts, notebooks, small monitors, SaaS callbacks with no user agent set. |
| Go-http-client | Go services, webhooks, and health checks with no user agent set. |
| Scrapy | The owner's own spiders. Most scrapers rename it. |
| HeadlessChrome | Older Puppeteer and Playwright runs, browser tests, screenshot and PDF jobs. New headless Chrome omits the token. |
| Lightpanda | Anyone using that headless browser, including the owner's agents. |

Leave `Chrome-Lighthouse` alone. It is PageSpeed Insights and Lighthouse CI.

## Keep: search engines

| Token | Operator |
|---|---|
| Googlebot | Google. Also covers Googlebot-Image, -Video, -News, and Google-InspectionTool. |
| Storebot-Google | Google Shopping. Does not fall back to the Googlebot rule. |
| bingbot | Microsoft. Bing and Copilot search. |
| Applebot | Apple. Spotlight, Siri, Safari. The crawl may also train Apple's models; Applebot-Extended is the opt-out. |
| DuckDuckBot | DuckDuckGo |
| YandexBot | Yandex |
| Baiduspider, Baiduspider-image | Baidu |
| Yeti | Naver |
| SeznamBot | Seznam |
| Slurp | Yahoo |
| Qwantbot | Qwant. Qwant says indexed pages are cited in its AI answers and not used for training. |
| MojeekBot | Mojeek |
| Kagibot | Kagi. Follows the Googlebot rule if it has none of its own. |
| PetalBot | Huawei. Petal Search. |

## Keep: AI answer engines

| Token | Operator | Why it stays |
|---|---|---|
| OAI-SearchBot | OpenAI | ChatGPT search citations |
| Claude-SearchBot | Anthropic | Claude search citations |
| PerplexityBot | Perplexity | Perplexity citations. Not used for training. |
| DuckAssistBot | DuckDuckGo | Cited DuckAssist answers. Not used for training. |
| MistralAI-Index | Mistral | Mistral search. Not used for training. |
| meta-webindexer | Meta | Meta AI search citations. Meta's docs also write it Meta-WebIndexer. |
| Amzn-SearchBot | Amazon | Alexa and Amazon search. Not training. |
| YouBot | You.com | You.com search index |
| ExaSearchBot, ExaSearchBot-Images | Exa | Search index that AI apps retrieve and cite from |
| LinkupBot | Linkup | Search index for AI apps |
| Kimi-SearchBot | Moonshot AI | Kimi search index |

Brave Search and Tavily send no token of their own. Both follow the Googlebot rule.

## Keep: a person asked for the page

These may ignore robots.txt because a person started the visit. Do not edge-block them.

| Token | Operator |
|---|---|
| ChatGPT-User | OpenAI |
| Claude-User | Anthropic |
| Perplexity-User | Perplexity |
| MistralAI-User | Mistral |
| meta-externalfetcher | Meta. Now also covers a Meta AI agent browsing the site for a person. |
| Google-Agent | Google |
| Google-GeminiNotebook | Google. Replaced Google-NotebookLM. |
| Amzn-User | Amazon |
| ExaUser | Exa |
| Kimi-User | Moonshot AI |

`OAI-AdsBot` checks ad landing pages for OpenAI. It is neither a citation bot nor a training bot. Leave it alone if the owner advertises there.

## Keep: link previews

Blocking one breaks the card shown when the link is shared.

| Token | Where the preview shows |
|---|---|
| facebookexternalhit | Facebook, Instagram, Messenger |
| WhatsApp | WhatsApp |
| Slackbot, Slackbot-LinkExpanding, Slack-ImgProxy | Slack |
| Discordbot | Discord |
| Pinterestbot, Pinterest | Pinterest |
| LinkedInBot | LinkedIn |
| Redditbot | Reddit |
| GoogleMessages | Google Messages |
| MicrosoftPreview, BingVideoPreview | Microsoft products and Bing |
| Blueno | Naver |
| Twitterbot, TelegramBot | X and Telegram. Widely used names; no operator page naming them was found on the last check. |
