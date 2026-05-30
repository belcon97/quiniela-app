import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
// Types
import type { PublicProfileData } from "../types/profile.types";
// Services
import { profileService } from "../services/profileService";

export function usePublicProfile(username: string) {
  const token = useAuthStore((state) => state.token);
  
  const [loading, setLoading] = useState(true);
  const [publicProfileData, setPublicProfileData] = useState<PublicProfileData | null>(null);

  useEffect(() => {
    const fetchPublicProfileData = async () => {
      if (!username || !token) return;
      try {
        setLoading(true);
        const response = await profileService.getPublicProfile(token, username);
        setPublicProfileData(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfileData();
  }, [username]);

  return {
    publicData: publicProfileData,
    loading,
  };
}