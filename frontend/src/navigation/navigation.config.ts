import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { MainStackParams } from "./navigation.types";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

type RouteConfig = {
  [key in keyof MainStackParams]: {
    label: string;
    icon: IconName;
  };
};

export const ROUTE_CONFIG: RouteConfig = {
  Home: { label: "Inicio", icon: "home" },
  Profile: { label: "Perfil", icon: "person" },
  Rules: { label: "Reglas", icon: "menu-book" },
  Ranking: { label: "Ranking", icon: "leaderboard" },
  Standings: { label: "Tabla", icon: "table-chart" },
  Matches: { label: "Partidos", icon: "sports-soccer" },
};

export const NAV_GROUPS = {
  bottomTabs: ["Home", "Standings", "Ranking", "Profile", "Rules"],
  drawerWeb: ["Home", "Matches", "Standings", "Ranking", "Rules", "Profile"],
} satisfies Record<string, (keyof MainStackParams)[]>;
