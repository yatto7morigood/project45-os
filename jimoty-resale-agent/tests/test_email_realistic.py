from src.email_adapter import LocalEmailAdapter, MessageSource, parse_message, parse_sources
BODY="""タイトル：【無料・動作未確認】SHARP ヘルシオ AX-S1 レッド 引き取り限定
・メーカー：SHARP
・シリーズ：HEALSIO（ヘルシオ）
・型番：AX-S1
・カラー：レッド
現在、動作確認をしていないため、現状渡しで無料でお譲りします
https://jmty.jp/web_mail/a
https://jmty.jp/my/
"""
def test_real_mail_fields_and_urls():
 r=parse_message(MessageSource(BODY,message_id="<x>"))[0];assert r["price"]=="0" and r["model"]=="AX-S1" and "動作未確認" in r["condition"] and "現状渡し" in r["condition"] and r["url"]=="" and r["location"]=="未確認"
def test_inquiry_excluded(tmp_path):
 p=tmp_path/"x.txt";p.write_text("タイトル: 商品\n【ジモティー】新着メッセージが届きました",encoding="utf-8");assert parse_sources([p])==[] and parse_sources([p],True)[0]["notification_type"]=="inquiry_message"
def test_iso_eml(tmp_path):
 p=tmp_path/"x.eml";p.write_bytes("Content-Type: text/plain; charset=iso-2022-jp\n\n".encode()+"タイトル：テスト AX-S1\n無料でお譲りします".encode("iso2022_jp"));assert "AX-S1" in LocalEmailAdapter().messages(p)[0].body
