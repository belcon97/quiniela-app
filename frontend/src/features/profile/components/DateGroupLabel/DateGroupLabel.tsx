import { View, Text } from "react-native";
import { useStyles } from "@/shared/hooks/useStyles";
import { formatDateLabel } from "@/shared/utils/formatDate";
import { makeStyles } from "./DateGroupLabel.styles";

interface DateGroupLabelProps {
  date: string;
  count: number;
}

export function DateGroupLabel({ date, count }: DateGroupLabelProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDateLabel(date)}</Text>
      <Text style={styles.count}>
        {count} {count === 1 ? "partido" : "partidos"}
      </Text>
    </View>
  );
}