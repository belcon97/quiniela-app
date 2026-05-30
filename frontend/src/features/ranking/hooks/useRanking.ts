import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { rankingService } from "../service/rankingService";
import type { RankingEntry } from "../types/ranking.types";

export function useRanking() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [myPosition, setMyPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = await rankingService.getRanking(token);
        setRanking(data);
        // Mi posición la calculamos del ranking que ya tenemos
        const me = data.find((entry: RankingEntry) => entry.username === user?.username);
        setMyPosition(me?.position ?? null);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [token]);

  return { ranking, myPosition, loading };
}