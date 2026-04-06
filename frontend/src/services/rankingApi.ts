import { API_ROUTES } from "../constants";

export const rankingApi = {
  // Obtener ranking
  getRanking: async () => {
    const response = await fetch(`${API_ROUTES.ranking}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },
};
