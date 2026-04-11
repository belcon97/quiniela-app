import { API_ROUTES } from "../constants";
import type { HomeData } from "../types/home.types";

export const homeService = {
  getHomeData: async (token: string): Promise<HomeData> => {
    const response = await fetch(API_ROUTES.home, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json() as Promise<HomeData>;
  },
};
