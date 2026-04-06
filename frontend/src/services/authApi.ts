import { API_ROUTES } from "../constants";

import type { RegisterData, LoginData } from "../types/types";

export const authApi = {
  // Registrar usuarios
  register: async (user: RegisterData) => {
    const response = await fetch(`${API_ROUTES.register}`, {
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
    return response.json();
  },

  // Iniciar sesion
  login: async (user: LoginData) => {
    const response = await fetch(`${API_ROUTES.login}`, {
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
    return response.json();
  },
};
