from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from statistics import median
from typing import Iterable, Protocol
import csv, json
from pathlib import Path

QUALITY = {"sold": 4, "buyback": 3, "used_retail": 2, "asking": 1}
WEIGHTS = {"sold": 1.0, "buyback": .85, "used_retail": .65, "asking": .45}


@dataclass(frozen=True)
class Evidence:
    source: str
    evidence_type: str
    title: str
    price: int
    url: str
    observed_at: str
    notes: str = ""

    @property
    def quality(self) -> int:
        return QUALITY.get(self.evidence_type, 0)


class ManualEvidenceProvider:
    """Turns manual/web-search observations supplied by the user into typed records."""
    def records(self, items: Iterable[dict]) -> list[Evidence]:
        return [Evidence(**item) for item in items if item.get("evidence_type") in QUALITY]


class MarketResearchProvider(Protocol):
    """v1.4 extension point. Implementations must use only authorized data sources."""
    name: str
    def research(self, *, title: str, model: str | None, category: str | None) -> list[Evidence]: ...


@dataclass
class ResearchBundle:
    accepted: list[Evidence]
    rejected: list[Evidence]


class ImportedSearchResultProvider:
    """Reads user-authorized search exports only; it performs no network request."""
    name = "imported_search_results"
    def __init__(self, rows: Iterable[dict]): self.rows = list(rows)
    @classmethod
    def from_file(cls, path: str | Path) -> "ImportedSearchResultProvider":
        p=Path(path)
        if p.suffix.lower()==".json": data=json.loads(p.read_text(encoding="utf-8")); return cls(data if isinstance(data,list) else [data])
        with p.open(encoding="utf-8-sig", newline="") as f: return cls(csv.DictReader(f))
    def research(self, *, title: str, model: str | None, category: str | None, listing_url: str | None = None) -> ResearchBundle:
        candidates=[]
        for row in self.rows:
            if listing_url and row.get("listing_url") not in (listing_url, "", None): continue
            if row.get("evidence_type") not in QUALITY: continue
            try: evidence=Evidence(source=row["source"], evidence_type=row["evidence_type"], title=row["title"], price=int(str(row["price"]).replace(",","")), url=row["url"], observed_at=row["observed_at"], notes=row.get("notes", ""))
            except (KeyError, ValueError): continue
            candidates.append(evidence)
        return filter_comparables(title, model, category, candidates)


def similarity(target_title: str, model: str | None, category: str | None, evidence: Evidence) -> int:
    text=evidence.title.lower(); target=target_title.lower(); score=0
    if model and model.lower() in text: score += 70
    elif model: score -= 30
    target_words={x for x in target.replace("-", " ").split() if len(x)>1}; score += min(30, 10*len(target_words & set(text.replace("-", " ").split())))
    if category and category.lower() in text: score += 20
    return max(0, min(100, score))


def filter_comparables(title: str, model: str | None, category: str | None, records: list[Evidence]) -> ResearchBundle:
    unique={r.url:r for r in records if r.url}; accepted=[]; rejected=[]
    for record in unique.values():
        if similarity(title, model, category, record) < (35 if model else 15): rejected.append(record)
        else: accepted.append(record)
    if len(accepted) >= 3:
        center=median([r.price for r in accepted]); kept=[]
        for r in accepted:
            (kept if center*.25 <= r.price <= center*3 else rejected).append(r)
        accepted=kept
    # Freshness is intentionally metadata only in v1.4; future providers may weight it.
    return ResearchBundle(accepted, rejected)


def credible(records: Iterable[Evidence]) -> list[Evidence]:
    return sorted((x for x in records if x.price > 0 and x.url), key=lambda x: x.quality, reverse=True)
