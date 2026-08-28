"""Offline notification-email adapter.  It never connects to Gmail or Jimoty."""
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from email import policy
from email.parser import BytesParser
from pathlib import Path
from typing import Any, Iterable
from typing import Protocol

URL_RE = re.compile(r"https?://(?:www\.)?jmty\.jp/[^\s<>'\"）]+", re.I)
FIELD_PATTERNS = {
    "title": [r"(?:商品名|タイトル|件名)\s*[：:]\s*([^\n]+)"],
    "price": [r"(?:価格|金額)\s*[：:]\s*[¥￥]?\s*([0-9][0-9,]*)\s*円?", r"[¥￥]\s*([0-9][0-9,]*)"],
    "location": [r"(?:地域|受取地域|場所)\s*[：:]\s*([^\n]+)"],
    "listed_at": [r"(?:掲載日時|掲載日|投稿日)\s*[：:]\s*([^\n]+)"],
}


@dataclass(frozen=True)
class MessageSource:
    body: str
    received_at: str = ""
    source_name: str = "local_email"


class LocalEmailAdapter:
    """Adapter contract for local exports; a future Gmail adapter can implement `messages`."""
    def messages(self, path: str | Path) -> list[MessageSource]:
        source = Path(path)
        if source.suffix.lower() == ".eml":
            message = BytesParser(policy=policy.default).parsebytes(source.read_bytes())
            body = message.get_body(preferencelist=("plain",))
            return [MessageSource(body.get_content() if body else message.get_content(), str(message.get("Date", "")), source.name)]
        text = source.read_text(encoding="utf-8")
        if source.suffix.lower() != ".json": return [MessageSource(text, source_name=source.name)]
        data = json.loads(text); data = data if isinstance(data, list) else [data]
        return [MessageSource(str(x.get("body", x.get("text", ""))), str(x.get("received_at", "")), source.name) for x in data]


class NotificationProvider(Protocol):
    """Future authorized mailbox providers expose local-like MessageSource records."""
    def messages(self, path: str | Path) -> list[MessageSource]: ...


def _field(window: str, field: str) -> str:
    for pattern in FIELD_PATTERNS[field]:
        found = re.search(pattern, window, re.I)
        if found: return found.group(1).strip()
    return ""


def parse_message(message: MessageSource) -> list[dict[str, Any]]:
    """Extract only explicitly present values. Missing values remain empty and are recorded."""
    links = list(URL_RE.finditer(message.body))
    # A notification without a URL is still preserved for manual correction.
    anchors: Iterable[re.Match[str] | None] = links or [None]
    records: list[dict[str, Any]] = []
    for index, link in enumerate(anchors):
        # Notifications normally put fields before each link.  Restrict each record
        # to its own link-delimited block so two notices cannot borrow fields.
        previous_end = links[index - 1].end() if link and index else 0
        start = previous_end if link else 0
        end = link.end() if link else len(message.body)
        window = message.body[start:end]
        row = {field: _field(window, field) for field in FIELD_PATTERNS}
        row.update({"url": link.group(0) if link else "", "description": "", "condition": "", "market_evidence": [], "source_kind": "notification_email", "source_name": message.source_name, "received_at": message.received_at})
        row["id"] = row["url"] or f"email:{message.source_name}:{len(records)}"
        row["missing_fields"] = [key for key in ("title", "price", "location", "url", "listed_at") if not row[key]]
        records.append(row)
    return records


def parse_sources(paths: Iterable[str | Path]) -> list[dict[str, Any]]:
    adapter = LocalEmailAdapter(); seen: set[str] = set(); result: list[dict[str, Any]] = []
    for path in paths:
        for message in adapter.messages(path):
            for record in parse_message(message):
                # Empty URLs cannot be deduplicated safely; retain them for correction.
                if record["url"] and record["url"] in seen: continue
                if record["url"]: seen.add(record["url"])
                result.append(record)
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert local notification emails to manual_import JSON")
    parser.add_argument("--input", action="append", required=True, help=".eml, .txt, or JSON mail export; repeatable")
    parser.add_argument("--output", required=True); args = parser.parse_args()
    Path(args.output).write_text(json.dumps(parse_sources(args.input), ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__": main()
