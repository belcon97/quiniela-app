import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { MaterialIcons } from "@expo/vector-icons";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  useNavigationState,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Store
import { useAuthStore } from "@/store/authStore";
// Navigation
import { ROUTE_CONFIG, NAV_GROUPS } from "@/navigation/navigation.config";
// Styles
import { makeStyles, MENU_WIDTH } from "./Menu.styles";
// Types
import type { MainStackParams } from "@/navigation/navigation.types";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  // Ruta activa — busca la pantalla real dentro de Main si está anidada
  const currentRoute = useNavigationState((state) => {
    const mainRoute = state.routes.find((r) => r.name === "Main");
    if (mainRoute?.state) {
      const nested = mainRoute.state;
      return nested.routes[nested.index ?? 0];
    }
    return state.routes[state.index];
  });

  const currentScreen = currentRoute?.name ?? "";
  const isOwnProfile =
    currentScreen === "Profile" &&
    !(currentRoute?.params as { username?: string })?.username;

  const isRouteActive = (routeName: keyof MainStackParams): boolean => {
    if (routeName === "Profile") return isOwnProfile;
    return currentScreen === routeName;
  };

  // Animación
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
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Panel */}
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
        {/* User section */}
        <View style={styles.userSection}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={26} color={theme.textPrimary} />
          </Pressable>
        </View>

        {/* Nav items */}
        {NAV_GROUPS.drawerWeb.map((routeName) => {
          const { label, icon } = ROUTE_CONFIG[routeName];
          const isActive = isRouteActive(routeName);

          return (
            <Pressable
              key={routeName}
              style={[styles.navItem, isActive && styles.navItem_active]}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "Main",
                    params: { screen: routeName },
                  }),
                );
                onClose();
              }}
            >
              <MaterialIcons
                name={icon}
                size={22}
                color={isActive ? theme.primary : theme.textPrimary}
              />
              <Text
                style={[
                  styles.navItem_text,
                  isActive && styles.navItem_text_active,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}

        {/* Footer — logout */}
        <View style={styles.footer}>
          <Pressable style={styles.logoutItem} onPress={logout}>
            <Feather name="log-out" size={22} color={theme.semantic.loss} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
