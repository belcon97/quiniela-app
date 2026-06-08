import {
  View,
  Text,
  ImageBackground,
  type ImageSourcePropType,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
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
  position: number | null;
  topScorerName: string | null;
}

export function ProfileHeader({
  name,
  username,
  favoriteTeam,
  flagUrl,
  banner,
  wildcardAvailable,
  totalPoints,
  position,
  topScorerName,
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
          {favoriteTeam && flagUrl ? (
            <Flag uri={flagUrl} name={favoriteTeam} size="lg" />
          ) : (
            <Avatar name={name} size="lg" />
          )}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{username}</Text>
          </View>
        </View>

        {/* Badges row */}
        <View style={styles.badges}>

          {/* Wildcard */}
          <View
            style={[
              styles.badge,
              wildcardAvailable ? styles.badge_active : styles.badge_inactive,
            ]}
          >
            <Text style={styles.badgeLabel}>COMODÍN:</Text>
            <Text style={styles.badgeStatus}>
              {wildcardAvailable ? "ACTIVO" : "INACTIVO"}
            </Text>
          </View>

          {/* Goleador */}
          <View
            style={[
              styles.badge,
              topScorerName ? styles.badge_active : styles.badge_inactive,
            ]}
          >
            <Text style={styles.badgeLabel}>GOLEADOR:</Text>
            <Text style={styles.badgeStatus} numberOfLines={1}>
              {topScorerName ?? "SIN ELEGIR"}
            </Text>
          </View>

        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Puntos</Text>
            <Text style={styles.statValue}>{totalPoints}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Ranking General</Text>
            <Text style={[styles.statValue, styles.statValue_ranking]}>
              {position !== null ? `#${position}` : "—"}
            </Text>
          </View>
        </View>

      </View>
    </ImageBackground>
  );
}