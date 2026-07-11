import { CalendarCheck2, Crown, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Player } from "@/lib/player-types";
import { cn } from "@/lib/utils";

export function PlayerTrainingHistory({ player }: { player: Player }) {
  return <Card><CardContent className="p-5"><div className="flex items-center gap-2"><CalendarCheck2 size={16} className="text-blue-300" /><h3 className="text-sm font-semibold text-slate-100">練習履歴</h3></div><div className="mt-4 divide-y divide-white/7">{player.trainingHistory.map((record) => <div key={record.id} className="py-3 first:pt-0 last:pb-0"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-200">{record.theme}</p><p className="mt-1 text-xs text-slate-600">{record.date} · {record.coach}</p></div></div><p className="mt-2 text-xs leading-5 text-slate-500">{record.note}</p></div>)}</div></CardContent></Card>;
}

export function PlayerMatchHistory({ player }: { player: Player }) {
  return <Card><CardContent className="p-5"><div className="flex items-center gap-2"><Trophy size={16} className="text-blue-300" /><h3 className="text-sm font-semibold text-slate-100">試合履歴</h3></div><div className="mt-4 overflow-hidden rounded-lg border border-white/8"><div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-white/8 bg-white/[0.025] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600"><span>対戦相手</span><span>出場</span><span>評価</span></div>{player.matchHistory.map((match) => <div key={match.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/7 px-3 py-3 last:border-b-0"><div className="min-w-0"><p className="truncate text-sm text-slate-200">{match.opponent}</p><p className="mt-0.5 text-[11px] text-slate-600">{match.date} · {match.position}</p></div><span className="text-xs text-slate-400">{match.minutes}&apos;</span><span className={cn("flex items-center gap-1 rounded px-1.5 py-1 text-xs font-semibold", match.mvp ? "bg-amber-400/10 text-amber-200" : "bg-white/[0.05] text-slate-300")}>{match.mvp && <Crown size={12} />}{match.rating.toFixed(1)}</span></div>)}</div></CardContent></Card>;
}
