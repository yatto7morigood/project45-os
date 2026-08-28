import yaml
from pathlib import Path
from src.main import analyse
from src.report import write_report
from src.storage import Storage

SETTINGS = yaml.safe_load((Path(__file__).parents[1] / "config/settings.yaml").read_text(encoding="utf-8"))

def test_no_evidence_becomes_research_pending_and_has_no_price_claim(tmp_path):
    result = analyse({"id":"u","title":"Sony オーディオ機器","price":0,"location":"福岡市","url":"https://example.invalid/u","description":"型番不明"}, SETTINGS)
    assert result["status"] == "research_pending" and result["research_priority"] >= 70 and "expected" not in result
    report = write_report([result], tmp_path).read_text(encoding="utf-8")
    assert "🔎 相場調査待ち・お宝候補" in report and "想定売却価格" not in report and "元ジモティーURL" in report

def test_brand_priority_does_not_create_value_estimate():
    result = analyse({"id":"a","title":"Apple 製品","price":500,"url":"https://example.invalid/a","description":""}, SETTINGS)
    assert result["status"] == "research_pending" and result["potential_value"] in {"高", "中", "低"} and "profit" not in result

def test_pending_url_is_deduplicated_but_title_change_is_reanalysed(tmp_path):
    raw = {"id":"same-url","title":"Panasonic 家電","price":0,"url":"https://example.invalid/same","description":""}
    first = analyse(raw, SETTINGS); store = Storage(tmp_path / "state.db")
    payload = {k:v for k,v in first.items() if k not in {"listing", "evidence"}}
    store.save(first["listing"], first["status"], payload)
    assert not store.is_new_or_changed(first["listing"], payload)
    changed = analyse({**raw, "title":"Panasonic 家電（型番候補あり）"}, SETTINGS)
    changed_payload = {k:v for k,v in changed.items() if k not in {"listing", "evidence"}}
    assert store.is_new_or_changed(changed["listing"], changed_payload)
