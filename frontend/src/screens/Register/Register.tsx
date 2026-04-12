import { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styles } from "./Register.styles";

// Components
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

// Services
import { authService } from "../../features/auth/services/authService";

// Store
import { useAuthStore } from "../../store/authStore";

// Types
import type { RegisterRequest } from "../../features/auth/types/auth.types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "../../navigation/navigation.types";

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

  const validateForm = () => {
    if (!registerData.name.trim()) {
      setErrors({ ...errors, name: "El nombre es obligatorio*" });
      return false;
    }
    if (!registerData.username.trim()) {
      setErrors({
        ...errors,
        username: "El nombre de usuario es obligatorio*",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setErrors({ ...errors, email: "El email no es válido*" });
      return false;
    }
    if (registerData.password.length < 6) {
      setErrors({
        ...errors,
        password: "La contraseña debe tener al menos 6 caracteres*",
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authService.register(registerData);

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
