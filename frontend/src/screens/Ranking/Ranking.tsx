import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./Ranking.styles";
// Components
import { Layout } from "@/layout/Layout";
import { RankingHeroCard } from "@/ui/RankingHeroCard/RankingHeroCard";
import { RankingRow } from "@/ui/RankingRow/RankingRow";
// Hooks
import { useRanking } from "@/features/ranking/hooks/useRanking";
// Store
import { useAuthStore } from "@/store/authStore";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";
import type { RankingEntry } from "@/features/home/types/home.types";

export function Ranking() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const { ranking, myPosition, loading } = useRanking();
  const user = useAuthStore((state) => state.user);

  const containerStyle = [styles.ranking, { paddingTop: insets.top }];

  const handleUserPress = (username: string) => {
    if (username === user?.username) {
      navigation.navigate("Profile", undefined);
    } else {
      navigation.navigate("Profile", { username });
    }
  };

  if (loading) {
    return (
      <View style={styles.ranking__loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const first = ranking[0];
  const rest = ranking.slice(1);

  return (
    <Layout>
      
    <View style={containerStyle}>

      <FlatList
        data={rest}
        keyExtractor={(item) => item.username}
        contentContainerStyle={styles.ranking__list}
        ListHeaderComponent={
          <View>

            {/* Header */}
            <View style={styles.ranking__header}>
              <View style={styles.ranking__headerText}>
                <Text style={styles.ranking__title}>Global</Text>
                <Text style={styles.ranking__title}>Ranking</Text>
                <Text style={styles.ranking__subtitle}>
                  Seguí tu posición y competí con todos los participantes.
                </Text>
              </View>
            </View>

            {/* Hero #1 */}
            {first && (
              <RankingHeroCard
                entry={first}
                onPress={() => handleUserPress(first.username)}
              />
            )}

            {/* Mi posicion */}
            {myPosition !== null && (
              <View style={styles.ranking__myPosition}>
                <Text style={styles.ranking__myPositionText}>
                  Tu posición actual: #{myPosition}
                </Text>
              </View>
            )}

          </View>
        }
        ListEmptyComponent={
          <View style={styles.ranking__empty}>
            <MaterialIcons name="group" size={40} color={colors.neutral400} />
            <Text style={styles.ranking__emptyText}>No hay participantes aún</Text>
          </View>
        }
        renderItem={({ item }: { item: RankingEntry }) => (
          <RankingRow
            ranking={item}
            isMe={item.username === user?.username}
            onPress={() => handleUserPress(item.username)}
          />
        )}
      />

    </View>
    </Layout>
  );
}