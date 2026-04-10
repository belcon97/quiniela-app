// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";

// import { useAuthStore } from "../store/authStore";
// import { homeApi } from "../services/homeApi";
// import { HomeData } from "../types/home.types";
// import Button from "../components/ui/Button";

// export default function Home() {
//   const { logout, token, user } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<HomeData | null>(null);
//   const [showAllRanking, setShowAllRanking] = useState(false);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       setLoading(true);
//       try {
//         if (!token) return;
//         const response = await homeApi.getHomeData(token);
//         setData(response.homeData);
//       } catch (error: any) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHomeData();
//   }, []);

//   // Calcular iniciales del usuario
//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   // Formatear hora del partido
//   const formatTime = (date: string) => {
//     return new Date(date).toLocaleTimeString("es-AR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // Ranking a mostrar — top 5 o todos
//   const rankingToShow = showAllRanking
//     ? data?.fullRanking
//     : data?.fullRanking.slice(0, 5);

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header con iniciales */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Quiniela 2026</Text>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>
//             {user ? getInitials(user.name) : "?"}
//           </Text>
//         </View>
//       </View>

//       {/* Próximos partidos */}
//       <Text style={styles.sectionTitle}>Próximos partidos</Text>
//       <FlatList
//         data={data?.upcomingMatches}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.matchCard}>
//             <Text style={styles.stadium}>{item.stadium}</Text>
//             <View style={styles.matchTeams}>
//               <View style={styles.team}>
//                 <Text style={styles.flag}>{item.homeFlag}</Text>
//                 <Text style={styles.teamName}>{item.homeTeam}</Text>
//               </View>
//               <Text style={styles.vs}>VS</Text>
//               <View style={styles.team}>
//                 <Text style={styles.flag}>{item.awayFlag}</Text>
//                 <Text style={styles.teamName}>{item.awayTeam}</Text>
//               </View>
//             </View>
//             <Text style={styles.matchTime}>{formatTime(item.date)}</Text>
//           </View>
//         )}
//       />

//       {/* Ranking general */}
//       <View style={styles.rankingHeader}>
//         <Text style={styles.sectionTitle}>Ranking general</Text>
//         <TouchableOpacity onPress={() => setShowAllRanking(!showAllRanking)}>
//           <Text style={styles.seeAll}>
//             {showAllRanking ? "Ver menos" : "Ver todos"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {rankingToShow?.map((entry) => (
//         <View
//           key={entry.username}
//           style={[
//             styles.rankingRow,
//             entry.username === user?.username && styles.myRankingRow,
//           ]}
//         >
//           <Text style={styles.position}>{entry.position}</Text>
//           <Text style={styles.rankingName}>{entry.username}</Text>
//           {entry.username === user?.username && (
//             <Text style={styles.youBadge}>TÚ</Text>
//           )}
//           <Text style={styles.rankingPoints}>{entry.totalPoints} pts</Text>
//         </View>
//       ))}

//       {/* Mi posición */}
//       <Text style={styles.sectionTitle}>Mi posición</Text>
//       {data?.myRanking ? (
//         <View style={styles.myRankingCard}>
//           <Text style={styles.myPosition}>#{data.myRanking.position}</Text>
//           <Text style={styles.myName}>{data.myRanking.username}</Text>
//           <Text style={styles.myPoints}>{data.myRanking.totalPoints} pts</Text>
//         </View>
//       ) : (
//         <View style={styles.noRankingCard}>
//           <Text style={styles.noRankingText}>
//             Todavía no hiciste predicciones
//           </Text>
//           <Text style={styles.noRankingSubtext}>
//             ¡Empezá a predecir para aparecer en el ranking!
//           </Text>
//         </View>
//       )}

//       {/* Cerrar sesión */}
//       <View style={{ marginTop: 32, marginBottom: 32 }}>
//         <Button variant="outlined" onPress={logout}>
//           Cerrar sesión
//         </Button>
//       </View>
//     </ScrollView>
//   );
// }
