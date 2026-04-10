import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { useAuthStore } from "./src/store/authStore";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const { hydrateStore, isHydrated } = useAuthStore();

  useEffect(() => {
    hydrateStore();
  }, [hydrateStore]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  return (
    <SafeAreaProvider>
      {!fontsLoaded || !isHydrated ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <AppNavigator />
      )}
    </SafeAreaProvider>
  );
}
