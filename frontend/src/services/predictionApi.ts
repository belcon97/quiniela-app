import { API_ROUTES } from "../constants";

import type { PredictionData } from "../types/types";

export const predictionApi = {
  // Crear predicciones
  createPrediction: async (token: string, prediction: PredictionData) => {
    const response = await fetch(`${API_ROUTES.predictions}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ predictions: [prediction] }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },

  // Obtener mis predicciones (usuarios)
  getMyPredictions: async (token: string) => {
    const response = await fetch(`${API_ROUTES.myPredictions}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },

  // Obtener predicciones de un usuario (publico)
  getUserPredictions: async (userId: string) => {
    const response = await fetch(`${API_ROUTES.predictions}/${userId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },
};
