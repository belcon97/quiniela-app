import { useEffect, useState } from "react";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import { standingsService } from "../services/standingsService";
// Types
import type { Match } from "@/shared/types";

export function useStandings() {
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = await standingsService.getMatches(token);
        setMatches(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [token]);

  return { matches, loading, error };
}
