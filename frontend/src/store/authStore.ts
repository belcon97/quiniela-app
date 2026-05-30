import { Platform } from "react-native";
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
// Types
import type { AuthUser, Match } from "@/shared/types/shared.types";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Partidos que el usuario aun no predijo
  pendingMatches: Match[];
}

interface AuthActions {
  saveLogin: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
  hydrateStore: () => Promise<void>;

  // Actualizar partidos pendientes despues de cada fetch
  setPendingMatches: (matches: Match[]) => void;

  // Actualizar equipo favorito sin hacer
  setFavoriteTeam: (team: string | null) => void;
}

// SecureStore no disponible en web — adaptador por plataforma
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

const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
} as const;

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  pendingMatches: [],

  saveLogin: async (token, user) => {
    await storage.setItem(STORAGE_KEYS.token, token);
    await storage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    await storage.removeItem(STORAGE_KEYS.token);
    await storage.removeItem(STORAGE_KEYS.user);
    set({ token: null, user: null, isAuthenticated: false, pendingMatches: [] });
  },

  // Recuperar sesion guardada al arrancar la app
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

  // Sincronizar partidos pendientes con el backend
  setPendingMatches: (matches) => set({ pendingMatches: matches }),

  // Actualizar equipo favorito en el store sin refetch completo
  setFavoriteTeam: (team) =>
    set((state) => ({
      user: state.user ? { ...state.user, favoriteTeam: team } : null,
    })),
}));