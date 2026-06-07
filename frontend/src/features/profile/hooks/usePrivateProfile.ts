import { useState, useEffect, useCallback } from "react";
// Store
import { useAuthStore } from "@/store/authStore";
import { usePredictionStore } from "@/store/predictionStore";
// Services
import { profileService } from "../services/profileService";
// Types
import type { PrivateProfileData } from "../types/profile.types";

export function usePrivateProfile() {
  const token = useAuthStore((state) => state.token);
  const setPendingMatches = usePredictionStore(
    (state) => state.setPendingMatches,
  );

  const [loading, setLoading] = useState(true);
  const [privateData, setPrivateData] = useState<PrivateProfileData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const fetchPrivateProfileData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const profile = await profileService.getPrivateProfile(token);
      setPrivateData(profile);
      setPendingMatches(profile.matchesWithoutPredictions);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPrivateProfileData();
  }, [fetchPrivateProfileData]);

  return {
    privateData,
    loading,
    error,
    refetch: fetchPrivateProfileData,
  };
}
