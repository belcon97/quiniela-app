import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
// Types
import type { PrivateProfileData } from "../types/profile.types";
import type { TopScorerPrediction } from "@/features/topScorer/services/topScorerService";
// Services
import { profileService } from "../services/profileService";
import { topScorerService } from "@/features/topScorer/services/topScorerService";

export function usePrivateProfile() {
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [privateProfileData, setPrivateProfileData] = useState<PrivateProfileData | null>(null);
  const [topScorerPrediction, setTopScorerPrediction] = useState<TopScorerPrediction | null>(null);

  const fetchPrivateProfileData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [profile, scorer] = await Promise.all([
        profileService.getPrivateProfile(token),
        topScorerService.getMyPrediction(token),
      ]);
      setPrivateProfileData(profile);
      setTopScorerPrediction(scorer);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPrivateProfileData();
  }, [fetchPrivateProfileData]);

  return {
    privateData: privateProfileData,
    topScorerPrediction,
    loading,
    refetch: fetchPrivateProfileData,
  };
}