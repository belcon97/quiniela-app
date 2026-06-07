import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
// Services
import { authService } from "@/features/auth/services/authService";
// Store
import { useAuthStore } from "@/store/authStore";
// Styles
import { makeStyles } from "./Register.styles";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "@/navigation/navigation.types";
import type {
  RegisterForm,
  RegisterRequest,
} from "@/features/auth/types/auth.types";

const BG_IMAGE = require("../../../assets/images/teams/default.png");

type RegisterNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  "Register"
>;

export default function Register({
  navigation,
}: {
  navigation: RegisterNavigationProp;
}) {
  const styles = useStyles(makeStyles);
  const saveLogin = useAuthStore((state) => state.saveLogin);

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof RegisterForm) => (text: string) => {
    setForm((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const validate = (): boolean => {
    const newErrors = {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.username.trim()) newErrors.username = "El usuario es obligatorio";
    if (form.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== "");
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const response = await authService.register({
        name: form.name.trim(),
        username: form.username.trim(),
        password: form.password,
      } as RegisterRequest);
      await saveLogin(response.token, response.user, true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Platform.OS !== "web"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ImageBackground
          source={BG_IMAGE}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>CREÁ TU{"\n"}CUENTA</Text>
            <Text style={styles.headerSubtitle}>
              Armá tu liga en minutos. El Mundial se vive prediciendo.
            </Text>
          </View>
        </ImageBackground>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.fields}>
            <Input
              label="NOMBRE"
              placeholder="Tu nombre"
              value={form.name}
              onChangeText={handleChange("name")}
              error={errors.name}
              icon={<Feather name="user" size={18} color="gray" />}
            />
            <Input
              label="USUARIO"
              placeholder="tu_usuario"
              value={form.username}
              onChangeText={handleChange("username")}
              error={errors.username}
              autoCapitalize="none"
              icon={<Feather name="at-sign" size={18} color="gray" />}
            />
            <Input
              label="CONTRASEÑA"
              placeholder="••••••"
              value={form.password}
              onChangeText={handleChange("password")}
              error={errors.password}
              secureTextEntry
              icon={<Feather name="lock" size={18} color="gray" />}
            />
            <Input
              label="REPETIR CONTRASEÑA"
              placeholder="••••••"
              value={form.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              error={errors.confirmPassword}
              secureTextEntry
              icon={<Feather name="lock" size={18} color="gray" />}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            onPress={handleRegister}
            disabled={loading}
            icon={<Feather name="check" size={16} color="#fff" />}
            iconPosition="right"
          >
            {loading ? "CARGANDO..." : "CREAR CUENTA"}
          </Button>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tenés cuenta?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerLink}>Ingresá</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
