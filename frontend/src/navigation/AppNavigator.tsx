import { useEffect } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { LinkingOptions } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { Matches } from "@/screens/Matches/Matches";
// Admin
import AdminDashboard from "@/screens/AdminDashboard/AdminDashboard";
// Services
import { profileService } from "@/features/profile/services/profileService";
// Types
import type {
  AuthStackParams,
  MainStackParams,
  AppStackParams,
  AdminStackParams,
} from "./navigation.types";

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();
const AppStack = createNativeStackNavigator<AppStackParams>();
const AdminStack = createNativeStackNavigator<AdminStackParams>();

const linking: LinkingOptions<AppStackParams> = {
  prefixes: [],
  config: {
    screens: {
      Main: "/*",
      ProfileDetail: "profile/:username",
    },
  },
};

// Wrappers
function ProfileScreen() {
  return <Profile />;
}

function ProfileDetailScreen({
  route,
}: NativeStackScreenProps<AppStackParams, "ProfileDetail">) {
  return <Profile username={route.params.username} />;
}

// Auth Stack
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

// Main Stack — pantallas raíz, sin "atrás"
function MainStackScreen() {
  const isNewUser = useAuthStore((state) => state.isNewUser);
  const clearNewUser = useAuthStore((state) => state.clearNewUser);

  useEffect(() => {
    if (isNewUser) clearNewUser();
  }, []);

  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isNewUser ? "Profile" : "Home"}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Standings" component={Standings} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Rules" component={Rules} />
      <MainStack.Screen name="Ranking" component={Ranking} />
      <MainStack.Screen name="Matches" component={Matches} />
    </MainStack.Navigator>
  );
}

// App Stack — detalle encima de Main, tienen "atrás"
function AppStackScreen() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Main" component={MainStackScreen} />
      <AppStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
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

// Root
export default function AppNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setPendingMatches = usePredictionStore((state) => state.setPendingMatches);
  const setMyPredictions = usePredictionStore((state) => state.setMyPredictions);

  useEffect(() => {
    if (!isAuthenticated || !token || user?.role === "admin") return;

    const initStore = async () => {
      try {
        const profile = await profileService.getPrivateProfile(token);
        setPendingMatches(profile.matchesWithoutPredictions);
        setMyPredictions([
          ...profile.predictionsHistory,
          ...profile.predictionsPending,
        ]);
      } catch (error) {
        console.error("Error al inicializar store:", error);
      }
    };

    initStore();
  }, [isAuthenticated]);

  return (
    <NavigationContainer linking={Platform.OS === "web" ? linking : undefined}>
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