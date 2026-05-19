import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./Ranking.styles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

// Components
import { RankingRow } from "@/ui/RankingRow/RankingRow";

// Hooks
import { useHome } from "@/features/home/hooks/useHome";

// Store
import { useAuthStore } from "@/store/authStore";

type RankingScreenProps = NativeStackScreenProps<AppStackParams, "Ranking">;

export default function Ranking({ navigation, route }: RankingScreenProps) {
  const insets = useSafeAreaInsets();
  const { ranking: rankingParam, myPosition: myPositionParam } =
    route.params ?? {};
  const { data, loading } = useHome();
  const user = useAuthStore((state) => state.user);

  const ranking = rankingParam ?? data?.fullRanking ?? [];
  const myPosition = myPositionParam ?? data?.myPosition ?? null;
  const isLoading = !rankingParam && loading;

  const handleUserPress = (username: string) => {
    if (username === user?.username) {
      navigation.navigate("Profile", undefined);
    } else {
      navigation.navigate("Profile", { username });
    }
  };

  return (
    <View style={[styles.ranking, { paddingTop: insets.top }]}>
      <View style={styles.ranking__header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.ranking__title}>Ranking general</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#001F5B" />
      ) : (
        <FlatList
          data={ranking}
          keyExtractor={(item) => item.username}
          contentContainerStyle={styles.ranking__list}
          ListEmptyComponent={
            <View style={styles.ranking__empty}>
              <Feather name="users" size={40} color="#98A2B3" />
              <Text style={styles.ranking__emptyText}>
                No hay participantes aún
              </Text>
            </View>
          }
          ListHeaderComponent={
            myPosition !== null ? (
              <View style={styles.ranking__myPosition}>
                <Text style={styles.ranking__myPositionText}>
                  Tu posición actual: #{myPosition}
                </Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <RankingRow
              ranking={item}
              isMe={item.username === user?.username}
              onPress={() => handleUserPress(item.username)}
            />
          )}
        />
      )}
    </View>
  );
}
