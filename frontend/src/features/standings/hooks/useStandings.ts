import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { standingsService } from "../services/standingsService";
import { calculateGroupStandings, calculateKnockoutPhases } from "@/utils/calculateStandings";
import type { GroupStanding, KnockoutPhase } from "../types/standings.types";

export function useStandings() {
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [groupStandings, setGroupStandings] = useState<GroupStanding[]>([]);
  const [knockoutPhases, setKnockoutPhases] = useState<KnockoutPhase[]>([]);

  useEffect(() => {
    const fetchStandings = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const matches = await standingsService.getMatches(token);
        setGroupStandings(calculateGroupStandings(matches));
        setKnockoutPhases(calculateKnockoutPhases(matches));
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [token]);

  return { groupStandings, knockoutPhases, loading };
}