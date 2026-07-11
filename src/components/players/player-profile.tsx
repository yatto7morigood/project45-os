import { Footprints, Ruler, Shield, Weight } from "lucide-react";
import { PlayerAvatar } from "@/components/players/player-avatar";
import { RatingStars } from "@/components/players/rating-stars";
import { Card, CardContent } from "@/components/ui/card";
import { abilityGroups, abilityLabels, getPlayerAge, type AbilityCategory, type AbilityKey, type Player } from "@/lib/player-types";

function DetailItem({ label, value }: { label: string; value: string | number }) {
  return <div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">{label}</p><p className="mt-1 text-sm text-slate-200">{value}</p></div>;
}

function AbilityGroupCard({ category, player }: { category: AbilityCategory; player: Player }) {
  const skills = abilityGroups[category] as readonly AbilityKey[];
  return <div className="rounded-lg border border-white/8 bg-white/[0.018] p-3.5"><p className="text-xs font-semibold text-blue-200">{category}</p><div className="mt-3 space-y-2.5">{skills.map((skill) => <div key={skill} className="flex items-center justify-between gap-3"><span className="text-[11px] text-slate-500">{abilityLabels[skill]}</span><RatingStars rating={player.ratings[skill]} /></div>)}</div></div>;
}

export function PlayerProfile({ player }: { player: Player }) {
  return <><Card><CardContent className="p-5"><div className="flex items-center gap-3"><PlayerAvatar player={player} size="lg" /><div className="min-w-0"><p className="text-lg font-semibold text-white">{player.firstName} {player.lastName}</p><p className="mt-1 text-sm text-slate-500">#{player.number} · {player.position} · {player.squad}</p><div className="mt-2"><RatingStars rating={player.overallRating} showValue size="md" /></div></div></div><div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/8 pt-5"><DetailItem label="生年月日" value={player.birthDate} /><DetailItem label="年齢" value={getPlayerAge(player.birthDate) + "歳"} /><DetailItem label="利き足" value={player.preferredFoot} /><DetailItem label="所属" value={player.club} /><DetailItem label="ポジション" value={[player.position, ...player.secondaryPositions].join(" / ")} /><DetailItem label="カテゴリー" value={player.category} /></div><div className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-white/8 bg-white/[0.02] p-3"><div className="flex items-center gap-1.5 text-xs text-slate-400"><Ruler size={13} className="text-slate-600" />{player.heightCm} cm</div><div className="flex items-center gap-1.5 text-xs text-slate-400"><Weight size={13} className="text-slate-600" />{player.weightKg} kg</div><div className="flex items-center gap-1.5 text-xs text-slate-400"><Footprints size={13} className="text-slate-600" />{player.preferredFoot}</div></div></CardContent></Card><Card className="mt-4"><CardContent className="p-5"><div className="flex items-center gap-2"><Shield size={16} className="text-blue-300" /><h3 className="text-sm font-semibold text-slate-100">能力評価</h3><span className="ml-auto text-[10px] text-slate-600">5段階評価</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{(Object.keys(abilityGroups) as AbilityCategory[]).map((category) => <AbilityGroupCard key={category} category={category} player={player} />)}</div></CardContent></Card></>;
}
