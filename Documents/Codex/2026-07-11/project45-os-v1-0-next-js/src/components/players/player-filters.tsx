"use client";

import { Heart, Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { playerCategories, playerPositions } from "@/lib/player-data";
import { cn } from "@/lib/utils";

export type PlayerFiltersValue = {
  search: string;
  position: string;
  age: "All" | "14-15" | "16+";
  category: string;
  favoritesOnly: boolean;
};

type PlayerFiltersProps = {
  value: PlayerFiltersValue;
  resultCount: number;
  onChange: (nextValue: PlayerFiltersValue) => void;
};

function FilterLabel({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{children}</p>;
}

export function PlayerFilters({ value, resultCount, onChange }: PlayerFiltersProps) {
  function patch(nextValue: Partial<PlayerFiltersValue>) { onChange({ ...value, ...nextValue }); }
  return <aside className="rounded-xl border border-white/10 bg-card/80 p-4 xl:sticky xl:top-8 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto"><div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-slate-200"><SlidersHorizontal size={16} className="text-blue-300" />検索・絞り込み</div><span className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-slate-500">{resultCount}</span></div><label className="relative mt-4 block"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input value={value.search} onChange={(event) => patch({ search: event.target.value })} placeholder="名前・タグ・所属で検索" className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/60 pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/15" /></label><div className="mt-5"><FilterLabel>Position</FilterLabel><div className="flex flex-wrap gap-1.5">{playerPositions.map((position) => <button key={position} onClick={() => patch({ position })} className={cn("rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors", value.position === position ? "bg-blue-500 text-white" : "bg-white/[0.035] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200")}>{position}</button>)}</div></div><div className="mt-5"><FilterLabel>Age</FilterLabel><div className="grid grid-cols-3 gap-1.5">{(["All", "14-15", "16+"] as const).map((age) => <button key={age} onClick={() => patch({ age })} className={cn("rounded-md py-2 text-xs font-medium transition-colors", value.age === age ? "bg-blue-500 text-white" : "bg-white/[0.035] text-slate-400 hover:bg-white/[0.08]")}>{age}</button>)}</div></div><div className="mt-5"><FilterLabel>Category</FilterLabel><div className="space-y-1">{playerCategories.map((category) => <button key={category} onClick={() => patch({ category })} className={cn("flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors", value.category === category ? "bg-blue-500/15 text-blue-200" : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200")}><span>{category === "All" ? "すべてのカテゴリー" : category}</span>{value.category === category && <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />}</button>)}</div></div><button onClick={() => patch({ favoritesOnly: !value.favoritesOnly })} className={cn("mt-5 flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors", value.favoritesOnly ? "border-rose-400/25 bg-rose-500/10 text-rose-200" : "border-white/8 bg-white/[0.025] text-slate-400 hover:text-slate-200")}><span className="flex items-center gap-2"><Heart size={15} className={cn(value.favoritesOnly && "fill-current")} />お気に入りのみ</span><span className="text-xs">{value.favoritesOnly ? "ON" : "OFF"}</span></button></aside>;
}
