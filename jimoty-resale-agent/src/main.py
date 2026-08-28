from __future__ import annotations

import argparse
from pathlib import Path
import yaml
from .collector import manual_import, public_fetch
from .email_adapter import parse_sources
from .market_research import ImportedSearchResultProvider, ManualEvidenceProvider
from .normalizer import normalize_listing
from .scoring import confidence, expected_price, profit, roi, research_priority, score, stars
from .storage import Storage
from .report import write_report

ROOT = Path(__file__).resolve().parents[1]

def analyse(raw: dict, settings: dict, provider=None) -> dict | None:
    item = normalize_listing(raw); evidence = ManualEvidenceProvider().records(raw.get("market_evidence", []))
    rejected=[]
    if provider:
        bundle=provider.research(title=item.title, model=item.model, category=raw.get("category"), listing_url=item.url)
        evidence += bundle.accepted; rejected=bundle.rejected
    condition_confirmed = item.condition.lower() in {"新品", "未使用", "new", "unused"} or bool(item.condition)
    level = confidence(evidence, bool(item.model), condition_confirmed); selling = expected_price(evidence, level)
    if selling is None:
        priority, potential, queries = research_priority(item.title, item.description, item.price, item.model, raw.get("category"))
        return {"listing": item, "title": item.title, "price": item.price, "model": item.model, "year": item.year, "status": "research_pending", "evidence": [], "rejected_evidence": rejected, "research_priority": priority, "potential_value": potential, "search_queries": queries, "checks": "銘板の型番、状態、動作、付属品、傷、製造年ラベル", "risk": "市場証拠未収集。取得前に現物と相場を確認", "score": priority}
    costs=settings["costs"]; channel=raw.get("selling_channel", "mercari")
    shipping = int(raw.get("shipping_jpy", costs["shipping_fallback_jpy"])); repair = costs["new_unused_cleaning_jpy"] if item.condition in ("新品", "未使用") and level != "low" else int(raw.get("repair_jpy", costs["cleaning_default_jpy"]))
    fee=settings["fees"].get(f"{channel}_rate", settings["fees"]["mercari_rate"])
    net = profit(selling, fee, shipping, costs["packaging_transport_default_jpy"], item.price, repair); rate = roi(net, item.price, 0, repair)
    liquidity = raw.get("liquidity", "medium"); value, components = score(net, rate, liquidity, level, condition_confirmed, shipping)
    inferred = not item.model or not condition_confirmed
    if inferred and (net >= 1500 or (item.price == 0 and evidence)):
        status = "inferred_opportunity"
    elif (net >= 3000 and rate >= .30) or (item.price == 0 and evidence) or net >= 5000: status = "confirmed_candidate"
    elif net < 1500: status = "reject"
    else: status = "watchlist"
    return {"listing": item, "title":item.title,"price":item.price,"model":item.model,"year":item.year,"expected":selling,"profit":net,"roi":rate,"score":value,"components":components,"confidence":level,"stars":stars(net,level,liquidity),"status":status,"evidence":evidence,"rejected_evidence":rejected,"fee":round(selling*fee),"shipping":shipping,"other_cost":costs["packaging_transport_default_jpy"]+repair,"buyback":next((f"{e.price:,}円" for e in evidence if e.evidence_type=="buyback"), None),"auction":next((f"{e.price:,}円" for e in evidence if e.evidence_type=="sold"), None),"risk":"型番・状態・動作を現物で確認" if inferred else "送料・需要変動", "checks":"銘板の型番、通電/動作、付属品、傷、製造年ラベル" if inferred else "",}

def main() -> None:
    parser=argparse.ArgumentParser(); parser.add_argument("--mode", choices=["manual_import","public_fetch","pipeline"], default="manual_import"); parser.add_argument("--input"); parser.add_argument("--email-input", action="append"); parser.add_argument("--evidence-input"); parser.add_argument("--db", default=str(ROOT/"data"/"state.db")); parser.add_argument("--reports", default=str(ROOT/"reports")); args=parser.parse_args()
    with (ROOT / "config" / "settings.yaml").open(encoding="utf-8") as f: settings=yaml.safe_load(f)
    if args.mode in ("manual_import", "pipeline"):
        raw_items = (manual_import(args.input) if args.input else [])
        if args.mode == "pipeline" and args.email_input: raw_items += parse_sources(args.email_input)
        # Keep one item per URL/ID before normalization. Empty URLs stay for correction.
        deduped={}; empty=[]
        for row in raw_items:
            key=row.get("url") or row.get("id")
            (deduped.setdefault(key, row) if key else empty.append(row))
        raw_items=list(deduped.values())+empty
    else:
        raw_items = public_fetch(enabled=settings["collection"]["public_fetch_enabled"])
    provider=ImportedSearchResultProvider.from_file(args.evidence_input) if args.evidence_input else None
    Path(args.db).parent.mkdir(parents=True, exist_ok=True); storage=Storage(args.db); results=[]
    for raw in raw_items:
        analysis=analyse(raw, settings, provider)
        if analysis and storage.is_new_or_changed(analysis["listing"], {k:v for k,v in analysis.items() if k not in {"listing","evidence"}}):
            storage.save(analysis["listing"], analysis["status"], {k:v for k,v in analysis.items() if k not in {"listing","evidence"}})
            for evidence in analysis["evidence"]: storage.save_evidence(analysis["listing"].id, evidence)
            results.append(analysis)
    print(write_report(results,args.reports))
if __name__ == "__main__": main()
