import { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styles } from "./Login.styles";
import Feather from "@expo/vector-icons/Feather";

// Components
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

// Services
import { authService } from "../../features/auth/services/authService";

// Store
import { useAuthStore } from "../../store/authStore";

// Types
import type { LoginRequest } from "../../features/auth/types/auth.types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "../../navigation/navigation.types";

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParams, "Login">;

export default function Login({
  navigation,
}: {
  navigation: LoginNavigationProp;
}) {
  const { saveLogin } = useAuthStore();

  const [loginData, setLoginData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateForm = () => {
    if (!loginData.username.trim()) {
      setErrors({
        ...errors,
        username: "El nombre de usuario es obligatorio*",
      });
      return false;
    }
    if (!loginData.password.trim()) {
      setErrors({ ...errors, password: "La contraseña es obligatoria*" });
      return false;
    }
    if (loginData.password.length < 6) {
      setErrors({
        ...errors,
        password: "La contraseña debe tener al menos 6 caracteres*",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authService.login(loginData);

      await saveLogin(response.token, response.user);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Ups!", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* header */}
          <View>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Inicia sesión para continuar.</Text>
          </View>

          {/* inputs form */}

          <View style={styles.form}>
            <Input
              label="Nombre de usuario"
              placeholder="nombre123"
              error={errors.username}
              value={loginData.username}
              onChangeText={(text) => {
                setLoginData({ ...loginData, username: text });
                setErrors({ ...errors, username: "" });
              }}
            />
            <Input
              label="Contraseña"
              placeholder="123456"
              error={errors.password}
              value={loginData.password}
              onChangeText={(text) => {
                setLoginData({ ...loginData, password: text });
                setErrors({ ...errors, password: "" });
              }}
              secureTextEntry
            />
          </View>
          {/* botones */}
          <Button
            onPress={handleLogin}
            variant="primary"
            disabled={loading}
            icon={<Feather name="arrow-right" size={14} color="white" />}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>

          <Text style={styles.registerText}>
            ¿No tienes una cuenta?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Registrarse
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
