// Constants
import { API_ROUTES } from "@/constants/api";
// Types
import type {
  PrivateProfileData,
  PublicProfileData,
} from "../types/profile.types";

export const profileService = {
  // Private Profile
  getPrivateProfile: async (token: string): Promise<PrivateProfileData> => {
    const response = await fetch(API_ROUTES.profile, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // PublicProfile
  getPublicProfile: async (
    token: string,
    username: string,
  ): Promise<PublicProfileData> => {
    const response = await fetch(`${API_ROUTES.profile}/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Crear predicciones
  createPredictions: async (
    token: string,
    predictions: {
      matchId: string;
      homeScore: number;
      awayScore: number;
      isWildcard?: boolean;
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

  // Marcar reglas como leidas
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

  // Actualizar equipo favorito
  updateFavoriteTeam: async (token: string, favoriteTeam: string) => {
    const response = await fetch(API_ROUTES.profileFavoriteTeam, {
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

  // Cambiar contraseña
  changePassword: async (
    token: string,
    currentPassword: string,
    newPassword: string,
  ) => {
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
