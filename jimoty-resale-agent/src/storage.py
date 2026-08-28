from __future__ import annotations

import hashlib
import json
import sqlite3
from pathlib import Path
from .normalizer import Listing


class Storage:
    def __init__(self, path: str | Path):
        self.db = sqlite3.connect(path)
        self.db.execute("CREATE TABLE IF NOT EXISTS listings (listing_id TEXT PRIMARY KEY, url TEXT, first_seen TEXT DEFAULT CURRENT_TIMESTAMP, last_seen TEXT DEFAULT CURRENT_TIMESTAMP, price INTEGER, status TEXT, listing_availability TEXT DEFAULT 'unknown', analysis_hash TEXT)")
        self.db.execute("CREATE TABLE IF NOT EXISTS price_history (listing_id TEXT, price INTEGER, seen_at TEXT DEFAULT CURRENT_TIMESTAMP)")
        self.db.execute("CREATE TABLE IF NOT EXISTS market_evidence (url TEXT PRIMARY KEY, listing_id TEXT, source TEXT, evidence_type TEXT, price INTEGER, observed_at TEXT)")

    def is_new_or_changed(self, item: Listing, analysis: dict) -> bool:
        digest = hashlib.sha256(json.dumps(analysis, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        row = self.db.execute("SELECT price, analysis_hash FROM listings WHERE listing_id=?", (item.id,)).fetchone()
        return row is None or row[0] != item.price or row[1] != digest

    def save(self, item: Listing, status: str, analysis: dict, availability: str = "unknown") -> None:
        digest = hashlib.sha256(json.dumps(analysis, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        old = self.db.execute("SELECT price FROM listings WHERE listing_id=?", (item.id,)).fetchone()
        self.db.execute("INSERT INTO listings(listing_id,url,price,status,listing_availability,analysis_hash) VALUES(?,?,?,?,?,?) ON CONFLICT(listing_id) DO UPDATE SET url=excluded.url,last_seen=CURRENT_TIMESTAMP,price=excluded.price,status=excluded.status,listing_availability=excluded.listing_availability,analysis_hash=excluded.analysis_hash", (item.id,item.url,item.price,status,availability,digest))
        if old is None or old[0] != item.price: self.db.execute("INSERT INTO price_history(listing_id,price) VALUES(?,?)", (item.id,item.price))
        self.db.commit()

    def save_evidence(self, listing_id: str, evidence) -> None:
        self.db.execute("INSERT OR IGNORE INTO market_evidence(url,listing_id,source,evidence_type,price,observed_at) VALUES(?,?,?,?,?,?)", (evidence.url, listing_id, evidence.source, evidence.evidence_type, evidence.price, evidence.observed_at))
        self.db.commit()
