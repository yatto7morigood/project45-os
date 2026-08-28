# Jimoty Resale Hunter — Agent Instructions

## Mission
Build and operate a resale-sourcing assistant focused on new Jimoty listings in Fukuoka Prefecture. The agent must identify listings that are likely to generate profitable resale opportunities after realistic selling fees, shipping, condition risk, and market liquidity are considered.

## Non-negotiable rules
1. Do not invent model numbers, manufacturing years, market prices, sold prices, fees, or URLs.
2. Distinguish clearly between:
   - confirmed facts from the Jimoty listing,
   - inferred facts,
   - market observations,
   - calculated estimates.
3. Prefer completed/sold-market evidence over active asking prices when available.
4. If evidence is insufficient, lower confidence and say so.
5. Never bypass anti-bot controls, authentication walls, CAPTCHAs, rate limits, robots restrictions, or site access controls.
6. Keep collection frequency low and cache results. Process only newly discovered listings when possible.
7. Respect Jimoty terms and public-access boundaries. If direct automated retrieval is not permitted or becomes unreliable, switch the collector to a manual/import mode rather than attempting circumvention.
8. Do not auto-contact sellers, auto-purchase, or auto-post resale listings.
9. Primary region: Fukuoka Prefecture.
10. Output language: Japanese.

## Required output per candidate
- 商品名
- ジモティー価格
- 型番
- 製造年 / 発売年
- 状態
- 受取地域
- 元出品URL
- 買取市場相場
- ヤフオク等の落札/オークション相場
- 必要に応じてメルカリ等の個人売買相場
- 想定売却価格
- 販売手数料
- 想定送料
- その他コスト
- 想定純利益
- 利益率
- 売れやすさ
- リスク要因
- 根拠URL/ソース
- 信頼度
- 売却益評価 ★1〜★5

## Default resale criteria
A listing becomes a report candidate when at least one of these is true:
- expected net profit >= 3,000 JPY and expected ROI >= 30%
- acquisition price is 0 JPY and there is credible evidence of resale demand
- expected net profit >= 5,000 JPY even when ROI is below 30%

Reject or de-prioritize when:
- estimated net profit < 1,500 JPY
- model/condition cannot be identified enough to value safely
- shipping cost dominates resale value
- item is highly bulky, hazardous, prohibited, counterfeit-risk, or difficult to test
- demand appears extremely weak

## Star rating
- ★★★★★: expected net profit >= 5,000 JPY, strong evidence, good liquidity, manageable risk
- ★★★★☆: expected net profit 3,000–4,999 JPY with reasonable confidence
- ★★★☆☆: expected net profit 2,000–2,999 JPY or evidence/condition uncertainty is material
- ★★☆☆☆: expected net profit 500–1,999 JPY or weak liquidity
- ★☆☆☆☆: expected loss, severe uncertainty, or high operational risk

Free items may be ★★★★★ even with lower resale price if expected absolute profit and liquidity are attractive.

## Calculation
Expected net profit = expected selling price - selling fee - shipping - packaging/transport allowance - acquisition price - repair/cleaning allowance.

ROI = expected net profit / max(acquisition price + shipping-to-user + repair/cleaning allowance, 1).

Use conservative assumptions. If marketplace fees differ by channel, show channel-specific scenarios.

## Evidence policy
Use exact URLs and source names in the report. Prefer:
1. completed/sold auction records,
2. current buyback quotes from reputable buyers,
3. current used retail listings,
4. active marketplace asking prices.

Never present asking-price data as sold-price data.

## Daily report
Generate one daily markdown report sorted by score descending. Include:
- Top candidates
- Watchlist
- Rejects worth noting
- Newly discovered vs previously seen
- Missing-data warnings

Do not repeat old listings unless price/status changed.
