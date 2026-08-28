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
4. If evidence is insufficient, lower confidence and say so. Do not silently discard an item only because the exact model number or condition cannot be confirmed.
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
- 判定区分: `confirmed_candidate` / `inferred_opportunity` / `watchlist` / `reject`

## Default resale criteria
A listing becomes a confirmed report candidate when at least one of these is true:
- expected net profit >= 3,000 JPY and expected ROI >= 30%
- acquisition price is 0 JPY and there is credible evidence of resale demand
- expected net profit >= 5,000 JPY even when ROI is below 30%

## Inferred opportunity policy
If the exact model number, manufacturing year, or condition cannot be confirmed, do NOT automatically reject the listing.

Place it in a separate `inferred_opportunity` section when visual clues, brand/product family, approximate category, accessories, apparent condition, listing text, or conservative comparable-market evidence suggest that the item could still have meaningful resale value.

For inferred opportunities:
- Never state an inferred model/year/condition as fact.
- Show `推定型番/候補型番` separately from confirmed model number.
- Show why the item might be valuable.
- Give an estimated value range only when comparable evidence supports it.
- Reduce confidence appropriately.
- Show the key checks the user should perform before acquisition, e.g. model label, operation, accessories, damage, serial/year label.
- Preserve potentially attractive items for human judgment rather than filtering them out merely because identification is incomplete.

Examples of valid inferred opportunities:
- A premium appliance with unreadable model label but identifiable product family and low acquisition price.
- An audio/camera/tool item where exact revision is unclear but the brand and visible series suggest a high-value range.
- A free item whose exact state is unknown but whose conservative parts-value/resale range could still justify pickup.

## Reject or de-prioritize when
- estimated net profit < 1,500 JPY AND there is no plausible upside from unresolved identification
- shipping cost clearly dominates resale value
- item is highly bulky, hazardous, prohibited, counterfeit-risk, or operationally impractical
- demand appears extremely weak

Unknown model/condition alone is NOT a rejection reason.

## Star rating
- ★★★★★: expected net profit >= 5,000 JPY, strong evidence, good liquidity, manageable risk
- ★★★★☆: expected net profit 3,000–4,999 JPY with reasonable confidence
- ★★★☆☆: expected net profit 2,000–2,999 JPY or evidence/condition uncertainty is material
- ★★☆☆☆: expected net profit 500–1,999 JPY or weak liquidity
- ★☆☆☆☆: expected loss, severe uncertainty, or high operational risk

For `inferred_opportunity`, stars indicate upside potential, not certainty. Always display confidence separately so that ★★★★★ with low confidence is visibly different from a confirmed ★★★★★ candidate.

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
- Top confirmed candidates
- 推論ベースの価値あり候補 (`inferred_opportunity`)
- Watchlist
- Rejects worth noting
- Newly discovered vs previously seen
- Missing-data warnings

The inferred section must be clearly separated from confirmed candidates. It should be designed for final human judgment and must include a short `確認すべきこと` field for each item.

Do not repeat old listings unless price/status changed.
