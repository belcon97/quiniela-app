import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Navigation
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Hooks
import { useTheme, space } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Store
import { useAuthStore } from "@/store/authStore";
// Styles
import { makeStyles } from "./Header.styles";
// Types
import type { MainStackParams } from "@/navigation/navigation.types";

export function HeaderApp() {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParams>>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={[styles.container, { paddingTop: insets.top + space[2] }]}>
      <Pressable onPress={() => navigation.navigate("Rules")}>
        <Feather name="help-circle" size={26} color={theme.primary} />
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        Hola, {user?.username}
      </Text>

      <Pressable style={styles.profileBtn} onPress={logout}>
        <Feather name="log-out" size={26} color={theme.primary} />
      </Pressable>
    </View>
  );
}