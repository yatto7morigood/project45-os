from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

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


def credible(records: Iterable[Evidence]) -> list[Evidence]:
    return sorted((x for x in records if x.price > 0 and x.url), key=lambda x: x.quality, reverse=True)
