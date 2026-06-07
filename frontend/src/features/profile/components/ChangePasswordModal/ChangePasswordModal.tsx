import { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { useAuthStore } from "@/store/authStore";
// Components
import { Input } from "@/shared/ui/Input/Input";
// Services
import { profileService } from "@/features/profile/services/profileService";
// Styles
import { makeStyles } from "./ChangePasswordModal.styles";

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  visible,
  onClose,
}: ChangePasswordModalProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const token = useAuthStore((state) => state.token);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    onClose();
  };

  const validate = (): boolean => {
    if (!currentPassword.trim()) {
      setError("Ingresá tu contraseña actual");
      return false;
    }
    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!token) return;
    setError("");
    setSuccess("");
    if (!validate()) return;

    try {
      setSaving(true);
      await profileService.changePassword(token, currentPassword, newPassword);
      setSuccess("Contraseña actualizada correctamente");
      setTimeout(() => handleClose(), 1500);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <BlurView
        intensity={20}
        tint={theme.isDark ? "dark" : "light"}
        style={StyleSheet.absoluteFillObject}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>CAMBIAR{"\n"}CONTRASEÑA</Text>
              <Pressable onPress={handleClose} style={styles.closeBtn}>
                <Feather name="x" size={22} color={theme.textSecondary} />
              </Pressable>
            </View>

            {/* Fields */}
            <View style={styles.fields}>
              <Input
                label="CONTRASEÑA ACTUAL"
                placeholder="••••••"
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                  setError("");
                }}
                secureTextEntry
                icon={
                  <Feather name="lock" size={18} color={theme.textSecondary} />
                }
              />
              <Input
                label="NUEVA CONTRASEÑA"
                placeholder="••••••"
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setError("");
                }}
                secureTextEntry
                icon={
                  <Feather name="lock" size={18} color={theme.textSecondary} />
                }
              />
              <Input
                label="REPETIR CONTRASEÑA"
                placeholder="••••••"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError("");
                }}
                secureTextEntry
                icon={
                  <Feather name="lock" size={18} color={theme.textSecondary} />
                }
              />
            </View>

            {/* Feedback */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            {/* Footer */}
            <View style={styles.footer}>
              <Pressable style={styles.cancelBtn} onPress={handleClose}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </Pressable>
              <Pressable
                style={[styles.saveBtn, saving && styles.saveBtn_disabled]}
                onPress={handleSave}
                disabled={saving}
              >
                <Feather name="check" size={16} color="#FFFFFF" />
                <Text style={styles.saveText}>
                  {saving ? "GUARDANDO..." : "GUARDAR"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
}
