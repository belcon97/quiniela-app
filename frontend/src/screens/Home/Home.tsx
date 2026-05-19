import { ScrollView, TouchableOpacity, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/styles/theme";
import { styles } from "./Home.styles";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

// Components
import { Layout } from "@/layout/Layout";
import { UpcomingMatches } from "@/features/home/components/UpcomingMatches/UpcomingMatches";
import { RankingList } from "@/features/home/components/RankingList/RankingList";

// Hooks
import { useHome } from "@/features/home/hooks/useHome";

// Store
import { useAuthStore } from "@/store/authStore";

type HomeNavigationProp = NativeStackNavigationProp<AppStackParams, "Home">;

export default function Home({
  navigation,
}: {
  navigation: HomeNavigationProp;
}) {
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

  return (
    <Layout>
      <ScrollView style={{ flex: 1 }}>
        {data?.myPosition === null && !loading && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", undefined)}
            style={styles.home__banner}
          >
            <Feather name="zap" size={14} color={colors.secondary} />
            <Text style={styles.home__bannerText}>
              ¡Hacé tus predicciones para aparecer en el ranking!
            </Text>
          </TouchableOpacity>
        )}
        <UpcomingMatches
          matches={data?.upcomingMatches ?? []}
          loading={loading}
        />
        <RankingList
          ranking={data?.fullRanking ?? []}
          loading={loading}
          myPosition={data?.myPosition ?? null}
          onUserPress={handleUserPress}
          onRankingPress={() =>
            navigation.navigate("Ranking", {
              ranking: data?.fullRanking ?? [],
              myPosition: data?.myPosition ?? null,
            })
          }
        />
      </ScrollView>
    </Layout>
  );
}
