import { useState } from "react";
import { View } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { HeaderWeb } from "./components/Header/HeaderWeb";
import { Menu } from "./components/Menu/Menu";
// Styles
import { makeStyles } from "./Layout.styles";
// Types
import type { LayoutProps } from "./Layout";

export function LayoutWeb({ children }: LayoutProps) {
  const styles = useStyles(makeStyles);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={[styles.content, styles.content_web]}>
      {/* Header */}
      <HeaderWeb onMenuPress={() => setIsMenuOpen(true)} />

      {/* Content */}
      <View style={styles.children}>{children}</View>

      {/* Menu drawer */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
}
