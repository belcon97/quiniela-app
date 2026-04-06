import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
// Styles
import { colors, spacing, typography } from "../styles/theme";
import Feather from "@expo/vector-icons/Feather";
// Components
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
// Services
import { authApi } from "../services/authApi";
// Store
import { useAuthStore } from "../store/authStore";
// Types
import { LoginData } from "../types/types";

export default function Login({ navigation }: any) {
  const { saveLogin } = useAuthStore();

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    // Validaciones
    if (!loginData.username.trim()) {
      setErrors({
        ...errors,
        username: "El nombre de usuario es obligatorio*",
      });
      return;
    }
    if (!loginData.password.trim()) {
      setErrors({ ...errors, password: "La contraseña es obligatoria*" });
      return;
    }
    if (loginData.password.length < 6) {
      setErrors({
        ...errors,
        password: "La contraseña debe tener al menos 6 caracteres*",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(loginData);

      // Guardar token y usuario en el store
      saveLogin(response.token, response.user);
    } catch (error: any) {
      Alert.alert("Ups!", error.message);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.secondary,
    fontFamily: "Inter_400Regular",
    marginBottom: spacing.xl,
  },
  registerText: {
    marginTop: spacing.md,
    textAlign: "left",
    color: colors.secondary,
    fontFamily: "Inter_400Regular",
  },
  link: {
    color: colors.primary,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    textDecorationLine: "underline",
  },
  form: {
    marginBottom: spacing.lg,
  },
});
