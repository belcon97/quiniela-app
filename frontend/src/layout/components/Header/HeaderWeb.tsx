import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
// Store
import { useAuthStore } from "@/store/authStore";
// Styles
import { makeStyles } from "./Header.styles";

interface HeaderWebProps {
  onMenuPress: () => void;
}

export function HeaderWeb({ onMenuPress }: HeaderWebProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Pressable onPress={onMenuPress}>
        <Feather name="menu" size={28} color={theme.textPrimary} />
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        Hola, {user?.username}
      </Text>
    </View>
  );
}
