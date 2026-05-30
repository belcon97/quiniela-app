import type { AuthUser } from "@/types/shared.types";

// Login
export interface LoginRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  user: AuthUser;
  message: string;
  token: string;
}

// Register
export interface RegisterRequest {
  username: string;
  name: string;
  password: string;
}
