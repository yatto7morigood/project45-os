from datetime import date
from src.market_research import Evidence
from src.normalizer import normalize_listing, parse_price
from src.report import write_report
from src.scoring import expected_price, profit, roi, stars
from src.storage import Storage
def evidence(price=10000): return Evidence("test", "sold", "test-only", price, "https://example.invalid/x", "2026-01-01", "synthetic/test-only")
def test_profit_calculation(): assert profit(10000, .1, 1000, 500, 2000, 500) == 5000
def test_roi_calculation(): assert roi(3000, 2000, repair=500) == 1.2
def test_star_boundaries(): assert stars(5000,"high")=="★★★★★" and stars(3000,"medium")=="★★★★☆" and stars(499,"high")=="★☆☆☆☆"
def test_low_confidence_haircut(): assert expected_price([evidence()], "low") == 8500
def test_malformed_price_parsing(): assert parse_price("価格応相談") is None and parse_price("¥1,200円") == 1200
def test_deduplication(tmp_path):
 item=normalize_listing({"id":"a","title":"NEC TEST-1","price":100,"url":"u"}); db=Storage(tmp_path/"x.db"); assert db.is_new_or_changed(item,{"x":1}); db.save(item,"watchlist",{"x":1}); assert not db.is_new_or_changed(item,{"x":1})
def test_report_generation(tmp_path):
 row={"title":"テスト","price":0,"model":None,"year":None,"buyback":None,"auction":None,"expected":8500,"profit":5000,"roi":1.0,"stars":"★★★★★","confidence":"low","risk":"確認","score":70,"components":{"net_profit":100,"roi":100,"liquidity":60,"evidence_confidence":30,"condition_certainty":35,"logistics_risk":55},"status":"inferred_opportunity","evidence":[evidence()],"checks":"型番確認"}; path=write_report([row],tmp_path,date(2026,1,2)); assert "推論ベースの価値あり候補" in path.read_text(encoding="utf-8")
