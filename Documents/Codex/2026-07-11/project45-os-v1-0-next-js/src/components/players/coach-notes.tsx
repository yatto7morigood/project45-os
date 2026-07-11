"use client";

import { useState } from "react";
import { Plus, Tag, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CoachNote } from "@/lib/player-types";

export function CoachNotes({ note }: { note: CoachNote }) {
  const [body, setBody] = useState(note.body);
  const [tags, setTags] = useState(note.tags);
  const [pendingTag, setPendingTag] = useState("");

  function addTag() {
    const formattedTag = pendingTag.trim().replace(/^#*/, "");
    if (!formattedTag || tags.includes("#" + formattedTag)) return;
    setTags((currentTags) => [...currentTags, "#" + formattedTag]);
    setPendingTag("");
  }

  return <Card><CardContent className="p-5"><div className="flex items-center gap-2"><Tag size={16} className="text-blue-300" /><h3 className="text-sm font-semibold text-slate-100">コーチメモ</h3><span className="ml-auto text-[10px] text-slate-600">ローカル編集</span></div><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} className="mt-4 w-full resize-y rounded-lg border border-white/8 bg-slate-950/50 p-3 text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-600 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/15" aria-label="コーチメモ" /><div className="mt-3 flex flex-wrap gap-1.5">{tags.map((tag) => <button key={tag} onClick={() => setTags((currentTags) => currentTags.filter((currentTag) => currentTag !== tag))} className="group flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-medium text-blue-200 transition-colors hover:bg-rose-500/15 hover:text-rose-200">{tag}<X size={11} className="opacity-50 group-hover:opacity-100" /></button>)}</div><div className="mt-3 flex gap-2"><input value={pendingTag} onChange={(event) => setPendingTag(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addTag(); } }} placeholder="タグを追加" className="min-w-0 flex-1 rounded-md border border-white/8 bg-white/[0.025] px-2.5 py-2 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-400/60" /><button onClick={addTag} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors hover:bg-blue-500 hover:text-white" aria-label="タグを追加"><Plus size={14} /></button></div></CardContent></Card>;
}
