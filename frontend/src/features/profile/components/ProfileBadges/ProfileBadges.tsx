import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./ProfileBadges.styles";
interface ProfileBadgesProps {
  wildcardAvailable: boolean;
  topScorerName: string | null;
  isOwner?: boolean; // true = perfil propio, false = perfil ajeno
}

export function ProfileBadges({ wildcardAvailable, topScorerName, isOwner = true }: ProfileBadgesProps) {
  return (
    <View style={styles.profileBadges}>

      {/* Comodín disponible */}
      {wildcardAvailable && (
        <View style={styles.profileBadges__wildcard}>
          <MaterialIcons name="auto-awesome" size={14} color={colors.secondary} />
          <Text style={styles.profileBadges__wildcardText}>COMODÍN DISPONIBLE</Text>
        </View>
      )}

      {/* Comodín ya usado — solo visible en perfil ajeno */}
      {!wildcardAvailable && !isOwner && (
        <View style={styles.profileBadges__wildcardUsed}>
          <MaterialIcons name="auto-awesome" size={14} color={colors.textMuted} />
          <Text style={styles.profileBadges__wildcardUsedText}>COMODÍN USADO</Text>
        </View>
      )}

      {/* Goleador */}
      {topScorerName && (
        <View style={styles.profileBadges__scorer}>
          <Text style={styles.profileBadges__scorerLabel}>GOLEADOR:</Text>
          <Text style={styles.profileBadges__scorerName}>{topScorerName}</Text>
        </View>
      )}

    </View>
  );
}