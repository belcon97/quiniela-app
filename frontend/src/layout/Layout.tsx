import { View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useState } from "react";
import { styles } from "./Layout.styles";

// Components
import { Header } from "./Header/Header";
import { Menu } from "./Header/Menu/Menu";

export function Layout({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={[styles.content, Platform.OS === "web" && { height: 0 }]}>
      <Header onMenuPress={() => setIsMenuOpen(true)} />
      <View style={{ flex: 1, height: 100 }}>{children}</View>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
}
