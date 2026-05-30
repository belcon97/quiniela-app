import { ScrollView, ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Styles
import { styles } from "./Home.styles";
// Components
import { Layout } from "@/layout/Layout";
import { UpcomingMatches } from "@/features/home/components/UpcomingMatches/UpcomingMatches";
import { RankingList } from "@/features/home/components/RankingList/RankingList";
import { TopScorersList } from "@/features/home/components/TopScorersList/TopScorersList";
import { FavoriteTeamBanner } from "@/features/home/components/FavoriteTeamBanner/FavoriteTeamBanner";

// Hooks
import { useHome } from "@/features/home/hooks/useHome";
// Store
import { useAuthStore } from "@/store/authStore";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

export function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const { data, loading } = useHome();
  const user = useAuthStore((state) => state.user);

  // Detectar si tocas tu perfil o un usuario
  const handleUserPress = (username: string) => {
    if (username === user?.username) {
      navigation.navigate("Profile", undefined);
    } else {
      navigation.navigate("Profile", { username });
    }
  };
  
  const handleRankingPress = () => navigation.navigate("Ranking");

  if (loading) {
    return (
      <Layout>
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={styles.scrollView}>
        <UpcomingMatches matches={data?.upcomingMatches ?? []} />
  
        {data?.favoriteTeamMatch && user?.favoriteTeam && (
          <FavoriteTeamBanner
            match={data.favoriteTeamMatch}
            teamName={user.favoriteTeam}
          />
        )}
  
        <RankingList
          ranking={data?.fullRanking ?? []}
          myPosition={data?.myPosition ?? null}
          onUserPress={handleUserPress}
          onRankingPress={handleRankingPress}
        />
  
        <TopScorersList topScorers={data?.topScorers ?? []} />
      </ScrollView>
    </Layout>
  );
}
