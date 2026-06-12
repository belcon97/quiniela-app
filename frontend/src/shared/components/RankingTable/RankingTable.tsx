import { View, Text } from "react-native";
import { RankingRow } from "./RankingRow";
import { useStyles } from "@/shared/hooks/useStyles";
import type { RankingRowData } from "@/shared/types";
import { makeStyles } from "./RankingTable.styles";

interface RankingTableProps {
  data: RankingRowData[];
  myUsername?: string;
  myEntry?: RankingRowData;
  onRowPress?: (username: string) => void;
}

export function RankingTable({
  data,
  myUsername,
  myEntry,
  onRowPress,
}: RankingTableProps) {
  const styles = useStyles(makeStyles);

  const isMeInList = data.some((item) => item.username === myUsername);

  return (
    <View style={styles.container}>
      {/* Header columns */}
      <View style={styles.header}>
        <Text style={styles.col}>#</Text>
        <Text style={[styles.col, styles.col_user]}>USUARIO</Text>
        <Text style={[styles.col, styles.col_pts]}>PTS</Text>
      </View>

      {/* Rows */}
      {data.map((item) => (
        <RankingRow
          key={item.username}
          {...item}
          isMe={item.username === myUsername}
          onPress={() => onRowPress?.(item.username)}
        />
      ))}

      {/* My entry (si no está en la lista) */}
      {!isMeInList && myEntry && (
        <RankingRow
          {...myEntry}
          isMe
          onPress={() => onRowPress?.(myEntry.username)}
        />
      )}
    </View>
  );
}
