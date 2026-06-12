import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Badge } from "@/shared/ui/Badge/Badge";
// Utils
import { formatMatchTime } from "@/shared/utils/formatDate";
import { getTeamCode } from "@/shared/utils/getTeamCode";
// Styles
import { makeStyles } from "./MatchCard.styles";
// Types
import type { Match } from "@/shared/types";
import type { Prediction } from "@/features/profile/types/profile.types";

interface MatchCardProps {
  match: Match;
  userPrediction: Prediction | null;
  isExpanded: boolean;
  onExpand: (matchId: string) => void;
  children?: React.ReactNode;
}

export function MatchCard({
  match,
  userPrediction,
  isExpanded,
  onExpand,
  children,
}: MatchCardProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  const isCompleted = match.status === "completed";
  const isWildcard = userPrediction?.isWildcard ?? false;

  const wildcardBorder = isWildcard ? styles.card_wildcard : null;

  const renderRight = () => {
    // Finalizado: muestra el grupo
    if (isCompleted) {
      return (
        <View style={styles.groupBadge}>
          <Text style={styles.groupBadgeText}>{match.group}</Text>
        </View>
      );
    }
    // Pendiente con predicción: TU PICK
    if (userPrediction) {
      return (
        <View style={styles.pickBadge}>
          <Text style={styles.pickBadgeText}>
            TU PICK {userPrediction.homeScore}-{userPrediction.awayScore}
          </Text>
        </View>
      );
    }
    // Pendiente sin predicción
    return <Badge variant="soon">PRONTO</Badge>;
  };

  return (
    <View style={[styles.card, wildcardBorder]}>
      <Pressable style={styles.header} onPress={() => onExpand(match.id)}>
        {/* Status */}
        <View style={styles.status}>
          {isCompleted ? (
            <>
              <Text style={styles.statusFinal}>Final</Text>
              <Text style={styles.statusFinalTime}>
                {formatMatchTime(match.date)}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.statusTime}>
                {formatMatchTime(match.date)}
              </Text>
              <Text style={styles.statusUnit}>HRS</Text>
            </>
          )}
        </View>

        {/* Teams */}
        <View style={styles.teams}>
          {/* Home */}
          <View style={styles.teamRow}>
            <Flag uri={match.homeFlag} name={match.homeTeam} size="sm" />
            <Text style={styles.teamName} numberOfLines={1}>
              {getTeamCode(match.homeTeam)}
            </Text>
            {isCompleted && (
              <Text style={styles.teamScore}>{match.homeScore}</Text>
            )}
          </View>

          {/* Away */}
          <View style={styles.teamRow}>
            <Flag uri={match.awayFlag} name={match.awayTeam} size="sm" />
            <Text style={styles.teamName} numberOfLines={1}>
              {getTeamCode(match.awayTeam)}
            </Text>
            {isCompleted && (
              <Text style={styles.teamScore}>{match.awayScore}</Text>
            )}
          </View>
        </View>

        {/* Right: grupo/pick + chevron */}
        <View style={styles.right}>
          {renderRight()}
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={18}
            color={theme.textSecondary}
          />
        </View>
      </Pressable>

      {/* Comodín */}
      {isWildcard && (
        <View style={styles.wildcardRow}>
          <Text style={styles.wildcardText}>×2 COMODÍN</Text>
        </View>
      )}

      {/* Predicciones expandidas */}
      {isExpanded && <View style={styles.expanded}>{children}</View>}
    </View>
  );
}