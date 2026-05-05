import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigationState, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles, MENU_WIDTH } from "./Menu.styles";

// Components
import { Avatar } from "@/ui/Avatar/Avatar";

// Navigation
import { MENU_ITEMS } from "@/navigation/menuItems";

// Store
import { useAuthStore } from "@/store/authStore";

// Utils
import { getInitials } from "@/utils/getInitials";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const initials = user?.name ? getInitials(user.name) : "";

  // Detectar si estamos en el perfil propio
  const currentRoute = useNavigationState((state) => state.routes[state.index]);
  const currentScreen = currentRoute.name;
  const isOwnProfile =
    currentScreen === "Profile" &&
    !(currentRoute.params as { username?: string })?.username;

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
  }, [isOpen, translateX]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.overlay} onPress={onClose} />

      <Animated.View
        style={[
          styles.panel,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 8,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.userSection}>
          <Avatar initials={initials} />

          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {user?.name}
            </Text>
            <Text style={styles.userUsername} numberOfLines={1}>
              @{user?.username}
            </Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={[
              styles.navItem,
              (currentScreen === item.screen && item.screen !== "Profile") ||
              (item.screen === "Profile" && isOwnProfile)
                ? styles.navItemActive
                : null,
            ]}
            onPress={() => {
              navigation.navigate(item.screen as never);
              onClose();
            }}
          >
            <Ionicons name={item.icon} size={22} color="#000" />
            <Text style={styles.navItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

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
