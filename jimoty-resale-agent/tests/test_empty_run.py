from datetime import date
from src.report import write_report

def test_empty_report_explicitly_says_no_input(tmp_path):
    path = write_report([], tmp_path, date(2026, 1, 2))
    assert "入力データが未取得" in path.read_text(encoding="utf-8")
