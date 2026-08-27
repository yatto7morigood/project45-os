import re
import sys

BANNED_GUARANTEE_PATTERNS = [
    r"絶対.*内定",
    r"必ず.*転職",
    r"誰でも.*年収",
    r"100%.*内定",
]

REQUIRED_DISCLOSURES = ["PR", "広告", "アフィリエイト"]


def validate(text: str, is_affiliate: bool = False) -> list[str]:
    issues: list[str] = []
    for pattern in BANNED_GUARANTEE_PATTERNS:
        if re.search(pattern, text, flags=re.IGNORECASE | re.DOTALL):
            issues.append(f"Guarantee-like expression detected: {pattern}")
    if is_affiliate and not any(word in text for word in REQUIRED_DISCLOSURES):
        issues.append("Affiliate content requires a clear advertising disclosure.")
    return issues


if __name__ == "__main__":
    text = sys.stdin.read()
    issues = validate(text, "--affiliate" in sys.argv)
    if issues:
        print("REVISE")
        for issue in issues:
            print(f"- {issue}")
        raise SystemExit(1)
    print("PASS")
