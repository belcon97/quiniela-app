import { API_ROUTES } from "../../../constants";
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
};
