import { View } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { HeaderApp } from "./components/Header/HeaderApp";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";
// Styles
import { makeStyles } from "./Layout.styles";
// Types
import type { LayoutProps } from "./Layout";

export function LayoutApp({ children }: LayoutProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.content}>
      {/* Header */}
      <HeaderApp />

      {/* Content */}
      <View style={styles.children}>{children}</View>

      {/* Bottom tabs */}
      <BottomTabs />
    </View>
  );
}
