import { useState } from "react";
import { View } from "react-native";
// Styles
import { styles } from "./Layout.styles";
// Components
import { HeaderWeb } from "./components/Header/HeaderWeb";
import { Menu } from "./components/Menu/Menu";
// Types
import type { LayoutProps } from "./Layout";

export function LayoutWeb({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <View style={[styles.content, styles.content__web]}>
      <HeaderWeb onMenuPress={() => setIsMenuOpen(true)} />
        
      <View style={styles.children}>{children}</View>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
}