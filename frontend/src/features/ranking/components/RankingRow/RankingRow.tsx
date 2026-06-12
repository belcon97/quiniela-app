import { View, Text, Pressable } from "react-native";
// Navigation
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
// Types
import type { RankingEntry } from "@/shared/types";
// Styles
import { makeStyles } from "./RankingRow.styles";

interface RankingRowProps {
  entry: RankingEntry;
  flagUrl: string;
  movement?: number;
}

export function RankingRow({ entry, flagUrl, movement }: RankingRowProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  const renderMovement = () => {
    if (movement === undefined || movement === null) {
      return (
        <View style={styles.movement}>
          <Text style={[styles.movementText, styles.movement_none]}>—</Text>
        </View>
      );
    }
    if (movement > 0) {
      return (
        <View style={styles.movement}>
          <Feather name="arrow-up" size={12} color={theme.semantic.win} />
          <Text style={[styles.movementText, styles.movement_up]}>
            {movement}
          </Text>
        </View>
      );
    }
    if (movement < 0) {
      return (
        <View style={styles.movement}>
          <Feather name="arrow-down" size={12} color={theme.semantic.loss} />
          <Text style={[styles.movementText, styles.movement_down]}>
            {Math.abs(movement)}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.movement}>
        <Text style={[styles.movementText, styles.movement_none]}>—</Text>
      </View>
    );
  };

  return (
    <Pressable
      style={styles.row}
      onPress={() =>
        navigation.navigate("ProfileDetail", { username: entry.username })
      }
    >
      {/* Position */}
      <Text style={styles.position}>{entry.position}</Text>

      {/* Flag o Avatar */}
      {flagUrl ? (
        <Flag uri={flagUrl} name={entry.name} size="sm" />
      ) : (
        <Avatar name={entry.name} size="sm" />
      )}

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {entry.name}
        </Text>
        <Text style={styles.username}>@{entry.username}</Text>
      </View>

      {renderMovement()}

      {/* Points */}
      <Text style={styles.points}>{entry.totalPoints}</Text>
    </Pressable>
  );
}