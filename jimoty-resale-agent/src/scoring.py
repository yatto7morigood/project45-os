from __future__ import annotations

from statistics import median
from .market_research import Evidence, WEIGHTS, credible


def weighted_median(records: list[Evidence]) -> int | None:
    rows = credible(records)
    if not rows:
        return None
    values = sorted((r.price, WEIGHTS[r.evidence_type]) for r in rows)
    half, total = sum(weight for _, weight in values) / 2, 0.0
    for price, weight in values:
        total += weight
        if total >= half:
            return price
    return values[-1][0]


def confidence(records: list[Evidence], model_confirmed: bool, condition_confirmed: bool) -> str:
    n = len(credible(records))
    if n >= 3 and model_confirmed and condition_confirmed:
        return "high"
    if n >= 2 and model_confirmed:
        return "medium"
    return "low"


def expected_price(records: list[Evidence], level: str, low_haircut: float = .15, medium_haircut: float = .05) -> int | None:
    baseline = weighted_median(records)
    if baseline is None:
        return None
    haircut = low_haircut if level == "low" else medium_haircut if level == "medium" else 0
    return int(baseline * (1 - haircut))


def profit(selling: int, fee_rate: float, shipping: int, packaging: int, acquisition: int, repair: int) -> int:
    return int(selling - round(selling * fee_rate) - shipping - packaging - acquisition - repair)


def roi(net_profit: int, acquisition: int, shipping_to_user: int = 0, repair: int = 0) -> float:
    return net_profit / max(acquisition + shipping_to_user + repair, 1)


def stars(net_profit: int, level: str, liquidity: str = "medium") -> str:
    if net_profit >= 5000 and level == "high" and liquidity != "low": return "★★★★★"
    if net_profit >= 3000 and level != "low": return "★★★★☆"
    if net_profit >= 2000: return "★★★☆☆"
    if net_profit >= 500: return "★★☆☆☆"
    return "★☆☆☆☆"


def score(net_profit: int, return_on_investment: float, liquidity: str, level: str, condition_confirmed: bool, shipping: int) -> tuple[int, dict[str, int]]:
    liquidity_score = {"high": 100, "medium": 60, "low": 25}.get(liquidity, 25)
    confidence_score = {"high": 100, "medium": 65, "low": 30}[level]
    parts = {"net_profit": min(100, max(0, net_profit / 50)), "roi": min(100, max(0, return_on_investment * 100)), "liquidity": liquidity_score, "evidence_confidence": confidence_score, "condition_certainty": 100 if condition_confirmed else 35, "logistics_risk": 100 if shipping <= 1000 else 55 if shipping <= 2000 else 20}
    weights = {"net_profit": .35, "roi": .20, "liquidity": .15, "evidence_confidence": .15, "condition_certainty": .10, "logistics_risk": .05}
    return round(sum(parts[k] * weights[k] for k in parts)), {k: round(v) for k, v in parts.items()}
