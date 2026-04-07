import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useAuthStore } from "../store/authStore";
import { homeApi } from "../services/homeApi";
import { HomeData } from "../types/home.types";
import Button from "../components/ui/Button";

export default function Home() {
  const { logout, token, user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HomeData | null>(null);
  const [showAllRanking, setShowAllRanking] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        if (!token) return;
        const response = await homeApi.getHomeData(token);
        setData(response.homeData);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // Calcular iniciales del usuario
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Formatear hora del partido
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Ranking a mostrar — top 5 o todos
  const rankingToShow = showAllRanking
    ? data?.fullRanking
    : data?.fullRanking.slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      {/* Header con iniciales */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiniela 2026</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user ? getInitials(user.name) : "?"}
          </Text>
        </View>
      </View>

      {/* Próximos partidos */}
      <Text style={styles.sectionTitle}>Próximos partidos</Text>
      <FlatList
        data={data?.upcomingMatches}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            <Text style={styles.stadium}>{item.stadium}</Text>
            <View style={styles.matchTeams}>
              <View style={styles.team}>
                <Text style={styles.flag}>{item.homeFlag}</Text>
                <Text style={styles.teamName}>{item.homeTeam}</Text>
              </View>
              <Text style={styles.vs}>VS</Text>
              <View style={styles.team}>
                <Text style={styles.flag}>{item.awayFlag}</Text>
                <Text style={styles.teamName}>{item.awayTeam}</Text>
              </View>
            </View>
            <Text style={styles.matchTime}>{formatTime(item.date)}</Text>
          </View>
        )}
      />

      {/* Ranking general */}
      <View style={styles.rankingHeader}>
        <Text style={styles.sectionTitle}>Ranking general</Text>
        <TouchableOpacity onPress={() => setShowAllRanking(!showAllRanking)}>
          <Text style={styles.seeAll}>
            {showAllRanking ? "Ver menos" : "Ver todos"}
          </Text>
        </TouchableOpacity>
      </View>

      {rankingToShow?.map((entry) => (
        <View
          key={entry.username}
          style={[
            styles.rankingRow,
            entry.username === user?.username && styles.myRankingRow,
          ]}
        >
          <Text style={styles.position}>{entry.position}</Text>
          <Text style={styles.rankingName}>{entry.username}</Text>
          {entry.username === user?.username && (
            <Text style={styles.youBadge}>TÚ</Text>
          )}
          <Text style={styles.rankingPoints}>{entry.totalPoints} pts</Text>
        </View>
      ))}

      {/* Mi posición */}
      <Text style={styles.sectionTitle}>Mi posición</Text>
      {data?.myRanking ? (
        <View style={styles.myRankingCard}>
          <Text style={styles.myPosition}>#{data.myRanking.position}</Text>
          <Text style={styles.myName}>{data.myRanking.username}</Text>
          <Text style={styles.myPoints}>{data.myRanking.totalPoints} pts</Text>
        </View>
      ) : (
        <View style={styles.noRankingCard}>
          <Text style={styles.noRankingText}>
            Todavía no hiciste predicciones
          </Text>
          <Text style={styles.noRankingSubtext}>
            ¡Empezá a predecir para aparecer en el ranking!
          </Text>
        </View>
      )}

      {/* Cerrar sesión */}
      <View style={{ marginTop: 32, marginBottom: 32 }}>
        <Button variant="outlined" onPress={logout}>
          Cerrar sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  // Secciones
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 24,
  },

  // Match card
  matchCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 220,
  },
  stadium: {
    fontSize: 11,
    color: "#999",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  matchTeams: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  team: { alignItems: "center", flex: 1 },
  flag: { fontSize: 32 },
  teamName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
  vs: { fontSize: 14, fontWeight: "bold", color: "#999" },
  matchTime: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 13,
    color: "#555",
  },

  // Ranking
  rankingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: { color: "#007AFF", fontSize: 14 },
  rankingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  myRankingRow: {
    backgroundColor: "#f0f7ff",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  position: { width: 30, fontSize: 14, color: "#999" },
  rankingName: { flex: 1, fontSize: 14, fontWeight: "500" },
  youBadge: {
    fontSize: 10,
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  rankingPoints: { fontSize: 14, fontWeight: "bold" },

  // Mi posición
  myRankingCard: {
    backgroundColor: "#f0f7ff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  myPosition: { fontSize: 28, fontWeight: "bold" },
  myName: { fontSize: 16, fontWeight: "500" },
  myPoints: { fontSize: 16, fontWeight: "bold" },

  // Sin predicciones
  noRankingCard: {
    backgroundColor: "#fff8f0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  noRankingText: { fontSize: 15, fontWeight: "bold", marginBottom: 4 },
  noRankingSubtext: { fontSize: 13, color: "#999", textAlign: "center" },
});
