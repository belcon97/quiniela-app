import { useEffect } from "react";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Store
import { useAuthStore } from "@/store/authStore";
import { usePredictionStore } from "@/store/predictionStore";
// Auth
import Login from "@/screens/Login/Login";
import Register from "@/screens/Register/Register";
// App
import { Home } from "@/screens/Home/Home";
import { Standings } from "@/screens/Standings/Standings";
import { Profile } from "@/screens/Profile/Profile";
import { Rules } from "@/screens/Rules/Rules";
import { Ranking } from "@/screens/Ranking/Ranking";
// Admin
import AdminDashboard from "@/screens/AdminDashboard/AdminDashboard";
// Services
import { profileService } from "@/features/profile/services/profileService";
// Types
import type {
  AuthStackParams,
  AppStackParams,
  AdminStackParams,
} from "./navigation.types";

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AppStack = createNativeStackNavigator<AppStackParams>();
const AdminStack = createNativeStackNavigator<AdminStackParams>();

// Auth Stack
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

// App Stack
function AppStackScreen() {
  const isNewUser = useAuthStore((state) => state.isNewUser);
  const clearNewUser = useAuthStore((state) => state.clearNewUser);

  useEffect(() => {
    if (isNewUser) clearNewUser();
  }, []);

  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isNewUser ? "Profile" : "Home"}
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Standings" component={Standings} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="Rules" component={Rules} />
      <AppStack.Screen name="Ranking" component={Ranking} />
    </AppStack.Navigator>
  );
}

// Admin Stack
function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminDashboard" component={AdminDashboard} />
    </AdminStack.Navigator>
  );
}

// App Navigator
export default function AppNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setPendingMatches = usePredictionStore(
    (state) => state.setPendingMatches,
  );

  useEffect(() => {
    if (!isAuthenticated || !token || user?.role === "admin") return;

    const initStore = async () => {
      try {
        const profile = await profileService.getPrivateProfile(token);
        setPendingMatches(profile.matchesWithoutPredictions);
      } catch (error) {
        console.error("Error al inicializar store:", error);
      }
    };

    initStore();
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStackScreen />
      ) : user?.role === "admin" ? (
        <AdminStackScreen />
      ) : (
        <AppStackScreen />
      )}
    </NavigationContainer>
  );
}
