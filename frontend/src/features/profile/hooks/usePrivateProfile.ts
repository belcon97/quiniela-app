import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import type { PrivateProfileData } from "../types/profile.types";
import { profileService } from "../services/profileService";

export function usePrivateProfile() {
  const token = useAuthStore((state) => state.token);
  const setPendingMatches = useAuthStore((state) => state.setPendingMatches);
  const setHasPendingMatches = useAuthStore((state) => state.setHasPendingMatches);

  const [loading, setLoading] = useState(true);
  const [privateData, setPrivateData] = useState<PrivateProfileData | null>(null);

  const fetchPrivateProfileData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const profile = await profileService.getPrivateProfile(token);
      setPrivateData(profile);
      // Sincronizar partidos pendientes con el store
      setPendingMatches(profile.matchesWithoutPredictions);
      setHasPendingMatches(profile.matchesWithoutPredictions.length > 0);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrivateProfileData();
  }, [fetchPrivateProfileData]);

  return {
    privateData,
    loading,
    refetch: fetchPrivateProfileData,
  };
}