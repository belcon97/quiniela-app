import { View, Platform } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./Layout.styles";

// Components
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.content,
        { paddingBottom: insets.bottom },
        Platform.OS === "web" && { height: 0 },
      ]}
    >
      <Header onMenuPress={() => setIsMenuOpen(true)} />

      <View style={styles.children}>{children}</View>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
}
