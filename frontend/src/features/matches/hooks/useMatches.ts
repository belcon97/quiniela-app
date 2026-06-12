import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { matchesService } from "../services/matchesService";
import type { Match } from "@/shared/types";

export function useMatches() {
  const token = useAuthStore((state) => state.token);

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      try {
        const data = await matchesService.getMatches(token);
        setMatches(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  return { matches, loading, error };
}
