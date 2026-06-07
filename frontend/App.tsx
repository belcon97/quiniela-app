import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/theme";
import { useAppFonts } from "@/hooks/useAppFonts";
import { useAuthStore } from "@/store/authStore";
import AppNavigator from "@/navigation/AppNavigator";

export default function App() {
  const fontsLoaded = useAppFonts();
  const hydrateStore = useAuthStore((state) => state.hydrateStore);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  // Carga los datos de la sesion persitidos desde el store
  useEffect(() => {
    hydrateStore();
  }, [hydrateStore]);

  const isReady = fontsLoaded && isHydrated;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {isReady ? (
          <AppNavigator />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator />
          </View>
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
