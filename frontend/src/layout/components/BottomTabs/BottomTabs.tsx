import { View, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ROUTE_CONFIG, NAV_GROUPS } from "@/navigation/navigation.config";
// Styles
import { styles } from "./BottomTabs.styles";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

export function BottomTabs() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const route = useRoute();


  return (
    <View style={{ paddingBottom: insets.bottom }}>
      {NAV_GROUPS.bottomTabs.map((routeName) => {
        const { label, icon } = ROUTE_CONFIG[routeName];
        const isActive = route.name === routeName;

        return (
          <TouchableOpacity
            key={routeName}
            style={styles.tab}
            onPress={() => navigation.navigate(routeName)}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <MaterialIcons
              name={icon}
              size={24}
              style={isActive ? styles.icon__active : styles.icon__inactive}
            />
            <Text style={isActive ? styles.label__active : styles.label__inactive}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}