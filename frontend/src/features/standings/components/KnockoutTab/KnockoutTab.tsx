import { ScrollView, View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./KnockoutTab.styles";
import { formatDate } from "@/utils/formatDate";
import { colors } from "@/styles/theme";
import type { KnockoutPhase } from "@/features/standings/types/standings.types";

interface KnockoutTabProps {
  knockoutPhases: KnockoutPhase[];
}

export function KnockoutTab({ knockoutPhases }: KnockoutTabProps) {
  if (knockoutPhases.length === 0) {
    return (
      <View style={styles.empty}>
        <MaterialIcons name="sports-soccer" size={40} color={colors.neutral400} />
        <Text style={styles.emptyText}>La fase eliminatoria aún no comenzó</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {knockoutPhases.map((phase) => (
        <View key={phase.phase} style={styles.phase}>

          {/* Título de la fase */}
          <Text style={styles.phase__title}>{phase.phase}</Text>

          {/* Partidos */}
          <View style={styles.phase__matches}>
            {phase.matches.map((match) => {
              const isCompleted = match.status === "completed";
              return (
                <View key={match.id} style={styles.card}>

                  {/* Meta — fecha y estadio */}
                  <View style={styles.card__meta}>
                    <Text style={styles.card__metaText}>
                      {formatDate(match.date)}
                    </Text>
                    <Text style={styles.card__metaText}>· {match.stadium}</Text>
                  </View>

                  {/* Equipo local */}
                  <View style={[
                    styles.card__team,
                    isCompleted && match.homeScore! > match.awayScore! && styles.card__team__winner
                  ]}>
                    <View style={styles.card__teamInfo}>
                      {match.homeFlag ? (
                        <Image
                          source={{ uri: match.homeFlag }}
                          style={styles.card__flag}
                          resizeMode="cover"
                        />
                      ) : null}
                      <Text style={styles.card__teamName}>{match.homeTeam}</Text>
                    </View>
                    {isCompleted && (
                      <Text style={[
                        styles.card__score,
                        match.homeScore! > match.awayScore! && styles.card__score__winner,
                      ]}>
                        {match.homeScore}
                      </Text>
                    )}
                  </View>

                  {/* Equipo visitante */}
                  <View style={[
                    styles.card__team,
                    isCompleted && match.awayScore! > match.homeScore! && styles.card__team__winner
                  ]}>
                    <View style={styles.card__teamInfo}>
                      {match.awayFlag ? (
                        <Image
                          source={{ uri: match.awayFlag }}
                          style={styles.card__flag}
                          resizeMode="cover"
                        />
                      ) : null}
                      <Text style={styles.card__teamName}>{match.awayTeam}</Text>
                    </View>
                    {isCompleted && (
                      <Text style={[
                        styles.card__score,
                        match.awayScore! > match.homeScore! && styles.card__score__winner,
                      ]}>
                        {match.awayScore}
                      </Text>
                    )}
                  </View>

                  {/* Pendiente */}
                  {!isCompleted && (
                    <View style={styles.card__pending}>
                      <Text style={styles.card__pendingText}>Pendiente</Text>
                    </View>
                  )}

                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}