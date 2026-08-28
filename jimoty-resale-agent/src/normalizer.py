from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any


def parse_price(value: Any) -> int | None:
    if value is None:
        return None
    text = str(value).replace(",", "").replace("円", "")
    match = re.search(r"(?:¥|￥)?\s*(\d+)", text)
    return int(match.group(1)) if match else None


def clean_text(value: Any) -> str:
    return " ".join(str(value or "").strip().split())


@dataclass(frozen=True)
class Listing:
    id: str
    title: str
    price: int
    location: str
    url: str
    listed_at: str
    condition: str
    description: str
    manufacturer: str | None = None
    model: str | None = None
    year: str | None = None


def extract_identity(title: str, description: str) -> tuple[str | None, str | None]:
    text = f"{title} {description}"
    manufacturers = ["NEC", "Aladdin", "Panasonic", "SONY", "Canon", "Makita"]
    maker = next((x for x in manufacturers if re.search(rf"\b{re.escape(x)}\b", text, re.I)), None)
    model = None
    # Deliberately conservative: only retain explicit code-like strings from the listing.
    hit = re.search(r"\b(?=[A-Z0-9-]*\d)[A-Z]{1,}[A-Z0-9-]{3,}\b", text, re.I)
    if hit:
        model = hit.group(0).upper()
    return maker, model


def normalize_listing(raw: dict[str, Any]) -> Listing:
    title = clean_text(raw.get("title") or raw.get("name"))
    description = clean_text(raw.get("description"))
    price = parse_price(raw.get("price"))
    if not title or price is None:
        raise ValueError("title and a valid price are required")
    maker, extracted_model = extract_identity(title, description)
    return Listing(
        id=clean_text(raw.get("id") or raw.get("url") or title), title=title, price=price,
        location=clean_text(raw.get("location") or raw.get("area")), url=clean_text(raw.get("url")),
        listed_at=clean_text(raw.get("listed_at") or raw.get("date")), condition=clean_text(raw.get("condition")),
        description=description, manufacturer=clean_text(raw.get("manufacturer")) or maker,
        model=clean_text(raw.get("model")) or extracted_model, year=clean_text(raw.get("year")) or None,
    )
