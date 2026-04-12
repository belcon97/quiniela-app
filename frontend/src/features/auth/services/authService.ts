import { API_ROUTES } from "../../../constants";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from "../types/auth.types";

export const authService = {
  // Registrar usuarios
  register: async (user: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(API_ROUTES.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json() as Promise<AuthResponse>;
  },

  // Iniciar sesion
  login: async (user: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(API_ROUTES.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json() as Promise<AuthResponse>;
  },
};
