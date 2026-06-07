import { useEffect, useState } from "react";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import { rankingService } from "../service/rankingService";
// Types
import type { RankingEntry } from "@/shared/types";

export function useRanking() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [myPosition, setMyPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = await rankingService.getRanking(token);
        setRanking(data);
        const me = data.find((entry) => entry.username === user?.username);
        setMyPosition(me?.position ?? null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [token]);

  return { ranking, myPosition, loading, error };
}
