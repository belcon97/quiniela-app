import { View, Text, Pressable } from "react-native";
// Navigation
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
// Types
import type { RankingEntry } from "@/shared/types";
// Styles
import { makeStyles } from "./PodiumCard.styles";

const MEDAL_COLORS: Record<number, string> = {
  1: "#F6C324",
  2: "#B0B7C3",
  3: "#C47B3A",
};

interface PodiumCardProps {
  entry: RankingEntry;
  flagUrl: string;
}

export function PodiumCard({ entry, flagUrl }: PodiumCardProps) {
  const styles = useStyles(makeStyles);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  const medalColor = MEDAL_COLORS[entry.position];
  const isFirst = entry.position === 1;

  return (
    <Pressable
      style={[styles.card, isFirst && styles.card_first]}
      onPress={() =>
        navigation.navigate("Profile", { username: entry.username })
      }
    >
      {/* Medalla */}
      <View style={[styles.medal, { backgroundColor: medalColor }]}>
        <Text style={styles.medalText}>{entry.position}</Text>
      </View>

      {/* Flag o Avatar */}
      <View style={[styles.flagWrapper, { borderColor: medalColor }]}>
        {flagUrl ? (
          <Flag uri={flagUrl} name={entry.name} size="md" />
        ) : (
          <Avatar name={entry.name} size="md" />
        )}
      </View>

      {/* Nombre */}
      <Text style={styles.name} numberOfLines={1}>
        {entry.name.toUpperCase()}
      </Text>

      {/* Puntos */}
      <Text style={styles.points}>{entry.totalPoints}</Text>
      <Text style={styles.pointsLabel}>PTS</Text>
    </Pressable>
  );
}
