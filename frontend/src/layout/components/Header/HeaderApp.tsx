import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
// Styles
import { styles } from "./Header.styles";
// Theme
import { colors } from "@/styles/theme";
// Store
import { useAuthStore } from "@/store/authStore";

interface HeaderAppProps {
  onRulesPress: () => void;
}

export function HeaderApp({ onRulesPress }: HeaderAppProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  const containerStyle = [styles.container, { paddingTop: insets.top + 8 }];

  return (
    <View style={containerStyle}>
      <Feather name="help-circle" size={26} color={colors.primary} onPress={onRulesPress} />
      <Text numberOfLines={1} style={styles.title}>
        Hola, {user?.username}
      </Text>
      <MaterialIcons name="person" size={26} color={colors.primary} />
    </View>
  );
}