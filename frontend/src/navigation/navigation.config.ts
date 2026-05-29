import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { AppStackParams } from "./navigation.types";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

type RouteConfig = {
  [key in keyof AppStackParams]: {
    label: string;
    icon: IconName;
  };
};

export const ROUTE_CONFIG: RouteConfig = {
  Home:    { label: "Inicio",  icon: "home" },
  Profile: { label: "Perfil",  icon: "person" },
  Rules:   { label: "Reglas",  icon: "menu-book" },
  Ranking: { label: "Ranking", icon: "leaderboard" },
};

export const NAV_GROUPS = {
  bottomTabs: ["Home", "Profile", "Ranking", "Rules"],
  drawerWeb:  ["Home", "Ranking", "Rules", "Profile"],
} satisfies Record<string, (keyof AppStackParams)[]>;