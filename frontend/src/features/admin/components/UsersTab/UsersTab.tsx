import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

// Components
import {ErrorBanner} from "@/ui/ErrorBanner/ErrorBanner";

// Hooks
import { useUsers } from "@/features/admin/hooks/useUsers";
import type { AdminUser } from "@/features/admin/services/adminUserService";

// Styles
import { styles } from "./UsersTab.styles";
import { colors } from "@/styles/theme";

export function UsersTab() {
  const {
    users,
    loading,
    deleting,
    deleteError,
    deleteSuccess,
    fetchUsers,
    handleDelete,
    clearDeleteError,
    clearDeleteSuccess,
  } = useUsers();

  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

  // Fetch al montar
  const [fetched, setFetched] = useState(false);
  if (!fetched) {
    fetchUsers();
    setFetched(true);
  }

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    await handleDelete(deletingUser.id);
    setDeletingUser(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {deleteSuccess ? (
          <View style={styles.successBanner}>
            <Feather name="check-circle" size={16} color={colors.secondary} />
            <Text style={styles.successBanner__text}>{deleteSuccess}</Text>
          </View>
        ) : null}

        <ErrorBanner
          message={deleteError}
          visible={!!deleteError}
          onHide={clearDeleteError}
        />

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : users.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="users" size={40} color={colors.neutral400} />
            <Text style={styles.emptyText}>No hay usuarios registrados</Text>
          </View>
        ) : (
          users.map((user) => (
            <View key={user.id} style={styles.card}>
              <View style={styles.card__info}>
                <View style={styles.avatar}>
                  <Text style={styles.avatar__text}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.card__text}>
                  <Text style={styles.card__name}>{user.name}</Text>
                  <Text style={styles.card__username}>@{user.username}</Text>
                </View>
                <View style={[
                  styles.badge,
                  user.role === "admin" ? styles.badge__admin : styles.badge__user
                ]}>
                  <Text style={[
                    styles.badge__text,
                    user.role === "admin" ? styles.badge__text_admin : styles.badge__text_user
                  ]}>
                    {user.role}
                  </Text>
                </View>
              </View>

              <View style={styles.card__meta}>
                <View style={styles.meta}>
                  <Feather name="star" size={12} color={colors.textMuted} />
                  <Text style={styles.meta__text}>
                    {user.favoriteTeam ?? "Sin equipo favorito"}
                  </Text>
                </View>
                <View style={styles.meta}>
                  <Feather
                    name={user.hasReadRules ? "check-circle" : "circle"}
                    size={12}
                    color={user.hasReadRules ? colors.secondary : colors.textMuted}
                  />
                  <Text style={styles.meta__text}>
                    {user.hasReadRules ? "Leyó las reglas" : "No leyó las reglas"}
                  </Text>
                </View>
              </View>

              {user.role !== "admin" && (
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => setDeletingUser(user)}
                >
                  <Feather name="trash-2" size={14} color={colors.error} />
                  <Text style={styles.deleteBtn__text}>Eliminar usuario</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal confirmar eliminar */}
      <Modal
        visible={!!deletingUser}
        transparent
        animationType="fade"
        onRequestClose={() => setDeletingUser(null)}
      >
        <View style={styles.modal__overlay}>
          <View style={styles.modal}>
            <Text style={styles.modal__title}>Eliminar usuario</Text>
            <Text style={styles.modal__subtitle}>
              ¿Confirmás que querés eliminar a{" "}
              <Text style={{ fontFamily: "Inter_600SemiBold" }}>
                {deletingUser?.name}
              </Text>
              ? Esta acción no se puede deshacer.
            </Text>

            <View style={styles.modal__actions}>
              <TouchableOpacity
                style={styles.modal__cancelBtn}
                onPress={() => setDeletingUser(null)}
              >
                <Text style={styles.modal__cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modal__deleteBtn, deleting && { opacity: 0.6 }]}
                onPress={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color={colors.background} size="small" />
                ) : (
                  <Text style={styles.modal__deleteText}>Eliminar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}