import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";

import Button from "../components/ui/Button";

export default function Home() {
  const { logout } = useAuthStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
      }}
    >
      <Text>Home</Text>

      <Button variant="outlined" onPress={logout}>
        Cerrar sesión
      </Button>
    </View>
  );
}
