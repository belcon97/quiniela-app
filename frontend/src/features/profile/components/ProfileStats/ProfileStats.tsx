import { View } from "react-native";
import { styles } from "./ProfileStats.styles";

// Components
import { StatCard } from "@/ui/StatCard/StatCard";

interface ProfileStatsProps {
  totalPoints: number;
  position: number | null;
}

export function ProfileStats({ totalPoints, position }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <StatCard label="TOTAL POINTS">{totalPoints}</StatCard>
      <StatCard label="GLOBAL RANK">{position ? `#${position}` : "-"}</StatCard>
    </View>
  );
}
