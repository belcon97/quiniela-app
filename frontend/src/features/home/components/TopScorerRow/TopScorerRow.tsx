import { View, Text } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
// Utils
import { padNumber } from '@/shared/utils/padNumber'
// Types
import type { TopScorer } from "@/shared/types";
// Styles
import { makeStyles } from "./TopScorerRow.styles";

interface TopScorerRowProps {
  player: TopScorer;
  position: number;
}

export function TopScorerRow({ player, position }: TopScorerRowProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.row}>
      {/* Position */}
      <Text style={styles.position}>{padNumber(position)}
      </Text>

      {/* Flag */}
      <Flag uri={player.flag} name={player.team} size="sm" />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.team}>{player.team}</Text>
      </View>

      {/* Goals */}
      <View style={styles.goalsSection}>
        <Text style={styles.goals}>{player.goals}</Text>
        <Text style={styles.goalsLabel}>
          {player.goals === 1 ? "gol" : "goles"}
        </Text>
      </View>
    </View>
  );
}
