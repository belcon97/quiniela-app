import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./ProfileBadges.styles";

interface ProfileBadgesProps {
  wildcardAvailable: boolean;
  topScorerName: string | null;
}

export function ProfileBadges({ wildcardAvailable, topScorerName }: ProfileBadgesProps) {
  return (
    <View style={styles.profileBadges}>

      {/* Comodin */}
      {wildcardAvailable && (
        <View style={styles.profileBadges__wildcard}>
          <MaterialIcons name="auto-awesome" size={14} color={colors.secondary} />
          <Text style={styles.profileBadges__wildcardText}>COMODÍN DISPONIBLE</Text>
        </View>
      )}

      {/* Goleador */}
      {topScorerName && (
        <View style={styles.profileBadges__scorer}>
          <Text style={styles.profileBadges__scorerLabel}>TU GOLEADOR:</Text>
          <Text style={styles.profileBadges__scorerName}>{topScorerName}</Text>
        </View>
      )}

    </View>
  );
}