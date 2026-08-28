# Codex Task — Build Jimoty Resale Hunter v1

You are implementing a production-minded MVP inside `jimoty-resale-agent/`.

Read `AGENTS.md` first and treat it as binding.

## Goal
Create a daily Fukuoka resale-sourcing pipeline that ingests newly listed Jimoty items, enriches them with resale-market evidence, scores them conservatively, and writes a Japanese daily report.

## Architecture
Use Python 3.12. Keep the agent isolated from the existing Next.js app.

Required modules:
- `src/collector.py` — listing ingestion layer
- `src/normalizer.py` — clean title/price/location/URL/date and extract candidate manufacturer/model
- `src/market_research.py` — provider abstraction for market evidence
- `src/scoring.py` — profit, ROI, liquidity, confidence, star rating
- `src/storage.py` — SQLite state/dedup/history
- `src/report.py` — Japanese markdown report
- `src/main.py` — orchestration
- `config/settings.yaml`
- `data/` ignored except sample fixtures
- `reports/` generated reports
- `tests/`
- `.github/workflows/jimoty-resale-daily.yml`

## Collection safety
Do not implement anti-bot circumvention, CAPTCHA solving, stealth browsers, proxy rotation, or authentication bypass.

Implement two ingestion modes:
1. `manual_import`: CSV/JSON import of Jimoty listings. Must work fully and be the safe fallback.
2. `public_fetch`: only if public HTML can be retrieved without bypassing restrictions. Rate-limit aggressively, cache, identify failures, and stop rather than circumvent.

The collector interface must make it possible to disable `public_fetch` with one config flag.

## Market research
Implement provider interfaces rather than hard-coding one marketplace. Evidence records must include:
- source
- evidence_type: sold / buyback / used_retail / asking
- title
- price
- url
- observed_at
- notes

For v1, support web-search-derived/manual research input if direct APIs are unavailable. Never scrape behind login or bypass protections.

The algorithm must rank evidence quality: sold > buyback > used_retail > asking.

## Conservative valuation
Expected selling price should be based on a weighted median or another robust conservative method. Do not use the maximum observed price.

If fewer than 2 credible comparable records exist, mark confidence `low` and apply a haircut to expected selling price.

Default allowances:
- selling fee: configurable per channel
- shipping: category/size estimate with explicit default fallback
- packaging/transport allowance: 500 JPY default
- repair/cleaning: 0 only when listing says unused/new and evidence is credible; otherwise configurable minimum

## Scoring
Implement the rules from `AGENTS.md`.

Also compute a 0–100 score from:
- net profit: 35%
- ROI: 20%
- market liquidity: 15%
- evidence confidence: 15%
- condition certainty: 10%
- logistics risk: 5%

Use transparent component scores in the output.

## Daily report format
Write `reports/YYYY-MM-DD.md` containing:
1. summary counts
2. TOP candidates table
3. detailed card for each candidate
4. watchlist
5. rejected-but-notable section
6. data quality warnings

Each candidate card must show:
`名称 / 価格 / 型番 / 製造年 or 発売年 / 買取相場 / オークション相場 / 想定売却価格 / 想定純利益 / ROI / ★評価 / 信頼度 / 主な根拠URL / リスク`.

## State and dedup
Use SQLite. Store listing id/url, first_seen, last_seen, price history, status, last analysis hash. Re-run analysis only when new or materially changed.

## GitHub Actions
Daily run at 06:30 JST. Since GitHub Actions cron is UTC, convert correctly.
Also allow `workflow_dispatch`.

The workflow must:
- install Python
- install dependencies
- run tests
- run agent
- upload report as artifact
- optionally commit updated report/state only if configured

Do not require secrets for the manual-import MVP.

## Tests
Minimum tests:
- profit calculation
- ROI calculation
- star-rating boundaries
- low-confidence haircut
- deduplication
- report generation
- malformed price parsing

## Sample fixtures
Create at least three fixtures based on these illustrative scenarios without inventing market facts:
- NEC Aterm WX3600HP, acquisition 0 JPY
- Aladdin AMG-G1300A(G), acquisition 2,000 JPY, listing says new
- one intentionally unprofitable item

Market evidence in fixtures must be explicitly marked synthetic/test-only.

## README
Explain to a non-technical user:
- what the agent does
- how to run locally
- how to import Jimoty CSV/JSON
- where reports appear
- how to change Fukuoka/thresholds
- what is automated vs not automated
- how to trigger GitHub Actions manually

## Acceptance criteria
- `python -m pytest` passes
- `python -m src.main --mode manual_import --input examples/listings.json` generates a valid daily report
- no fabricated live market data
- no forbidden circumvention logic
- all calculations reproducible from stored inputs
- clear Japanese output

When implementation is complete, summarize changed files, commands to test, and any remaining limitations. Do not auto-publish, auto-contact sellers, or auto-buy items.