import { useState } from "react";
import { View, ScrollView } from "react-native";
// Hooks
import { useAuthStore } from "@/store/authStore";
import { useStandings } from "@/features/standings/hooks/useStandings";
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Layout } from "@/layout/Layout";
import { TabSwitch } from "@/shared/ui/TabSwitch/TabSwitch";
import { StandingGroup } from "@/features/standings/components/StandingGroup/StandingGroup";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { StateView } from "@/shared/ui/StateView/StateView";
// Utils
import { groupByKey } from "@/shared/utils/groupByKey";
import { calculateStandings } from "@/shared/utils/calculateStandings";
import { sortGroups } from "@/shared/utils/sortGroups";
// Styles
import { makeStyles } from "./Standings.styles";
// Types
import type { GroupStanding } from "@/features/standings/types/standing.types";

const TABS = ["FASE DE GRUPOS", "ELIMINATORIA"];

const GROUP_PHASES = [
  "Grupo A",
  "Grupo B",
  "Grupo C",
  "Grupo D",
  "Grupo E",
  "Grupo F",
  "Grupo G",
  "Grupo H",
  "Grupo I",
  "Grupo J",
  "Grupo K",
  "Grupo L",
];

const KNOCKOUT_PHASES = [
  "Dieciseisavos",
  "Octavos",
  "Cuartos",
  "Semifinal",
  "Final",
];

export function Standings() {
  const styles = useStyles(makeStyles);
  const user = useAuthStore((state) => state.user);
  const { matches, loading, error } = useStandings();

  const [activeTab, setActiveTab] = useState(0);

  const grouped = groupByKey(matches, "group");

  // Fase de grupos
  const groupPhases: GroupStanding[] = sortGroups(
    Object.keys(grouped).filter((g) => GROUP_PHASES.includes(g)),
  ).map((groupName) => ({
    group: groupName,
    matches: grouped[groupName],
    teams: calculateStandings(grouped[groupName]),
  }));

  // Eliminatoria
  const knockoutPhases: GroupStanding[] = sortGroups(
    Object.keys(grouped).filter((g) => KNOCKOUT_PHASES.includes(g)),
  ).map((groupName) => ({
    group: groupName,
    matches: grouped[groupName],
    teams: calculateStandings(grouped[groupName]),
  }));

  const activePhases = activeTab === 0 ? groupPhases : knockoutPhases;

  return (
    <Layout>
      {/* Loading */}
      {loading && <LoadingState />}

      {/* Error */}
      {!loading && error && (
        <StateView icon="wifi-off" title="ERROR" message={error} />
      )}

      {/* Content */}
      {!loading && !error && (
        <View style={styles.screen}>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TabSwitch
              options={TABS}
              activeIndex={activeTab}
              onChange={setActiveTab}
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {activePhases.length === 0 && (
              <StateView icon="calendar" title="SIN PARTIDOS" />
            )}

            {activePhases.map((group) => (
              <StandingGroup
                key={group.group}
                group={group}
                favoriteTeam={user?.favoriteTeam}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </Layout>
  );
}
