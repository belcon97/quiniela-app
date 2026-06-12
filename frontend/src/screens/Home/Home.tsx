import { ScrollView } from "react-native";
// Navigation
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useAuthStore } from "@/store/authStore";
import { useHome } from "@/features/home/hooks/useHome";
// Components
import { Layout } from "@/layout/Layout";
import { UpcomingMatches } from "@/features/home/components/UpcomingMatches/UpcomingMatches";
import { FavoriteTeamCard } from "@/features/home/components/FavoriteTeamCard/FavoriteTeamCard";
import { RankingList } from "@/features/home/components/RankingList/RankingList";
import { TopScorersList } from "@/features/home/components/TopScorersList/TopScorersList";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { StateView } from "@/shared/ui/StateView/StateView";
// Utils
import { getTeamBanner, WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";
// Styles
import { makeStyles } from "./Home.styles";
// Types
import type {
  AppStackParams,
  MainStackParams,
} from "@/navigation/navigation.types";

export function Home() {
  const styles = useStyles(makeStyles);
  const mainNav = useNavigation<NativeStackNavigationProp<MainStackParams>>();
  const appNav = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const user = useAuthStore((state) => state.user);
  const { data, loading, error } = useHome();

  const favoriteTeam = user?.favoriteTeam ?? null;

  const country = WORLD_CUP_COUNTRIES.find(
    (c) => c.label.toLowerCase() === favoriteTeam?.toLowerCase(),
  );

  const banner = getTeamBanner(country?.value ?? "");

  const rival = data?.favoriteTeamMatch
    ? data.favoriteTeamMatch.homeTeam.toLowerCase() ===
      favoriteTeam?.toLowerCase()
      ? data.favoriteTeamMatch.awayTeam
      : data.favoriteTeamMatch.homeTeam
    : null;

  return (
    <Layout>
      {/* Loading */}
      {loading && <LoadingState />}

      {/* Error */}
      {!loading && error && (
        <StateView icon="wifi-off" title="ERROR" message={error} />
      )}

      {/* Content */}
      {!loading && !error && data && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
        {/* Favorite Team Card */}
        {favoriteTeam && data.favoriteTeamMatch && rival && (
          <FavoriteTeamCard
            favoriteTeam={favoriteTeam}
            flagUrl={country?.icon ?? ""}
            banner={banner}
            rival={rival}
            matchDate={data.favoriteTeamMatch.date}
          />
        )}
          {/* Upcoming Matches */}
          {data.upcomingMatches.length > 0 && (
            <UpcomingMatches matches={data.upcomingMatches} />
          )}


          {/* Ranking */}
          <RankingList
            ranking={data.fullRanking}
            myUsername={user?.username}
            onViewMore={() => mainNav.navigate("Ranking")}
            onRowPress={(username) => {
              if (username === user?.username) {
                mainNav.navigate("Profile");
              } else {
                appNav.navigate("ProfileDetail", { username });
              }
            }}
          />

          {/* Top Scorers */}
          <TopScorersList scorers={data.topScorers} />
        </ScrollView>
      )}
    </Layout>
  );
}
