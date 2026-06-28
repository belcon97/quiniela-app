import { View, Text, TextInput, Pressable, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { Flag } from "@/shared/ui/Flag/Flag";
import { formatMatchDate } from "@/shared/utils/formatDate";
import { makeStyles } from "./PendingMatchCard.styles";
import type { Match } from "@/shared/types";

interface PendingMatchCardProps {
  match: Match;
  homeScore: string;
  awayScore: string;
  isWildcard: boolean;
  wildcardUsed: boolean;
  wildcardAvailable: boolean;
  group: string;
  onHomeChange: (value: string) => void;
  onAwayChange: (value: string) => void;
  onWildcard: () => void;
}

export function PendingMatchCard({
  match,
  homeScore,
  awayScore,
  isWildcard,
  wildcardUsed,
  wildcardAvailable,
  onHomeChange,
  onAwayChange,
  onWildcard,
}: PendingMatchCardProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.card}>
      <View style={styles.match}>
        <View style={styles.team}>
          <Flag uri={match.homeFlag} name={match.homeTeam} size="md" />
          <Text style={styles.teamName} numberOfLines={2}>
            {match.homeTeam}
          </Text>
        </View>
        <View style={styles.scoreRow}>
          <TextInput
            style={[styles.input, homeScore !== "" && styles.input_filled]}
            value={homeScore}
            onChangeText={(v) => onHomeChange(v.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            maxLength={2}
            placeholder="-"
            placeholderTextColor={theme.textDisabled}
            textAlign="center"
            {...(Platform.OS === "web"
              ? ({ outlineStyle: "none" } as any)
              : {})}
          />
          <Text style={styles.separator}>:</Text>
          <TextInput
            style={[styles.input, awayScore !== "" && styles.input_filled]}
            value={awayScore}
            onChangeText={(v) => onAwayChange(v.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            maxLength={2}
            placeholder="-"
            placeholderTextColor={theme.textDisabled}
            textAlign="center"
            {...(Platform.OS === "web"
              ? ({ outlineStyle: "none" } as any)
              : {})}
          />
        </View>
        <View style={styles.team}>
          <Flag uri={match.awayFlag} name={match.awayTeam} size="md" />
          <Text style={styles.teamName} numberOfLines={2}>
            {match.awayTeam}
          </Text>
        </View>
      </View>

      <View style={styles.meta}>
        <Feather name="calendar" size={12} color={theme.textSecondary} />
        <Text style={styles.metaText}>{formatMatchDate(match.date)}</Text>
      </View>

      {wildcardAvailable || isWildcard ? (
        <Pressable
          style={[
            styles.wildcardBtn,
            isWildcard && styles.wildcardBtn_active,
            wildcardUsed && !isWildcard && styles.wildcardBtn_disabled,
          ]}
          onPress={onWildcard}
          disabled={wildcardUsed && !isWildcard}
        >
          <Text
            style={[
              styles.wildcardText,
              isWildcard && styles.wildcardText_active,
            ]}
          >
            ×2 COMODÍN
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
