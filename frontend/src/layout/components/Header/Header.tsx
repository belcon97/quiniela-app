import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./Header.styles";

// Components
import { Avatar } from "@/ui/Avatar/Avatar";

// Hooks
import { useAuthStore } from "@/store/authStore";

// Utils
import { getInitials } from "@/utils/getInitials";

interface HeaderProps {
  onMenuPress: () => void;
}

export function Header({ onMenuPress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  const initials = getInitials(user?.name ?? "Usuario");
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* Menu */}
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="#000" />
      </TouchableOpacity>

      {/* Username */}
      <Text numberOfLines={1} style={styles.title}>
        Hola, {user?.username}
      </Text>

      {/* Avatar */}
      <Avatar initials={initials} />
    </View>
  );
}
