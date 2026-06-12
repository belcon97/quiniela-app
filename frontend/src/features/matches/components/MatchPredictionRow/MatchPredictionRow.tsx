import { View, Text, Pressable } from "react-native";
// Navigation
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Badge } from "@/shared/ui/Badge/Badge";
// Utils
import { getFlagByTeam } from "@/shared/utils/getFlagByTeam";
import { getBadgeFromPoints } from "@/shared/utils/getBadgeFromPoints";
// Styles
import { makeStyles } from "./MatchPredictionRow.styles";
// Types
import type { BadgeVariant } from "@/shared/types";
import type { MatchPredictionEntry } from "../../types/matches.types";

interface MatchPredictionRowProps {
  entry: MatchPredictionEntry;
  isMe?: boolean;
}

export function MatchPredictionRow({ entry, isMe }: MatchPredictionRowProps) {
  const styles = useStyles(makeStyles);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const flagUrl = getFlagByTeam(entry.favoriteTeam);
  const badge = getBadgeFromPoints(entry.points);

  // Variant morado si comodín ganó/parcial
  const badgeVariant: BadgeVariant =
    (badge === "win" || badge === "partial") && entry.isWildcard
      ? "wildcard"
      : badge;

  const badgeLabel =
    badge === "win"
      ? entry.isWildcard
        ? "+6 PTS"
        : "+3 PTS"
      : badge === "partial"
        ? entry.isWildcard
          ? "+2 PTS"
          : "+1 PT"
        : badge === "loss"
          ? "0 PTS"
          : badge === "soon"
            ? "PRONTO"
            : "FINAL";

  return (
    <Pressable
      style={[styles.row, isMe && styles.row_me]}
      onPress={() =>
        navigation.navigate("ProfileDetail", { username: entry.username })
      }
    >
      {/* Flag o Avatar */}
      {flagUrl ? (
        <Flag uri={flagUrl} name={entry.name} size="sm" />
      ) : (
        <Avatar name={entry.name} size="sm" />
      )}

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, isMe && styles.name_me]}>
            {entry.name}
          </Text>
          {isMe && (
            <View style={styles.badge_me}>
              <Text style={styles.badge_meText}>TU</Text>
            </View>
          )}
          {entry.isWildcard && (
            <View style={styles.badge_wildcard}>
              <Text style={styles.badge_wildcardText}>×2</Text>
            </View>
          )}
        </View>
        <Text style={styles.username}>@{entry.username}</Text>
      </View>

      {/* Score */}
      <Text style={styles.score}>
        {entry.homeScore}-{entry.awayScore}
      </Text>

      {/* Badge */}
      <Badge variant={badgeVariant}>{badgeLabel}</Badge>
    </Pressable>
  );
}