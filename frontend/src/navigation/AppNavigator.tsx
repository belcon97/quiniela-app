import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/authStore";
import type {
  AuthStackParams,
  AppStackParams,
  AdminStackParams,
} from "./navigation.types";

// Auth
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

// App
import { Home } from "../screens/Home/Home";
import { Standings } from "../screens/Standings/Standings";
import { Profile } from "../screens/Profile/Profile";
import { Rules } from "../screens/Rules/Rules";
import { Ranking } from "../screens/Ranking/Ranking";

// Admin
import AdminDashboard from "../screens/AdminDashboard/AdminDashboard";

// Services
import { profileService } from "@/features/profile/services/profileService";

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AppStack = createNativeStackNavigator<AppStackParams>();
const AdminStack = createNativeStackNavigator<AdminStackParams>();

// Auth
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

// App
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

// Admin
function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminDashboard" component={AdminDashboard} />
    </AdminStack.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setPendingMatches = useAuthStore((state) => state.setPendingMatches);
  const setHasPendingMatches = useAuthStore(
    (state) => state.setHasPendingMatches,
  );

  // Al autenticarse cargamos el perfil para inicializar hasPendingMatches en el store
  useEffect(() => {
    if (!isAuthenticated || !token || user?.role === "admin") return;

    const initStore = async () => {
      try {
        const profile = await profileService.getPrivateProfile(token);
        setPendingMatches(profile.matchesWithoutPredictions);
        setHasPendingMatches(profile.matchesWithoutPredictions.length > 0);
      } catch (error) {
        console.error(error);
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
