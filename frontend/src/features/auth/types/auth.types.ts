import type { AuthUser } from "@/shared/types";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  message: string;
  token: string;
}
