import {
  View,
  Text,
  ImageBackground,
  type ImageSourcePropType,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useCountdown } from "@/features/home/hooks/useCountdown";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
// Utils
import { padNumber } from "@/shared/utils/padNumber";
// Styles
import { makeStyles } from "./FavoriteTeamCard.styles";

interface FavoriteTeamCardProps {
  favoriteTeam: string;
  flagUrl: string;
  banner: ImageSourcePropType;
  rival: string;
  matchDate: string;
}

export function FavoriteTeamCard({
  favoriteTeam,
  flagUrl,
  banner,
  rival,
  matchDate,
}: FavoriteTeamCardProps) {
  const styles = useStyles(makeStyles);
  const countdown = useCountdown(matchDate);

  return (
    <ImageBackground
      source={banner}
      style={styles.card}
      imageStyle={{ resizeMode: "cover" }}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Badge */}
      <View style={styles.badge}>
        <Feather name="clock" size={11} color="#FFFFFF" />
        <Text style={styles.badgeText}>Tu equipo favorito</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Team row */}
        <View style={styles.teamRow}>
          <Flag uri={flagUrl} name={favoriteTeam} size="sm" />
          <Text style={styles.teamName}>{favoriteTeam}</Text>
        </View>

        {/* Next match */}
        <Text style={styles.nextMatch}>Próximo partido vs {rival}</Text>

        {/* Countdown */}
        {!countdown.expired && (
          <View style={styles.countdown}>
            <View style={styles.countUnit}>
              <Text style={styles.countNumber}>
                {padNumber(countdown.days)}
              </Text>
              <Text style={styles.countLabel}>Días</Text>
            </View>
            <View style={styles.countUnit}>
              <Text style={styles.countNumber}>
                {padNumber(countdown.hours)}
              </Text>
              <Text style={styles.countLabel}>Hrs</Text>
            </View>
            <View style={styles.countUnit}>
              <Text style={styles.countNumber}>
                {padNumber(countdown.minutes)}
              </Text>
              <Text style={styles.countLabel}>Min</Text>
            </View>
            <View style={styles.countUnit}>
              <Text style={styles.countNumber}>
                {padNumber(countdown.seconds)}
              </Text>
              <Text style={styles.countLabel}>Seg</Text>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
