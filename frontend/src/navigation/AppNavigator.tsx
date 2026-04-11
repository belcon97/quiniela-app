import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuthStore } from "../store/authStore";

// Screens
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

// Pantallas para usuarios no logueados
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

// Pantallas para usuarios logueados
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
