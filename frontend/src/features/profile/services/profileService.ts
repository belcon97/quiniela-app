import { API_ROUTES } from "@/constants/constants";
import type {
  PrivateProfileData,
  PublicProfileData,
} from "../types/profile.types";

export const profileService = {
  getPrivateProfile: async (token: string): Promise<PrivateProfileData> => {
    const response = await fetch(API_ROUTES.profile, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json() as Promise<PrivateProfileData>;
  },

  getPublicProfile: async (username: string): Promise<PublicProfileData> => {
    const response = await fetch(`${API_ROUTES.profile}/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json() as Promise<PublicProfileData>;
  },

  createPredictions: async (
    token: string,
    predictions: {
      matchId: string;
      homeScore: number;
      awayScore: number;
      isWildcard?: boolean;
      penaltyWinner?: string;
    }[],
  ) => {
    const response = await fetch(API_ROUTES.predictions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ predictions }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};
