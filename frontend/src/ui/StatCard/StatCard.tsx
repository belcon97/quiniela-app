import { View, Text } from "react-native";
// Styles
import { styles } from "./StatCard.styles";

interface StatCardProps {
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}

export function StatCard({ label, children, highlight }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.card__label}>{label}</Text>
      <Text style={[styles.card__value, highlight && styles.card__value__highlight]}>
        {children}
      </Text>
    </View>
  );
}