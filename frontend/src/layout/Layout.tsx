import { Platform } from "react-native";
// Components
import { LayoutApp } from "./LayoutApp";
import { LayoutWeb } from "./LayoutWeb";

export interface LayoutProps {
  children: React.ReactNode;
}

const isWeb = Platform.OS === "web";

export function Layout({ children }: LayoutProps) {
  return isWeb ? (
    <LayoutWeb>{children}</LayoutWeb>
  ) : (
    <LayoutApp>{children}</LayoutApp>
  );
}
