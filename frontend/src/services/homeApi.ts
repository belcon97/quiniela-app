import { API_ROUTES } from "../constants";

export const homeApi = {
  getHomeData: async (token: string) => {
    const response = await fetch(`${API_ROUTES.home}`, {
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
};
