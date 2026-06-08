import { Platform } from "react-native";
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { usePredictionStore } from "./predictionStore";

import type { AuthUser } from "@/shared/types";

// State
interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isNewUser: boolean;

  isHydrated: boolean;
  isAuthenticated: boolean;
}

// Actions
interface AuthActions {
  saveLogin: (token: string, user: AuthUser, isNew?: boolean) => Promise<void>;
  logout: () => Promise<void>;

  hydrateStore: () => Promise<void>;
  clearNewUser: () => void;
  setFavoriteTeam: (team: string | null) => Promise<void>;
}

// Storage
const storage = {
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

// Keys
const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
} as const;

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  token: null,
  user: null,
  isNewUser: false,
  isHydrated: false,
  isAuthenticated: false,

  saveLogin: async (token, user, isNew = false) => {
    await storage.setItem(STORAGE_KEYS.token, token);
    await storage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isNewUser: isNew });
  },

  logout: async () => {
    await storage.removeItem(STORAGE_KEYS.token);
    await storage.removeItem(STORAGE_KEYS.user);
    set({ token: null, user: null, isAuthenticated: false });
    // Limpia el store de predicciones
    usePredictionStore.getState().clearPredictions();
  },

  hydrateStore: async () => {
    try {
      const token = await storage.getItem(STORAGE_KEYS.token);
      const userStorage = await storage.getItem(STORAGE_KEYS.user);
      if (token && userStorage) {
        set({ token, user: JSON.parse(userStorage), isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error al hidratar el store:", error);
    } finally {
      set({ isHydrated: true });
    }
  },

  clearNewUser: () => set({ isNewUser: false }),

  setFavoriteTeam: async (team) => {
    set((state) => ({
      user: state.user ? { ...state.user, favoriteTeam: team } : null,
    }));
    // Persistir el usuario actualizado en storage
    const currentUser = useAuthStore.getState().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, favoriteTeam: team };
      await storage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
    }
  },
}));
