import { ScrollView } from "react-native";
// Components
import { Layout } from "../../layout/Layout";
import { UpcomingMatches } from "../../features/home/components/UpcomingMatches/UpcomingMatches";
import { RankingList } from "../../features/home/components/RankingList/RankingList";

// Hooks
import { useHome } from "../../features/home/hooks/useHome";

export default function Home() {
  const { data, loading } = useHome();

  return (
    <Layout>
      <ScrollView style={{ flex: 1 }}>
        <UpcomingMatches
          matches={data?.upcomingMatches ?? []}
          loading={loading}
        />
        <RankingList
          ranking={data?.fullRanking ?? []}
          loading={loading}
          myPosition={data?.myPosition ?? null}
        />
      </ScrollView>
    </Layout>
  );
}
