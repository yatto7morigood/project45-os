from datetime import datetime, timedelta
from pathlib import Path
import yaml
from src.email_adapter import parse_sources
from src.main import analyse
from src.report import freshness, write_report

SETTINGS=yaml.safe_load((Path(__file__).parents[1]/"config/settings.yaml").read_text(encoding="utf-8"))

def test_eml_pipeline_pending_deduplicates_and_reports_top_and_free(tmp_path):
    eml=tmp_path/"n.eml"; eml.write_text("Content-Type: text/plain; charset=utf-8\n\n商品名: Sony 機器\n価格: 0円\n地域: 福岡市\n掲載日時: 2026-08-28T12:00:00\nhttps://jmty.jp/fukuoka/sale-ele/article-x",encoding="utf-8")
    rows=parse_sources([eml, eml]); assert len(rows)==1
    result=analyse(rows[0], SETTINGS); report=write_report([result],tmp_path).read_text(encoding="utf-8")
    assert result["status"]=="research_pending" and "🔥 今日すぐ確認したい TOP5" in report and "🆓 0円仕入れ候補" in report

def test_freshness_bands():
    base={"listing":type("L",(),{"listed_at":"2026-01-01T10:00:00"})()}
    assert freshness(base, datetime(2026,1,1,15))[0]=="6時間以内"
    assert freshness(base, datetime(2026,1,2,8))[0]=="24時間以内"
    assert freshness(base, datetime(2026,1,3,10))[0]=="24時間超"
