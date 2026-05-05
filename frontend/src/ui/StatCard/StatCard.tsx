import { View, Text } from "react-native";
import { styles } from "./StatCard.styles";

interface StatCardProps {
  label: string;
  children: React.ReactNode;
}

export function StatCard({ label, children }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{children}</Text>
    </View>
  );
}
