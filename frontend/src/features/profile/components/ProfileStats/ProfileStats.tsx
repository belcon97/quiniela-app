import { View } from "react-native";
// Styles
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
      <StatCard label="Puntos">{totalPoints}</StatCard>
      <StatCard label="Ranking General" highlight>
        {position ? `#${position}` : "-"}
      </StatCard>
    </View>
  );
}