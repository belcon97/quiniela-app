import { create } from "zustand";
import type { User } from "../types/types";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // Aciones
  saveLogin: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  saveLogin: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));
