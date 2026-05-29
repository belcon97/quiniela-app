import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
// Types
import type { RankingEntry } from "@/features/home/types/home.types";
// Services
import { homeService } from "@/features/home/services/homeService";

export function useRanking() {
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [myPosition, setMyPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        if (!token) return;
        const response = await homeService.getHomeData(token);
        setRanking(response.fullRanking);
        setMyPosition(response.myPosition);
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