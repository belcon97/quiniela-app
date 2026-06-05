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

  getPublicProfile: async (token: string, username: string): Promise<PublicProfileData> => {
    const response = await fetch(`${API_ROUTES.profile}/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  markRulesAsRead: async (token: string) => {
    const response = await fetch(API_ROUTES.profileRules, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  updateFavoriteTeam: async (token: string, favoriteTeam: string) => {
    const response = await fetch(`${API_ROUTES.profile}/favorite-team`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favoriteTeam }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
  
  changePassword: async (token: string, currentPassword: string, newPassword: string) => {
    const response = await fetch(API_ROUTES.profilePassword, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};
