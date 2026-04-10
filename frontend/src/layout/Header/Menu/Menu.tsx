import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigationState } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { styles, MENU_WIDTH } from "./Menu.styles";

// Components
import { Avatar } from "../../../components/ui/Avatar/Avatar";

// Navigation
import { MENU_ITEMS } from "../../../navigation/menuItems";

// Store
import { useAuthStore } from "../../../store/authStore";

// Utils
import { getInitials } from "../../../utils/getInitials";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: Props) {
  const { user, logout } = useAuthStore();
  const initials = user?.name ? getInitials(user.name) : "";

  const currentScreen = useNavigationState(
    (state) => state.routes[state.index].name,
  );

  const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);

      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <Animated.View style={[styles.panel, { transform: [{ translateX }] }]}>
        {/* Usuario */}
        <View style={styles.userSection}>
          {/* Avatar */}
          <Avatar initials={initials} />
          <View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userUsername}>@{user?.username}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Navegación */}
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={[
              styles.navItem,
              currentScreen === item.screen && styles.navItemActive,
            ]}
          >
            <Ionicons name={item.icon} size={22} color="#000" />
            <Text style={styles.navItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutItem} onPress={logout}>
            <Ionicons name="log-out-outline" size={22} color="#ff3b30" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
