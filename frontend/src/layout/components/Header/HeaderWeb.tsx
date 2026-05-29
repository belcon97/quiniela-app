import { View, Text, TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Styles
import { styles } from "./Header.styles";
// Theme
import { colors } from "@/styles/theme";
// Store
import { useAuthStore } from "@/store/authStore";

interface HeaderWebProps {
  onMenuPress: () => void;
}

export function HeaderWeb({ onMenuPress }: HeaderWebProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <MaterialIcons name="menu" size={28} color={colors.neutral900} />
      </TouchableOpacity>
      
      <Text numberOfLines={1} style={styles.title}>
        Hola, {user?.username}
      </Text>
    </View>
  );
}