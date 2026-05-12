import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

//Types
import type { PrivateProfileData } from "../types/profile.types";
//Services
import { profileService } from "../services/profileService";

export function usePrivateProfile() {
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [privateProfileData, setPrivateProfileData] =
    useState<PrivateProfileData | null>(null);

  const fetchPrivateProfileData = async () => {
    try {
      setLoading(true);
      if (!token) return;
      const response = await profileService.getPrivateProfile(token);
      setPrivateProfileData(response);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivateProfileData();
  }, [token]);

  return {
    privateData: privateProfileData,
    loading,
    refetch: fetchPrivateProfileData,
  };
}
