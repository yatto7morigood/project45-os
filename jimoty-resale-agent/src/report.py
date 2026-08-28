from __future__ import annotations

from datetime import date, datetime, timezone
from pathlib import Path


def _card(x: dict) -> str:
    evidence = x["evidence"]
    urls = "<br>".join(f"[{e.source}]({e.url})（{e.evidence_type}）" for e in evidence) or "根拠未登録"
    rejected = "<br>".join(f"[{e.source}]({e.url})（{e.evidence_type}）" for e in x.get("rejected_evidence", [])) or "なし"
    item=x.get("listing")
    condition = item.condition if item else "未確認"; location = item.location if item else "未確認"; listing_url = item.url if item else "未確認"
    return f'''### {x["title"]}\n\n名称 / {x["title"]}  \n価格 / {x["price"]:,}円  \n型番 / {x["model"] or "未確認"}  \n製造年 or 発売年 / {x["year"] or "未確認"}  \n状態 / {condition or "未確認"}  \n受取地域 / {location or "未確認"}  \n元出品URL / {listing_url or "未確認"}  \n買取相場 / {x["buyback"] or "未確認"}  \nオークション相場 / {x["auction"] or "未確認"}  \n想定売却価格 / {x["expected"]:,}円  \n販売手数料 / {x.get("fee", 0):,}円  \n想定送料 / {x.get("shipping", 0):,}円  \nその他費用 / {x.get("other_cost", 0):,}円  \n想定純利益 / {x["profit"]:,}円  \nROI / {x["roi"]:.1%}  \n★評価 / {x["stars"]}  \n信頼度 / {x["confidence"]}  \n今回取得した市場証拠 / {urls}  \n採用しなかった証拠 / {rejected}  \nリスク / {x["risk"]}\n\nスコア: {x["score"]}/100（利益 {x["components"]["net_profit"]} / ROI {x["components"]["roi"]} / 流動性 {x["components"]["liquidity"]} / 証拠 {x["components"]["evidence_confidence"]} / 状態 {x["components"]["condition_certainty"]} / 物流 {x["components"]["logistics_risk"]}）\n\n'''


def _research_card(x: dict) -> str:
    item=x["listing"]
    rejected = "<br>".join(f"[{e.source}]({e.url})（{e.evidence_type}）" for e in x.get("rejected_evidence", [])) or "なし"
    return f'''### {x["title"]}\n\n名称 / {x["title"]}  \n価格 / {x["price"]:,}円  \n型番 / {x["model"] or "未確認"}  \n状態 / {item.condition or "未確認"}  \n受取地域 / {item.location or "未確認"}  \n元ジモティーURL / {item.url or "未確認"}  \n潜在価値 / {x["potential_value"]}  \n調査優先度 / {x["research_priority"]}/100  \n確認すべき型番・状態 / {x["checks"]}  \n検索用クエリ候補 / {" / ".join(x["search_queries"])}  \n採用しなかった証拠 / {rejected}  \nリスク / {x["risk"]}\n\n'''


def freshness(item: dict, now: datetime | None = None) -> tuple[str, int]:
    if not item.get("listing"): return "掲載日時不明", 0
    now=now or datetime.now(); raw=item["listing"].listed_at
    try: hours=(now-datetime.fromisoformat(raw.replace("Z", "+00:00")).replace(tzinfo=None)).total_seconds()/3600
    except ValueError: return "掲載日時不明", 0
    return ("6時間以内", 8) if hours <= 6 else (("24時間以内", 4) if hours <= 24 else ("24時間超", 0))


def write_report(items: list[dict], directory: str | Path, report_date: date | None = None) -> Path:
    report_date = report_date or date.today(); directory = Path(directory); directory.mkdir(parents=True, exist_ok=True)
    groups = {"confirmed_candidate": [], "inferred_opportunity": [], "research_pending": [], "watchlist": [], "reject": []}
    for item in sorted(items, key=lambda x: x["score"] + freshness(x)[1], reverse=True): groups[item["status"]].append(item)
    ranked=groups["confirmed_candidate"]+groups["inferred_opportunity"]+groups["research_pending"]
    lines = [f"# ジモティー仕入れ日報 — {report_date.isoformat()}", "", f"新規/変更分析: {len(items)}件。確定候補 {len(groups['confirmed_candidate'])}件、推論候補 {len(groups['inferred_opportunity'])}件、調査待ち {len(groups['research_pending'])}件、監視 {len(groups['watchlist'])}件、注目見送り {len(groups['reject'])}件。", "", "## 🔥 今日すぐ確認したい TOP5", ""]
    for index,x in enumerate(ranked[:5], 1):
        fresh,_=freshness(x); metric=f"利益 {x['profit']:,}円" if "profit" in x else f"潜在価値 {x['potential_value']}・調査優先度 {x['research_priority']}/100"
        lines.append(f"{index}. {x['title']} — {metric}（{fresh}）")
    lines += ["", "## TOP candidates", "", "|商品|仕入|純利益|ROI|評価|信頼度|", "|---|---:|---:|---:|---|---|"]
    for x in groups["confirmed_candidate"][:10]: lines.append(f"|{x['title']}|{x['price']:,}円|{x['profit']:,}円|{x['roi']:.1%}|{x['stars']}|{x['confidence']}|")
    for title, key in [("確定候補の詳細", "confirmed_candidate"), ("推論ベースの価値あり候補", "inferred_opportunity"), ("🔎 相場調査待ち・お宝候補", "research_pending"), ("ウォッチリスト", "watchlist"), ("注目すべき見送り", "reject")]:
        lines += ["", f"## {title}", ""]
        if not groups[key]: lines.append("該当なし。")
        for x in groups[key]:
            lines.append(_research_card(x) if key == "research_pending" else _card(x))
            if key == "inferred_opportunity": lines.append(f"確認すべきこと / {x['checks']}\n")
    free=[x for x in items if x["price"] == 0]
    lines += ["", "## 🆓 0円仕入れ候補", ""] + ([f"- {x['title']}（{x['listing'].url or 'URL未確認'}）" for x in free] or ["該当なし。"])
    lines += ["## データ品質に関する注意", "", "市場証拠は入力された手動・検索由来の観測のみです。asking は成約価格ではありません。型番・状態が未確認の候補は推論として分離し、取得前に現物確認してください。"]
    if not items: lines += ["", "入力データが未取得または新規・変更データがありません。synthetic fixture は日次処理に使用していません。"]
    path = directory / f"{report_date.isoformat()}.md"; path.write_text("\n".join(lines), encoding="utf-8"); return path
