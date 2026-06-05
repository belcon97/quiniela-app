import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Button } from "@/shared/ui/Button/Button";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
// Styles
import { makeStyles } from "./UserCard.styles";

interface User {
  id: string;
  name: string;
  username: string;
  role: "user" | "admin";
  favoriteTeam: string | null;
  hasReadRules: boolean;
}

interface UserCardProps {
  user: User;
  onDelete: () => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  const isAdmin = user.role === "admin";
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      {/* Top */}
      <View style={styles.top}>
        {/* Avatar */}
        <Avatar name={user.name} size="md" />

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>

        {/* Role badge */}
        <View style={[styles.badge, isAdmin && styles.badge_admin]}>
          <Text style={[styles.badgeText, isAdmin && styles.badgeText_admin]}>
            {isAdmin ? "ADMIN" : "USER"}
          </Text>
        </View>
      </View>

      {/* Meta */}
      <View style={styles.meta}>
        {/* Fav */}
        <View style={styles.metaRow}>
          <Feather
            name="star"
            size={14}
            color={user.favoriteTeam ? theme.secondary : theme.textSecondary}
          />
          <Text
            style={[
              styles.metaText,
              user.favoriteTeam && styles.metaText_active,
            ]}
          >
            {user.favoriteTeam ?? "Sin equipo favorito"}
          </Text>
        </View>

        {/* Rules */}
        <View style={styles.metaRow}>
          <Feather
            name={user.hasReadRules ? "check-circle" : "circle"}
            size={14}
            color={user.hasReadRules ? theme.secondary : theme.textSecondary}
          />
          <Text
            style={[
              styles.metaText,
              user.hasReadRules && styles.metaText_active,
            ]}
          >
            {user.hasReadRules ? "Leyó las reglas" : "No leyó las reglas"}
          </Text>
        </View>
      </View>

      {/* Delete */}
      {!isAdmin && (
        <Button
          variant="danger"
          icon={<Feather name="trash-2" size={16} color="#fff" />}
          onPress={onDelete}
        >
          Eliminar usuario
        </Button>
      )}
    </View>
  );
}
