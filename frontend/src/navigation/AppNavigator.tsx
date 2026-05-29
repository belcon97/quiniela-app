import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuthStore } from "../store/authStore";

import type {
  AuthStackParams,
  AppStackParams,
  AdminStackParams,
} from "./navigation.types";

// Screens
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import {Home} from "../screens/Home/Home";
import {Profile} from "../screens/Profile/Profile";
import {Rules} from "../screens/Rules/Rules";
import {Ranking} from "../screens/Ranking/Ranking";
import AdminMatches from "../screens/AdminMatches/AdminMatches";

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AppStack = createNativeStackNavigator<AppStackParams>();
const AdminStack = createNativeStackNavigator<AdminStackParams>();

// Pantallas para usuarios no logueados
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

// Pantallas para usuarios logueados
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

// Pantallas para admins
function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminMatches" component={AdminMatches} />
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
