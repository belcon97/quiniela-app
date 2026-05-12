export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParams = {
  Home: undefined;
  Profile: { username: string } | undefined;
};

export type AdminStackParams = {
  AdminMatches: undefined;
};
