import { useState, useEffect } from "react";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import { profileService } from "../services/profileService";
// Types
import type { PublicProfileData } from "../types/profile.types";

export function usePublicProfile(username: string) {
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [publicProfileData, setPublicProfileData] =
    useState<PublicProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicProfileData = async () => {
      if (!username || !token) return;
      try {
        setLoading(true);
        const response = await profileService.getPublicProfile(token, username);
        setPublicProfileData(response);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfileData();
  }, [username]);

  return {
    publicData: publicProfileData,
    loading,
    error,
  };
}
