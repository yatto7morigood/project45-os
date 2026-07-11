"use client";

import { useMemo, useState } from "react";
import { Database, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayerDetail } from "@/components/players/player-detail";
import { PlayerFilters, type PlayerFiltersValue } from "@/components/players/player-filters";
import { PlayerList } from "@/components/players/player-list";
import { players } from "@/lib/player-data";
import { getPlayerAge } from "@/lib/player-types";

const initialFilters: PlayerFiltersValue = { search: "", position: "All", age: "All", category: "All", favoritesOnly: false };

export function PlayerDatabaseView() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0].id);
  const filteredPlayers = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLocaleLowerCase();
    return players.filter((player) => {
      const searchContent = [player.firstName, player.lastName, player.position, player.club, player.category, player.squad, ...player.coachNote.tags].join(" ").toLocaleLowerCase();
      const age = getPlayerAge(player.birthDate);
      const matchesSearch = !normalizedSearch || searchContent.includes(normalizedSearch);
      const matchesPosition = filters.position === "All" || player.position === filters.position || player.secondaryPositions.includes(filters.position as typeof player.position);
      const matchesAge = filters.age === "All" || (filters.age === "14-15" && age >= 14 && age <= 15) || (filters.age === "16+" && age >= 16);
      const matchesCategory = filters.category === "All" || player.category === filters.category;
      return matchesSearch && matchesPosition && matchesAge && matchesCategory && (!filters.favoritesOnly || player.favorite);
    });
  }, [filters]);
  const selectedPlayer = filteredPlayers.find((player) => player.id === selectedPlayerId) ?? filteredPlayers[0] ?? null;

  return <div className="mx-auto max-w-[1700px]"><header className="mb-7 flex flex-col gap-4 border-b border-white/8 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300"><Database size={14} />Long-term development</div><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Player Database</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">選手一人ひとりの能力、成長、日々の積み重ねを長期的に管理する。</p></div><Button><UserPlus size={16} />新しい選手を登録</Button></header><div className="grid gap-5 xl:grid-cols-[240px_minmax(300px,1fr)_minmax(370px,0.95fr)]"><PlayerFilters value={filters} onChange={setFilters} resultCount={filteredPlayers.length} /><PlayerList players={filteredPlayers} selectedPlayerId={selectedPlayer?.id} onSelect={setSelectedPlayerId} /><PlayerDetail player={selectedPlayer} /></div></div>;
}
