import json
from src.market_research import ImportedSearchResultProvider

def test_imported_provider_prefers_matching_and_rejects_other_model(tmp_path):
    path=tmp_path/"evidence.json"; path.write_text(json.dumps([
      {"listing_url":"l","source":"test","evidence_type":"sold","title":"Aladdin AMG-G1300A","price":10000,"url":"https://e/1","observed_at":"2026-01-01","notes":"synthetic/test-only"},
      {"listing_url":"l","source":"test","evidence_type":"asking","title":"Other XYZ-999","price":999999,"url":"https://e/2","observed_at":"2026-01-01","notes":"synthetic/test-only"},
      {"listing_url":"l","source":"test","evidence_type":"sold","title":"Aladdin AMG-G1300A duplicate","price":10000,"url":"https://e/1","observed_at":"2026-01-01","notes":"synthetic/test-only"}
    ]),encoding="utf-8")
    bundle=ImportedSearchResultProvider.from_file(path).research(title="Aladdin グリル調理器",model="AMG-G1300A",category="グリル",listing_url="l")
    assert len(bundle.accepted)==1 and bundle.accepted[0].evidence_type=="sold" and len(bundle.rejected)==1
