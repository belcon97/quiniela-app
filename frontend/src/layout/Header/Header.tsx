import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Header.styles";

// Components
import { Avatar } from "../../components/ui/Avatar/Avatar";

// Hooks
import { useAuthStore } from "../../store/authStore";

// Utils
import { getInitials } from "../../utils/getInitials";

interface Props {
  onMenuPress: () => void;
}

export function Header({ onMenuPress }: Props) {
  const { user } = useAuthStore();

  const initials = getInitials(user?.name ?? "Usuario");
  return (
    <>
      <View style={styles.container}>
        {/* Menu */}
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>

        {/* Username */}
        <Text style={styles.title}>Hola, {user?.username}</Text>

        {/* Avatar */}
        <Avatar initials={initials} />
      </View>
    </>
  );
}
