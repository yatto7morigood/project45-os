import json
from src.email_adapter import LocalEmailAdapter, MessageSource, parse_message, parse_sources

def test_extracts_multiple_listings_and_deduplicates_urls(tmp_path):
    body = "商品名: ルーター\n価格: 1,200円\n地域: 福岡市\n掲載日時: 2026-01-02\nhttps://jmty.jp/fukuoka/sale-pcp/article-a\n商品名: アンプ\n価格: 500円\n地域: 福岡市\n掲載日時: 2026-01-02\nhttps://jmty.jp/fukuoka/sale-ele/article-b"
    first = tmp_path / "one.txt"; first.write_text(body, encoding="utf-8")
    second = tmp_path / "two.json"; second.write_text(json.dumps([{"body": body}]), encoding="utf-8")
    rows = parse_sources([first, second])
    assert len(rows) == 2 and rows[0]["price"] == "1,200" and rows[1]["title"] == "アンプ"

def test_missing_fields_are_not_invented():
    rows = parse_message(MessageSource("商品名: 不明品\nhttps://jmty.jp/fukuoka/sale-ele/article-x"))
    assert rows[0]["price"] == "" and "price" in rows[0]["missing_fields"]

def test_reads_eml_plain_text(tmp_path):
    sample = tmp_path / "notice.eml"; sample.write_bytes(b"Subject: notice\nContent-Type: text/plain; charset=utf-8\n\n" + "商品名: テスト\n価格: 100円\nhttps://jmty.jp/fukuoka/sale-ele/article-z".encode())
    assert LocalEmailAdapter().messages(sample)[0].body.startswith("商品名")
