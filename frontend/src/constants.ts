import Constants from "expo-constants";

export const BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000";

export const API_ROUTES = {
  // Auth
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  // Home
  home: `${BASE_URL}/home`,

  // Profile
  profile: `${BASE_URL}/profile`,
};
