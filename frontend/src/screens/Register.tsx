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
import { colors, spacing, typography } from "../styles/theme";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { authApi } from "../services/authApi";
import { useAuthStore } from "../store/authStore";
import type { RegisterData } from "../types/types";

export default function Register({ navigation }: any) {
  const { saveLogin } = useAuthStore();
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    // Validaciones
    if (!registerData.name.trim()) {
      setErrors({ ...errors, name: "El nombre es obligatorio*" });
      return;
    }
    if (!registerData.username.trim()) {
      setErrors({
        ...errors,
        username: "El nombre de usuario es obligatorio*",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setErrors({ ...errors, email: "El email no es válido*" });
      return;
    }
    if (registerData.password.length < 6) {
      setErrors({
        ...errors,
        password: "La contraseña debe tener al menos 6 caracteres*",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.register(registerData);

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
          <View>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.subtitle}>
              Únete y comenzá a predecir resultados.
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Nombre"
              placeholder="Tu nombre"
              value={registerData.name}
              error={errors.name}
              onChangeText={(text) => {
                setRegisterData({ ...registerData, name: text });
                setErrors({ ...errors, name: "" });
              }}
            />
            <Input
              label="Nombre de usuario"
              placeholder="nombre123"
              value={registerData.username}
              error={errors.username}
              onChangeText={(text) => {
                setRegisterData({ ...registerData, username: text });
                setErrors({ ...errors, username: "" });
              }}
            />
            <Input
              label="Correo electrónico"
              placeholder="nombre@ejemplo.com"
              value={registerData.email}
              error={errors.email}
              onChangeText={(text) => {
                setRegisterData({ ...registerData, email: text });
                setErrors({ ...errors, email: "" });
              }}
            />
            <Input
              label="Contraseña"
              placeholder="mínimo 6 caracteres"
              value={registerData.password}
              error={errors.password}
              onChangeText={(text) => {
                setRegisterData({ ...registerData, password: text });
                setErrors({ ...errors, password: "" });
              }}
              secureTextEntry
            />
          </View>

          <Button onPress={handleRegister} variant="primary" disabled={loading}>
            {loading ? "Cargando..." : "Regístrate"}
          </Button>

          <Text style={styles.registerText}>
            ¿Ya tenés una cuenta?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Inicia sesión
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
    fontSize: typography.h1, // ✅
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.secondary,
    fontFamily: "Inter_400Regular",
    marginBottom: spacing.lg,
  },
  registerText: {
    marginVertical: spacing.md,
    textAlign: "center",
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
    marginBottom: spacing.md,
  },
});
