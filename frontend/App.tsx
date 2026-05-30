import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Fonts
import { useAppFonts } from "./src/hooks/useAppFonts";
// Store
import { useAuthStore } from "./src/store/authStore";
// Navigation
import AppNavigator from "./src/navigation/AppNavigator";
// Styles
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function App() {
  const fontsLoaded = useAppFonts();
  const hydrateStore = useAuthStore((state) => state.hydrateStore);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    hydrateStore();
  }, [hydrateStore]);

  return (
    <SafeAreaProvider>
      {/* Espera fonts e hidratación del store antes de renderizar */}
      {!fontsLoaded || !isHydrated ? (
        <View style={styles.loader}>
        <ActivityIndicator />
      </View>
      ) : (
        <AppNavigator />
      )}
    </SafeAreaProvider>
  );
}
