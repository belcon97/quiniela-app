import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./Standings.styles";
import { Layout } from "@/layout/Layout";
import { Tabs } from "@/ui/Tabs/Tabs";
import { useStandings } from "@/features/standings/hooks/useStandings";
import { GroupsTab } from "@/features/standings/components/GroupsTab/GroupsTab";
import { KnockoutTab } from "@/features/standings/components/KnockoutTab/KnockoutTab";

export function Standings() {
  const { groupStandings, knockoutPhases, loading } = useStandings();

  if (loading) {
    return (
      <Layout>
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      </Layout>
    );
  }

  const tabs = [
    { label: "Fase de grupos", content: <GroupsTab groupStandings={groupStandings} /> },
    { label: "Eliminatoria", content: <KnockoutTab knockoutPhases={knockoutPhases} /> },
  ];

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header__title}>Tabla de</Text>
          <Text style={styles.header__title}>Posiciones</Text>
          <Text style={styles.header__subtitle}>MUNDIAL 2026</Text>
        </View>
        <Tabs tabs={tabs} />
      </View>
    </Layout>
  );
}