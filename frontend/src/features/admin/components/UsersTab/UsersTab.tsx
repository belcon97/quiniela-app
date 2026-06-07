import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useUsers } from "@/features/admin/hooks/useUsers";
// Components
import { UserCard } from "@/features/admin/components/UserCard/UserCard";
import { StateView } from "@/shared/ui/StateView/StateView";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
// Styles
import { makeStyles } from "./UsersTab.styles";
// Types
import type { AdminUser } from "@/features/admin/types/admin.types";

export function UsersTab() {
  const styles = useStyles(makeStyles);
  const { users, loading, loaded, fetchUsers, handleDelete } = useUsers();

  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (!loaded) fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>USUARIOS REGISTRADOS</Text>
        <Text style={styles.headerCount}>{users.length} total</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && <LoadingState />}

        {!loading && users.length === 0 && (
          <StateView icon="users" title="SIN USUARIOS" />
        )}

        {!loading &&
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => setUserToDelete(user)}
            />
          ))}
      </ScrollView>

      {/* Confirm Delete */}
      {userToDelete && (
        <ConfirmModal
          visible={!!userToDelete}
          title="ELIMINAR USUARIO"
          subtitle={`¿Eliminás a @${userToDelete.username}?`}
          confirmLabel="ELIMINAR"
          onConfirm={async () => {
            await handleDelete(userToDelete.id);
            setUserToDelete(null);
          }}
          onClose={() => setUserToDelete(null)}
        />
      )}
    </View>
  );
}
