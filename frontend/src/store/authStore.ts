import { Platform } from "react-native";

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

import type { AuthUser } from "../types/shared.types";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  isHydrated: boolean;
}
interface AuthActions {
  saveLogin: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;

  hydrateStore: () => Promise<void>;
}

// SecureStore no disponible en web, usamos localStorage
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

  saveLogin: async (token, user) => {
    await storage.setItem(STORAGE_KEYS.token, token);
    await storage.setItem(STORAGE_KEYS.user, JSON.stringify(user));

    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    await storage.removeItem(STORAGE_KEYS.token);
    await storage.removeItem(STORAGE_KEYS.user);

    set({ token: null, user: null, isAuthenticated: false });
  },

  // Recuperar la sesion guardada y actualizar el estado
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
}));
