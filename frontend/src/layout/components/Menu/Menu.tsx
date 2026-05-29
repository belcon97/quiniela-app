import {
  View,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigationState, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
// Styles
import { styles, MENU_WIDTH } from "./Menu.styles";
// Navigation
import { ROUTE_CONFIG, NAV_GROUPS } from "@/navigation/navigation.config";
// Store
import { useAuthStore } from "@/store/authStore";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const logout = useAuthStore((state) => state.logout);

  // Detectar ruta activa
  const currentRoute = useNavigationState((state) => state.routes[state.index]);
  const currentScreen = currentRoute.name;
  const isOwnProfile =
    currentScreen === "Profile" &&
    !(currentRoute.params as { username?: string })?.username;

  function isRouteActive(routeName: keyof AppStackParams): boolean {
    if (routeName === "Profile") return isOwnProfile;
    return currentScreen === routeName;
  }

  // Animacion del menu
  const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [visible, setVisible] = useState(false);

  const panelStyle = [
    styles.panel,
    {
      paddingTop: insets.top + 8,
      paddingBottom: insets.bottom + 8,
      transform: [{ translateX }],
    },
  ];

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

      <Animated.View style={panelStyle}>

        <View style={styles.userSection}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={28} color="#000" />
          </Pressable>
        </View>

        {/* navegacion */}
        {NAV_GROUPS.drawerWeb.map((routeName) => {
          const { label, icon } = ROUTE_CONFIG[routeName];
          const isActive = isRouteActive(routeName);

          return (
            <Pressable
              key={routeName}
              style={[styles.navItem, isActive ? styles.navItem__active : null]}
              onPress={() => {
                navigation.navigate(routeName);
                onClose();
              }}
            >
              <MaterialIcons name={icon} size={22} color="#000" />
              <Text style={styles.navItem__text}>{label}</Text>
            </Pressable>
          );
        })}

        <View style={styles.footer}>
          <Pressable style={styles.logoutItem} onPress={logout}>
            <MaterialIcons name="logout" size={22} color="#ff3b30" />
            <Text style={styles.logoutItem__text}>Cerrar sesión</Text>
          </Pressable>
        </View>

      </Animated.View>
    </View>
  );
}