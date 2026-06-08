import { View, Text } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Badge } from "@/shared/ui/Badge/Badge";
// Utils
import { formatMatchDate } from "@/shared/utils/formatDate";
// Styles
import { makeStyles } from "./MatchHistoryCard.styles";
// Types
import type { BadgeVariant } from "@/shared/types";
import type { Prediction } from "@/features/profile/types/profile.types";

interface MatchHistoryCardProps {
  prediction: Prediction;
  badge: BadgeVariant;
}

export function MatchHistoryCard({ prediction, badge }: MatchHistoryCardProps) {
  const styles = useStyles(makeStyles);
  const { match } = prediction;

  const borderStyle =
    badge === "win"
      ? prediction.isWildcard
        ? styles.card_wildcardWin
        : styles.card_win
      : badge === "partial"
        ? prediction.isWildcard
          ? styles.card_wildcardPartial
          : styles.card_partial
        : badge === "soon"
          ? styles.card_soon
          : badge === "loss"
            ? styles.card_loss
            : null;

  const badgeVariant: BadgeVariant =
    (badge === "win" || badge === "partial") && prediction.isWildcard
      ? "wildcard"
      : badge;

  const badgeLabel =
    badge === "win"
      ? prediction.isWildcard
        ? "+6 PTS"
        : "+3 PTS"
      : badge === "partial"
        ? prediction.isWildcard
          ? "+2 PTS"
          : "+1 PT"
        : badge === "loss"
          ? "0 PTS"
          : badge === "soon"
            ? "PRONTO"
            : "FINAL";

  const predScore = `${prediction.homeScore}-${prediction.awayScore}`;
  const finalScore =
    match.homeScore !== null && match.awayScore !== null
      ? `${match.homeScore}-${match.awayScore}`
      : null;

  return (
    <View style={[styles.card, borderStyle]}>
      {/* Flags */}
      <View style={styles.flags}>
        <View style={styles.flag1}>
          <Flag uri={match.homeFlag} name={match.homeTeam} size="sm" />
        </View>
        <View style={styles.flag2}>
          <Flag uri={match.awayFlag} name={match.awayTeam} size="sm" />
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.teams}>
          {match.homeTeam} VS {match.awayTeam}
        </Text>
        <Text style={styles.meta}>
          Pred: {predScore} · {finalScore ? `Final: ${finalScore}` : "Pronto"} ·{" "}
          {formatMatchDate(match.date)}
        </Text>
        {prediction.isWildcard && (
          <Text style={styles.wildcardLabel}>×2 COMODÍN</Text>
        )}
      </View>

      {/* Badge */}
      <Badge variant={badgeVariant}>{badgeLabel}</Badge>
    </View>
  );
}
