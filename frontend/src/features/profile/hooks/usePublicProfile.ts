import { useEffect, useState } from "react";

//Types
import type { PublicProfileData } from "../types/profile.types";
//Services
import { profileService } from "../services/profileService";

export function usePublicProfile(username: string) {
  const [loading, setLoading] = useState(true);
  const [publicProfileData, setPublicProfileData] =
    useState<PublicProfileData | null>(null);

  useEffect(() => {
    const fetchPublicProfileData = async () => {
      try {
        setLoading(true);

        if (!username) return;
        const response = await profileService.getPublicProfile(username);
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
