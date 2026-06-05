import {
  View,
  Text,
  ImageBackground,
  type ImageSourcePropType,
} from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
// Styles
import { makeStyles } from "./ProfileHeader.styles";

interface ProfileHeaderProps {
  name: string;
  username: string;
  role: "user" | "admin";
  favoriteTeam: string | null;
  flagUrl: string;
  banner: ImageSourcePropType;
  wildcardAvailable: boolean;
  totalPoints: number;
  position: number;
}

export function ProfileHeader({
  name,
  username,
  role,
  favoriteTeam,
  flagUrl,
  banner,
  wildcardAvailable,
  totalPoints,
  position,
}: ProfileHeaderProps) {
  const styles = useStyles(makeStyles);

  return (
    <ImageBackground
      source={banner}
      style={styles.container}
      imageStyle={styles.bg}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        {/* User row */}
        <View style={styles.userRow}>
          {/* Flag o Avatar */}
          {favoriteTeam && flagUrl ? (
            <Flag uri={flagUrl} name={favoriteTeam} size="lg" />
          ) : (
            <Avatar name={name} size="lg" />
          )}

          {/* Info */}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{username}</Text>
          </View>
        </View>

        {/* Wildcard badge */}
        <View
          style={[
            styles.wildcard,
            wildcardAvailable
              ? styles.wildcard_active
              : styles.wildcard_inactive,
          ]}
        >
          <Text style={styles.wildcardBadge}>×2</Text>
          <Text style={styles.wildcardLabel}>COMODÍN</Text>
          <Text style={styles.wildcardStatus}>
            {wildcardAvailable ? "ACTIVO" : "INACTIVO"}
          </Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {/* Puntos */}
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Puntos</Text>
            <Text style={styles.statValue}>{totalPoints}</Text>
          </View>

          {/* Ranking */}
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Ranking General</Text>
            <Text style={[styles.statValue, styles.statValue_ranking]}>
              #{position}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
