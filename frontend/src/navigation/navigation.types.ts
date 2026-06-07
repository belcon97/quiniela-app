export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParams = {
  Home: undefined;
  Profile: { username: string } | undefined;
  Rules: undefined;
  Ranking: undefined;
  Standings: undefined;
};

export type AdminStackParams = {
  AdminDashboard: undefined;
};
