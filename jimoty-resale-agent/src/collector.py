from __future__ import annotations

import csv
import json
import time
from pathlib import Path
from typing import Any


def manual_import(path: str | Path) -> list[dict[str, Any]]:
    """Read a user-exported JSON array or CSV; never contacts Jimoty."""
    source = Path(path)
    if source.suffix.lower() == ".json":
        data = json.loads(source.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ValueError("JSON input must be an array of listings")
        return data
    if source.suffix.lower() == ".csv":
        with source.open(encoding="utf-8-sig", newline="") as handle:
            return list(csv.DictReader(handle))
    raise ValueError("input must be .json or .csv")


def public_fetch(*, enabled: bool, min_interval_seconds: int = 30) -> list[dict[str, Any]]:
    """Safe placeholder: v1 does not fetch HTML or evade access restrictions."""
    if not enabled:
        return []
    time.sleep(max(min_interval_seconds, 0))
    raise RuntimeError("public_fetch is unavailable in v1; use manual_import without bypassing access controls")
