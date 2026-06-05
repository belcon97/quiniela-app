import { View, Text } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { StandingRow } from "@/features/standings/components/StandingRow/StandingRow";
// Types
import type { GroupStanding } from "@/features/standings/types/standing.types";
// Styles
import { makeStyles } from "./StandingGroup.styles";

interface StandingGroupProps {
  group: GroupStanding;
  favoriteTeam?: string | null;
  qualifiers?: number;
}

export function StandingGroup({ group, favoriteTeam, qualifiers = 2 }: StandingGroupProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.groupName}>{group.group}</Text>
        <View style={styles.classify}>
          <View style={styles.classifyDot} />
          <Text style={styles.classifyText}>
  CLASIFICAN {qualifiers}
</Text>
        </View>
      </View>

      {/* Column headers */}
      <View style={styles.colHeaders}>
        <Text style={styles.colTeam}>EQUIPO</Text>
        <View style={styles.colStats}>
          <Text style={styles.col}>PJ</Text>
          <Text style={styles.col}>G</Text>
          <Text style={styles.col}>E</Text>
          <Text style={styles.col}>P</Text>
          <Text style={styles.col}>DG</Text>
          <Text style={[styles.col, styles.col_pts]}>PTS</Text>
        </View>
      </View>

      {/* Rows */}
      <View style={styles.rows}>
        {group.teams.map((team, index) => (
          <StandingRow
            key={team.teamName}
            standing={team}
            position={index + 1}
            isFavorite={
              !!favoriteTeam &&
              team.teamName.toLowerCase() === favoriteTeam.toLowerCase()
            }
          />
        ))}
      </View>
    </View>
  );
}
