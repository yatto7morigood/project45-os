"use client";

import { Heart, UsersRound } from "lucide-react";
import { PlayerAvatar } from "@/components/players/player-avatar";
import { RatingStars } from "@/components/players/rating-stars";
import type { Player } from "@/lib/player-types";
import { getPlayerAge } from "@/lib/player-types";
import { cn } from "@/lib/utils";

const conditionStyles = { Good: "bg-emerald-400/10 text-emerald-200", Normal: "bg-blue-400/10 text-blue-200", Recovery: "bg-amber-400/10 text-amber-200", Watch: "bg-rose-400/10 text-rose-200" };

type PlayerListProps = { players: Player[]; selectedPlayerId?: string; onSelect: (playerId: string) => void; };

export function PlayerList({ players, selectedPlayerId, onSelect }: PlayerListProps) {
  return <section className="min-w-0"><div className="mb-3 flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-300">Roster</p><h2 className="mt-1 text-lg font-semibold text-slate-100">選手一覧</h2></div><span className="text-xs text-slate-500">{players.length} players</span></div>{players.length > 0 ? <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">{players.map((player) => <button key={player.id} onClick={() => onSelect(player.id)} className={cn("group flex min-w-0 items-center gap-3 rounded-xl border p-3.5 text-left transition-all", selectedPlayerId === player.id ? "border-blue-400/50 bg-blue-500/[0.09] shadow-[0_0_0_1px_rgba(96,165,250,0.08)]" : "border-white/8 bg-card/70 hover:border-white/18 hover:bg-white/[0.035]")}><PlayerAvatar player={player} /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-100">{player.firstName} {player.lastName}</p><p className="mt-0.5 text-xs text-slate-500">{getPlayerAge(player.birthDate)}歳 · {player.position} · {player.category}</p></div>{player.favorite && <Heart size={14} className="shrink-0 fill-rose-300 text-rose-300" />}</div><div className="mt-3 flex items-center justify-between gap-2"><RatingStars rating={player.overallRating} /><span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", conditionStyles[player.condition])}>{player.condition}</span></div></div></button>)}</div> : <div className="grid min-h-56 place-items-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center"><div><UsersRound className="mx-auto text-slate-600" size={24} /><p className="mt-3 text-sm text-slate-300">該当する選手はいません</p><p className="mt-1 text-xs text-slate-500">検索条件を変更してください。</p></div></div>}</section>;
}
