import { View, Text, Pressable } from "react-native";
import { Flag } from "@/shared/ui/Flag/Flag";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { useStyles } from "@/shared/hooks/useStyles";
import type { RankingRowData } from "@/shared/types";
import { makeStyles } from "./RankingRow.styles";

interface RankingRowProps extends RankingRowData {
  isMe?: boolean;
  onPress?: () => void;
}

export function RankingRow({
  position,
  name,
  username,
  flagUrl,
  points,
  movement,
  isMe = false,
  onPress,
}: RankingRowProps) {
  const styles = useStyles(makeStyles);

  const moveLabel = movement
    ? movement > 0
      ? `▲${movement}`
      : `▼${Math.abs(movement)}`
    : null;

  const moveStyle = movement
    ? movement > 0
      ? styles.move_up
      : styles.move_down
    : null;

  return (
    <Pressable onPress={onPress} style={[styles.row, isMe && styles.row_me]}>
      {/* Position */}
      <Text style={[styles.pos, isMe && styles.pos_me]}>{position}</Text>

      {/* Avatar */}
      {flagUrl ? (
        <Flag uri={flagUrl} name={name} size="sm" />
      ) : (
        <Avatar name={name} size="sm" />
      )}

      {/* Info */}
      <View style={styles.info}>
        {/* Nombre + badge me + move */}
        <View style={styles.nameRow}>
          <Text style={[styles.name, isMe && styles.name_me]}>
            {isMe ? "Tú" : name}
          </Text>

          {/* Badge me */}
          {isMe && (
            <View style={styles.badge_me}>
              <Text style={styles.text_me}>TÚ</Text>
            </View>
          )}

          {/* Move */}
          {moveLabel && (
            <Text style={[styles.move, moveStyle]}>{moveLabel}</Text>
          )}
        </View>

        {/* Username */}
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Points */}
      <Text style={[styles.pts, isMe && styles.pts_me]}>{points}</Text>
    </Pressable>
  );
}
