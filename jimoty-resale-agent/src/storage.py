from __future__ import annotations

import hashlib
import json
import sqlite3
from pathlib import Path
from .normalizer import Listing


class Storage:
    def __init__(self, path: str | Path):
        self.db = sqlite3.connect(path)
        self.db.execute("CREATE TABLE IF NOT EXISTS listings (listing_id TEXT PRIMARY KEY, url TEXT, first_seen TEXT DEFAULT CURRENT_TIMESTAMP, last_seen TEXT DEFAULT CURRENT_TIMESTAMP, price INTEGER, status TEXT, analysis_hash TEXT)")
        self.db.execute("CREATE TABLE IF NOT EXISTS price_history (listing_id TEXT, price INTEGER, seen_at TEXT DEFAULT CURRENT_TIMESTAMP)")

    def is_new_or_changed(self, item: Listing, analysis: dict) -> bool:
        digest = hashlib.sha256(json.dumps(analysis, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        row = self.db.execute("SELECT price, analysis_hash FROM listings WHERE listing_id=?", (item.id,)).fetchone()
        return row is None or row[0] != item.price or row[1] != digest

    def save(self, item: Listing, status: str, analysis: dict) -> None:
        digest = hashlib.sha256(json.dumps(analysis, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        old = self.db.execute("SELECT price FROM listings WHERE listing_id=?", (item.id,)).fetchone()
        self.db.execute("INSERT INTO listings(listing_id,url,price,status,analysis_hash) VALUES(?,?,?,?,?) ON CONFLICT(listing_id) DO UPDATE SET url=excluded.url,last_seen=CURRENT_TIMESTAMP,price=excluded.price,status=excluded.status,analysis_hash=excluded.analysis_hash", (item.id,item.url,item.price,status,digest))
        if old is None or old[0] != item.price: self.db.execute("INSERT INTO price_history(listing_id,price) VALUES(?,?)", (item.id,item.price))
        self.db.commit()
