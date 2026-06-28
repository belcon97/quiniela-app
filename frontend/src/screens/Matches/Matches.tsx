import { useState, Fragment } from "react";
import { View, ScrollView, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useAuthStore } from "@/store/authStore";
import { usePredictionStore } from "@/store/predictionStore";
import { useMatches } from "@/features/matches/hooks/useMatches";
import { useMatchPredictions } from "@/features/matches/hooks/useMatchPredictions";
// Components
import { Layout } from "@/layout/Layout";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { StateView } from "@/shared/ui/StateView/StateView";
import { MatchCard } from "@/features/matches/components/MatchCard/MatchCard";
import { MatchFilters } from "@/features/matches/components/MatchFilters/MatchFilters";
import { MatchPredictionRow } from "@/features/matches/components/MatchPredictionRow/MatchPredictionRow";
import { DateGroupLabel } from "@/features/profile/components/DateGroupLabel/DateGroupLabel";
// Utils
import { sortGroups } from "@/shared/utils/sortGroups";
import { groupByDate } from "@/shared/utils/groupByDate";
// Styles
import { makeStyles } from "./Matches.styles";
// Types
import type { MatchFilter } from "@/features/matches/types/matches.types";

export function Matches() {
  const styles = useStyles(makeStyles);
  const myUsername = useAuthStore((state) => state.user?.username);
  const myPredictions = usePredictionStore((state) => state.myPredictions);
  const { matches, loading, error } = useMatches();
  const {
    data: predictionsData,
    loading: predictionsLoading,
    fetchPredictions,
  } = useMatchPredictions();

  const [activeFilter, setActiveFilter] = useState<MatchFilter>("TODOS");
  const [selectedGroup, setSelectedGroup] = useState("TODOS");
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const filteredByStatus = matches.filter((match) => {
    if (activeFilter === "POR JUGAR") return match.status === "pending";
    if (activeFilter === "JUGADOS") return match.status === "completed";
    return true;
  });

  const filteredMatches = filteredByStatus.filter(
    (match) => selectedGroup === "TODOS" || match.group === selectedGroup,
  );

  const matchesByDate = groupByDate(filteredMatches);

  const groups = sortGroups(
    [...new Set(matches.map((m) => m.group))].filter(Boolean),
  );

  const handleExpand = (matchId: string) => {
    if (expandedMatch === matchId) {
      setExpandedMatch(null);
      return;
    }
    setExpandedMatch(matchId);
    fetchPredictions(matchId);
  };

  return (
    <Layout>
      {loading && <LoadingState />}
      {!loading && error && (
        <StateView icon="wifi-off" title="ERROR" message={error} />
      )}

      {!loading && !error && (
        <View style={styles.screen}>
          {/* Filtros */}
          <MatchFilters
            activeFilter={activeFilter}
            selectedGroup={selectedGroup}
            groups={groups}
            onFilterChange={(filter) => {
              setActiveFilter(filter);
              setExpandedMatch(null);
            }}
            onGroupChange={setSelectedGroup}
          />

          {/* Lista */}
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredMatches.length === 0 && (
              <StateView icon="calendar" title="SIN PARTIDOS" />
            )}

            {matchesByDate.map(({ date, matches: dayMatches }) => (
              <Fragment key={date}>
                <DateGroupLabel date={date} count={dayMatches.length} />

                {dayMatches.map((match) => {
                  const isExpanded = expandedMatch === match.id;
                  const matchData = predictionsData[match.id];
                  const isLoadingPredictions = predictionsLoading[match.id];
                  const userPrediction =
                    myPredictions.find((p) => p.matchId === match.id) ?? null;
                  const matchStarted =
                    new Date(match.date).getTime() <= Date.now();
                  return (
                    <MatchCard
                      key={match.id}
                      match={match}
                      userPrediction={userPrediction}
                      isExpanded={isExpanded}
                      onExpand={handleExpand}
                    >
                      {isLoadingPredictions && <LoadingState />}

                      {!isLoadingPredictions && matchData && !matchStarted && (
                        <View style={styles.locked}>
                          <Feather name="lock" size={20} color="#9AA1AD" />
                          <Text style={styles.lockedText}>
                            Vas a poder ver las predicciones de los demás cuando
                            empiece el partido.
                          </Text>
                        </View>
                      )}

                      {!isLoadingPredictions &&
                        matchData &&
                        matchStarted &&
                        matchData.predictions.length === 0 && (
                          <View style={styles.locked}>
                            <Text style={styles.lockedText}>
                              Nadie predijo este partido.
                            </Text>
                          </View>
                        )}

                      {!isLoadingPredictions &&
                        matchData &&
                        matchStarted &&
                        matchData.predictions.map((entry) => (
                          <MatchPredictionRow
                            key={entry.username}
                            entry={entry}
                            isMe={entry.username === myUsername}
                          />
                        ))}
                    </MatchCard>
                  );
                })}
              </Fragment>
            ))}
          </ScrollView>
        </View>
      )}
    </Layout>
  );
}
