"""Offline email adapter; never contacts Gmail/Jimoty."""
from __future__ import annotations
import argparse, hashlib, json, re
from dataclasses import dataclass
from email import policy
from email.parser import BytesParser
from pathlib import Path
from typing import Any, Iterable, Protocol
URL=re.compile(r"https?://(?:www\.)?jmty\.jp/[^\s<>'\"）]+",re.I); BAD=re.compile(r"^https?://(?:www\.)?jmty\.jp/(?:web_mail/|my/?$|s/my)",re.I)
FIELDS={"title":r"(?:商品名|タイトル|件名)\s*[：:]\s*([^\n]+)","location":r"(?:地域|受取地域|場所)\s*[：:]\s*([^\n]+)","listed_at":r"(?:掲載日時|掲載日|投稿日)\s*[：:]\s*([^\n]+)","manufacturer":r"(?:・\s*)?メーカー\s*[：:]\s*([^\n]+)","series":r"(?:・\s*)?シリーズ\s*[：:]\s*([^\n]+)","model":r"(?:・\s*)?型番\s*[：:]\s*([^\n]+)","color":r"(?:・\s*)?カラー\s*[：:]\s*([^\n]+)"}; STATES=("動作未確認","ジャンク","新品","未使用","傷あり","汚れあり","現状渡し"); LOGISTICS=("引き取り限定","直接引取")
@dataclass(frozen=True)
class MessageSource: body:str; received_at:str=""; source_name:str="local_email"; message_id:str=""; subject:str=""
class NotificationProvider(Protocol):
 def messages(self,path:str|Path)->list[MessageSource]: ...
class LocalEmailAdapter:
 def messages(self,path:str|Path)->list[MessageSource]:
  p=Path(path)
  if p.suffix.lower()==".eml":
   m=BytesParser(policy=policy.default).parsebytes(p.read_bytes()); part=m.get_body(preferencelist=("plain",)); return [MessageSource(part.get_content() if part else m.get_content(),str(m.get("Date", "")),p.name,str(m.get("Message-ID", "")),str(m.get("Subject", "")))]
  text=p.read_text(encoding="utf-8")
  if p.suffix.lower()!=".json": return [MessageSource(text,source_name=p.name)]
  d=json.loads(text); return [MessageSource(str(x.get("body",x.get("text",""))),str(x.get("received_at","")),p.name,str(x.get("message_id","")),str(x.get("subject",""))) for x in (d if isinstance(d,list) else [d])]
def get(text,key):
 m=re.search(FIELDS[key],text,re.I);return m.group(1).strip() if m else ""
def parse_message(m:MessageSource)->list[dict[str,Any]]:
 t=m.body; matches=[x for x in URL.finditer(t) if not BAD.match(x.group(0))]; urls=list(dict.fromkeys(x.group(0) for x in matches)) or [""]; typ="inquiry_message" if "新着メッセージ" in f"{m.subject}\n{t}" or "問い合わせ" in t else "listing_notification"; rows=[]
 for index,url in enumerate(urls):
  window=t if not matches else t[(matches[index-1].end() if index else 0):matches[index].end()]
  r={k:get(window,k) for k in FIELDS}; r["location"]=r["location"] or "未確認"; free=("無料" in window or re.search(r"(?<![0-9])0円",window)); pm=re.search(r"(?:価格|金額)\s*[：:]\s*[¥￥]?\s*([0-9][0-9,]*)",window)
  r.update({"price":"0" if free else (pm.group(1) if pm else ""),"url":url,"description":" / ".join(f"{k}: {r[k]}" for k in ("manufacturer","series","model","color") if r[k]),"condition":" / ".join(x for x in STATES if x in t),"logistics":" / ".join(x for x in LOGISTICS if x in t),"market_evidence":[],"source_kind":"notification_email","source_name":m.source_name,"received_at":m.received_at,"message_id":m.message_id,"notification_type":typ}); r["id"]=url or "email:"+hashlib.sha256(f"{r['title']}|{r['model']}|{m.message_id}".encode()).hexdigest()[:20]; r["missing_fields"]=[x for x in ("title","price","url","listed_at") if not r[x]];rows.append(r)
 return rows
def parse_sources(paths:Iterable[str|Path],include_inquiry=False)->list[dict[str,Any]]:
 seen=set();out=[];a=LocalEmailAdapter()
 for p in paths:
  for m in a.messages(p):
   for r in parse_message(m):
    if r["notification_type"]=="inquiry_message" and not include_inquiry:continue
    k=r["url"] or r["id"]
    if k not in seen:seen.add(k);out.append(r)
 return out
def main():
 p=argparse.ArgumentParser();p.add_argument("--input",action="append",required=True);p.add_argument("--output",required=True);p.add_argument("--include-inquiry",action="store_true");a=p.parse_args();Path(a.output).write_text(json.dumps(parse_sources(a.input,a.include_inquiry),ensure_ascii=False,indent=2),encoding="utf-8")
if __name__=="__main__":main()
