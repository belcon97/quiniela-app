import { ScrollView, Text, View } from "react-native";
// Components
import { Layout } from "../../layout/Layout";
import { UpcomingMatches } from "../../components/UpcomingMatches/UpcomingMatches";
import { RankingList } from "../../components/RankingList/RankingList";

// Hooks
import { useHome } from "./useHome";

export default function Home() {
  const { data, loading } = useHome();

  return (
    <Layout>
      <ScrollView style={{ flex: 1 }}>
        <UpcomingMatches
          matches={data?.upcomingMatches ?? []}
          loading={loading}
        />
        <View style={{ height: 250 }}>
          <Text>Home</Text>
        </View>
        <RankingList
          ranking={data?.fullRanking ?? []}
          loading={loading}
          myRanking={data?.myRanking}
        />
      </ScrollView>
    </Layout>
  );
}
