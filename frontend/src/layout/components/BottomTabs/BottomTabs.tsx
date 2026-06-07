import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Navigation
import { ROUTE_CONFIG, NAV_GROUPS } from "@/navigation/navigation.config";
// Styles
import { makeStyles } from "./BottomTabs.styles";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

export function BottomTabs() {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const route = useRoute();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {NAV_GROUPS.bottomTabs.map((routeName) => {
        const { label, icon } = ROUTE_CONFIG[routeName];
        const isActive = route.name === routeName;

        return (
          <Pressable
            key={routeName}
            style={styles.tab}
            onPress={() => navigation.navigate(routeName)}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <MaterialIcons
              name={icon}
              size={24}
              color={isActive ? theme.primary : theme.textSecondary}
            />
            <Text
              style={isActive ? styles.label_active : styles.label_inactive}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
