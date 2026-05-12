import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { styles } from "./Login.styles";

// Components
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import ErrorBanner from "@/ui/ErrorBanner/ErrorBanner";

// Services
import { authService } from "@/features/auth/services/authService";

// Store
import { useAuthStore } from "@/store/authStore";

// Types
import type { LoginRequest } from "@/features/auth/types/auth.types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "@/navigation/navigation.types";
type LoginNavigationProp = NativeStackNavigationProp<AuthStackParams, "Login">;

export default function Login({
  navigation,
}: {
  navigation: LoginNavigationProp;
}) {
  const saveLogin = useAuthStore((state) => state.saveLogin);

  const [loginData, setLoginData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [errorBanner, setErrorBanner] = useState({
    visible: false,
    message: "",
  });

  // Maneja cambios en campos de formulario
  const handleUsernameChange = (text: string) => {
    setLoginData((prev) => ({ ...prev, username: text }));
    setErrors((prev) => ({ ...prev, username: "" }));
  };

  const handlePasswordChange = (text: string) => {
    setLoginData((prev) => ({ ...prev, password: text }));
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!loginData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio*";
    }
    if (!loginData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria*";
    } else if (loginData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres*";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authService.login(loginData);

      await saveLogin(response.token, response.user);
    } catch (error) {
      if (error instanceof Error) {
        setErrorBanner({ visible: true, message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // KeyboardAvoidingView -> Empuja el contenido cuando aparece el teclado
    <KeyboardAvoidingView
      style={styles.login__keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.login__scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.login}>
          <View style={styles.login__header}>
            <Text style={styles.login__title}>Bienvenido</Text>
            <Text style={styles.login__subtitle}>
              Inicia sesión para continuar.
            </Text>
          </View>

          <View style={styles.login__form}>
            <View style={styles.login__field}>
              <Text style={styles.login__label}>Nombre de usuario</Text>
              <Input
                placeholder="nombre123"
                hasError={errors.username !== ""}
                value={loginData.username}
                onChangeText={handleUsernameChange}
              />
              {errors.username && (
                <Text style={styles.login__error}>{errors.username}</Text>
              )}
            </View>

            <View style={styles.login__field}>
              <Text style={styles.login__label}>Contraseña</Text>
              <Input
                placeholder="123456"
                hasError={errors.password !== ""}
                value={loginData.password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.login__error}>{errors.password}</Text>
              )}
            </View>
          </View>
          <ErrorBanner
            message={errorBanner.message}
            visible={errorBanner.visible}
            onHide={() => setErrorBanner({ visible: false, message: "" })}
          />
          <Button
            onPress={handleLogin}
            variant="primary"
            disabled={loading}
            icon={<Feather name="arrow-right" size={14} color="white" />}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>

          <View style={styles.login__footer}>
            <Text style={styles.login__footer_text}>
              ¿No tienes una cuenta?{" "}
              <Text
                style={styles.login__footer_link}
                onPress={() => navigation.navigate("Register")}
              >
                Registrarse
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
