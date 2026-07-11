import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/players/rating-stars";
import { abilityLabels, type Player } from "@/lib/player-types";

export function PlayerGrowthHistory({ player }: { player: Player }) {
  return <Card><CardContent className="p-5"><div className="flex items-center gap-2"><TrendingUp size={16} className="text-blue-300" /><h3 className="text-sm font-semibold text-slate-100">成長履歴</h3></div><div className="mt-4 space-y-0">{player.growthHistory.map((record, index) => <div key={record.id} className="relative flex gap-3 pb-5 last:pb-0"><span className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-card bg-blue-400" />{index < player.growthHistory.length - 1 && <span className="absolute left-[5px] top-4 h-[calc(100%-0.4rem)] w-px bg-white/10" />}<div className="min-w-0"><p className="text-xs text-slate-600">{record.date}</p><p className="mt-1 text-sm text-slate-200">{abilityLabels[record.ability]}</p><div className="mt-1.5 flex items-center gap-2"><RatingStars rating={record.from} /><span className="text-xs text-slate-600">→</span><RatingStars rating={record.to} /></div></div></div>)}</div></CardContent></Card>;
}
