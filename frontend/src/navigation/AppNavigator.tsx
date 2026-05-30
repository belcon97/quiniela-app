import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/authStore";
import type { AuthStackParams, AppStackParams, AdminStackParams } from "./navigation.types";

// Auth
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

// App
import { Home } from "../screens/Home/Home";
import { Profile } from "../screens/Profile/Profile";
import { Rules } from "../screens/Rules/Rules";
import { Ranking } from "../screens/Ranking/Ranking";

// Admin
import AdminDashboard from "../screens/AdminDashboard/AdminDashboard";

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AppStack = createNativeStackNavigator<AppStackParams>();
const AdminStack = createNativeStackNavigator<AdminStackParams>();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="Rules" component={Rules} />
      <AppStack.Screen name="Ranking" component={Ranking} />
    </AppStack.Navigator>
  );
}

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