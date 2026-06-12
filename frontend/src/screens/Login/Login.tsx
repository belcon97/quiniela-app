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
import { makeStyles } from "./Login.styles";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "@/navigation/navigation.types";
import type { LoginRequest } from "@/features/auth/types/auth.types";

const BG_IMAGE = require("../../../assets/images/teams/default.png");

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParams, "Login">;

export default function Login({
  navigation,
}: {
  navigation: LoginNavigationProp;
}) {
  const styles = useStyles(makeStyles);
  const saveLogin = useAuthStore((state) => state.saveLogin);

  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof LoginRequest) => (text: string) => {
    setForm((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const validate = (): boolean => {
    const newErrors = { username: "", password: "" };
    if (!form.username.trim()) newErrors.username = "El usuario es obligatorio";
    if (!form.password.trim())
      newErrors.password = "La contraseña es obligatoria";
    else if (form.password.length < 6)
      newErrors.password = "Mínimo 6 caracteres";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const response = await authService.login({
        username: form.username.trim(),
        password: form.password,
      });
      await saveLogin(response.token, response.user);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>INGRESÁ</Text>
            <Text style={styles.headerSubtitle}>
              Bienvenidos al Prode del Mundial 2026. Pronostica, suma puntos y
              gana.
            </Text>
          </View>
        </ImageBackground>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.fields}>
            <Input
              label="USUARIO"
              placeholder="tu_usuario"
              value={form.username}
              onChangeText={handleChange("username")}
              error={errors.username}
              autoCapitalize="none"
              icon={<Feather name="user" size={18} color="gray" />}
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
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            onPress={handleLogin}
            disabled={loading}
            icon={<Feather name="arrow-right" size={16} color="#fff" />}
            iconPosition="right"
          >
            {loading ? "CARGANDO..." : "ENTRAR"}
          </Button>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tenés cuenta?</Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.footerLink}>Crear cuenta</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
