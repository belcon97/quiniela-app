import { ScrollView, View, Text, Image } from "react-native";
import { styles } from "./GroupsTab.styles";
import type { GroupStanding } from "@/features/standings/types/standings.types";

interface GroupsTabProps {
  groupStandings: GroupStanding[];
}

export function GroupsTab({ groupStandings }: GroupsTabProps) {
  if (groupStandings.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay partidos cargados aún</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {groupStandings.map((group) => (
        <View key={group.group} style={styles.group}>

          {/* Título del grupo */}
          <Text style={styles.group__title}>{group.group}</Text>

          {/* Cabecera de columnas */}
          <View style={styles.table__header}>
            <Text style={[styles.table__col, styles.table__col__team]}>Equipo</Text>
            <Text style={styles.table__col}>PJ</Text>
            <Text style={styles.table__col}>G</Text>
            <Text style={styles.table__col}>E</Text>
            <Text style={styles.table__col}>P</Text>
            <Text style={styles.table__col}>DG</Text>
            <Text style={[styles.table__col, styles.table__col__pts]}>Pts</Text>
          </View>

          {/* Filas de equipos */}
          {group.teams.map((team, index) => {
            const isQualified = index < 2;
            return (
              <View
                key={team.team}
                style={[
                  styles.table__row,
                  isQualified && styles.table__row__qualified,
                ]}
              >
                <View style={styles.table__teamCell}>
                  <Text style={styles.table__position}>{index + 1}</Text>
                  {team.flag ? (
                    <Image
                      source={{ uri: team.flag }}
                      style={styles.table__flag}
                      resizeMode="cover"
                    />
                  ) : null}
                  <Text style={styles.table__teamName} numberOfLines={1}>
                    {team.team}
                  </Text>
                </View>
                <Text style={styles.table__col}>{team.played}</Text>
                <Text style={styles.table__col}>{team.won}</Text>
                <Text style={styles.table__col}>{team.drawn}</Text>
                <Text style={styles.table__col}>{team.lost}</Text>
                <Text style={styles.table__col}>
                  {team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}
                </Text>
                <Text style={[styles.table__col, styles.table__col__pts, styles.table__pts]}>
                  {team.points}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}