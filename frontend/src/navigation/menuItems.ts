import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export interface MenuItem {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  screen: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { label: "Home", icon: "home", screen: "Home" },
  { label: "Mi perfil", icon: "person", screen: "Profile" },
  { label: "Partidos", icon: "football", screen: "Matches" },
  { label: "Ranking", icon: "bar-chart", screen: "Ranking" },
];
