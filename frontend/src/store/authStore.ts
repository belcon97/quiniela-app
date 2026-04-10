import { Platform } from "react-native";

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

import type { User } from "../types/types";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // Cargar estado inicial desde SecureStore
  isHydrated: boolean;
  hydrateStore: () => Promise<void>;

  // Aciones
  saveLogin: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

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

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  isHydrated: false,

  // Guardar los datos del usuario
  saveLogin: async (token, user) => {
    await storage.setItem(STORAGE_KEYS.token, token);
    await storage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  // Cerrar sesión
  logout: async () => {
    await storage.removeItem(STORAGE_KEYS.token);
    await storage.removeItem(STORAGE_KEYS.user);
    set({ token: null, user: null, isAuthenticated: false });
  },

  // Cargar estado inicial desde SecureStore
  hydrateStore: async () => {
    try {
      const token = await storage.getItem(STORAGE_KEYS.token);
      const userRaw = await storage.getItem(STORAGE_KEYS.user);
      if (token && userRaw) {
        set({ token, user: JSON.parse(userRaw), isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error al hidratar el store:", error);
    } finally {
      set({ isHydrated: true });
    }
  },
}));
