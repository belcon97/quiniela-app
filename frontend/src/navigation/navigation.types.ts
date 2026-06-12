export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParams = {
  Home: undefined;
  Profile: undefined;
  Rules: undefined;
  Ranking: undefined;
  Standings: undefined;
  Matches: undefined;
};

export type AppStackParams = {
  Main: undefined;
  ProfileDetail: { username: string };
};

export type AdminStackParams = {
  AdminDashboard: undefined;
};
