import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./Register.styles";

// Components
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import ErrorBanner from "@/ui/ErrorBanner/ErrorBanner";

// Services
import { authService } from "@/features/auth/services/authService";

// Store
import { useAuthStore } from "@/store/authStore";

// Types
import type { RegisterRequest } from "@/features/auth/types/auth.types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "@/navigation/navigation.types";

type RegisterNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  "Register"
>;

export default function Register({
  navigation,
}: {
  navigation: RegisterNavigationProp;
}) {
  const { saveLogin } = useAuthStore();

  const [registerData, setRegisterData] = useState<RegisterRequest>({
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
  const [errorBanner, setErrorBanner] = useState({
    visible: false,
    message: "",
  });

  const handleNameChange = (text: string) => {
    setRegisterData((prev) => ({ ...prev, name: text }));
    setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleUsernameChange = (text: string) => {
    setRegisterData((prev) => ({ ...prev, username: text }));
    setErrors((prev) => ({ ...prev, username: "" }));
  };

  const handleEmailChange = (text: string) => {
    setRegisterData((prev) => ({ ...prev, email: text }));
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (text: string) => {
    setRegisterData((prev) => ({ ...prev, password: text }));
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "", username: "", email: "", password: "" };

    if (!registerData.name.trim()) {
      newErrors.name = "El nombre es obligatorio*";
    }
    if (!registerData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio*";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      newErrors.email = "El email no es válido*";
    }
    if (registerData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres*";
    }

    setErrors(newErrors);
    return (
      !newErrors.name &&
      !newErrors.username &&
      !newErrors.email &&
      !newErrors.password
    );
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authService.register(registerData);
      await saveLogin(response.token, response.user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error inesperado";
      setErrorBanner({ visible: true, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    // behavior difiere por OS: iOS necesita "padding", Android "height"
    <KeyboardAvoidingView
      style={styles.register__keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.register__scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.register}>
          <View style={styles.register__header}>
            <Text style={styles.register__title}>Crea tu cuenta</Text>
            <Text style={styles.register__subtitle}>
              Únete y comenzá a predecir resultados.
            </Text>
          </View>

          <View style={styles.register__form}>
            <View style={styles.register__field}>
              <Text style={styles.register__label}>Nombre</Text>
              <Input
                placeholder="Tu nombre"
                value={registerData.name}
                hasError={!!errors.name}
                onChangeText={handleNameChange}
              />
              {errors.name && (
                <Text style={styles.register__error}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.register__field}>
              <Text style={styles.register__label}>Nombre de usuario</Text>
              <Input
                placeholder="nombre123"
                value={registerData.username}
                hasError={!!errors.username}
                onChangeText={handleUsernameChange}
              />
              {errors.username && (
                <Text style={styles.register__error}>{errors.username}</Text>
              )}
            </View>

            <View style={styles.register__field}>
              <Text style={styles.register__label}>Correo electrónico</Text>
              <Input
                placeholder="nombre@ejemplo.com"
                value={registerData.email}
                hasError={!!errors.email}
                onChangeText={handleEmailChange}
              />
              {errors.email && (
                <Text style={styles.register__error}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.register__field}>
              <Text style={styles.register__label}>Contraseña</Text>
              <Input
                placeholder="mínimo 6 caracteres"
                value={registerData.password}
                hasError={!!errors.password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.register__error}>{errors.password}</Text>
              )}
            </View>
          </View>
          <ErrorBanner
            message={errorBanner.message}
            visible={errorBanner.visible}
            onHide={() => setErrorBanner({ visible: false, message: "" })}
          />
          <Button
            onPress={handleRegister}
            variant="primary"
            disabled={loading}
            icon={<Feather name="arrow-right" size={14} color="white" />}
          >
            {loading ? "Cargando..." : "Regístrate"}
          </Button>

          <View style={styles.register__footer}>
            <Text style={styles.register__footer_text}>
              ¿Ya tenés una cuenta?{" "}
              <Text
                style={styles.register__footer_link}
                onPress={() => navigation.navigate("Login")}
              >
                Inicia sesión
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
