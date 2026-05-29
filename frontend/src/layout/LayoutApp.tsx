import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";
// Styles
import { styles } from "./Layout.styles";
// Components
import { HeaderApp } from "./components/Header/HeaderApp";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";
import { RulesModal } from "./components/RulesModal/RulesModal";
// Types
import type { LayoutProps } from "./Layout";

export function LayoutApp({ children }: LayoutProps) {
  const [showRules, setShowRules] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  const containerStyle = [styles.content, { paddingBottom: insets.bottom }];

  return (
    <View style={containerStyle}>
      <HeaderApp onRulesPress={() => setShowRules(true)} />
      <View style={styles.children}>{children}</View>
      <BottomTabs />
      <RulesModal
        visible={showRules}
        onClose={() => setShowRules(false)}
        onRulesPress={() => navigation.navigate("Rules")}
      />
    </View>
  );
}