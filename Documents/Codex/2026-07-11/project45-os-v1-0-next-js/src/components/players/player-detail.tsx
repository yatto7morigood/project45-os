import { UserRound } from "lucide-react";
import { CoachNotes } from "@/components/players/coach-notes";
import { PlayerGrowthHistory } from "@/components/players/player-growth-history";
import { PlayerMatchHistory, PlayerTrainingHistory } from "@/components/players/player-history";
import { PlayerProfile } from "@/components/players/player-profile";
import type { Player } from "@/lib/player-types";

export function PlayerDetail({ player }: { player: Player | null }) {
  if (!player) return <aside className="grid min-h-72 place-items-center rounded-xl border border-dashed border-white/10 bg-white/[0.015] p-6 text-center xl:sticky xl:top-8 xl:self-start"><div><UserRound className="mx-auto text-slate-600" size={26} /><p className="mt-3 text-sm text-slate-300">選手を選択してください</p><p className="mt-1 text-xs text-slate-500">詳細情報と履歴を表示します。</p></div></aside>;
  return <aside className="space-y-4 xl:sticky xl:top-8 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto xl:pr-1"><PlayerProfile player={player} /><PlayerGrowthHistory player={player} /><PlayerTrainingHistory player={player} /><PlayerMatchHistory player={player} /><CoachNotes key={player.id} note={player.coachNote} /></aside>;
}
