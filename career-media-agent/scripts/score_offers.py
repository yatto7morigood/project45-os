from dataclasses import dataclass

@dataclass
class Offer:
    name: str
    target_fit: int
    conversion_ease: int
    payout: int
    brand_trust: int
    content_fit: int
    compliance_fit: int

WEIGHTS = {
    "target_fit": 0.25,
    "conversion_ease": 0.20,
    "payout": 0.15,
    "brand_trust": 0.10,
    "content_fit": 0.20,
    "compliance_fit": 0.10,
}

def score(offer: Offer) -> float:
    return round(sum(getattr(offer, key) * weight for key, weight in WEIGHTS.items()), 2)

if __name__ == "__main__":
    print("Use 0-100 inputs. Score is weighted 0-100.")
