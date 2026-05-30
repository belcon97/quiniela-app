import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./FavoriteTeamBanner.styles"
import { colors } from "@/styles/theme";
import type { Match } from "@/types/shared.types";

interface FavoriteTeamBannerProps {
  match: Match;
  teamName: string;
}

function getTimeRemaining(date: string) {
  const diff = new Date(date).getTime() - Date.now();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function FavoriteTeamBanner({ match, teamName }: FavoriteTeamBannerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(match.date));

  useEffect(() => {
    // Actualiza cada segundo
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(match.date));
    }, 1000);

    // Limpia el intervalo al desmontar
    return () => clearInterval(interval);
  }, [match.date]);

  if (!timeLeft) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.banner__header}>
        <Text style={styles.banner__label}>TU EQUIPO FAVORITO</Text>
        <MaterialIcons name="timer" size={18} color={colors.secondary} />
      </View>

      <Text style={styles.banner__countdown}>
        {`Falta ${pad(timeLeft.days)}d – ${pad(timeLeft.hours)}h – ${pad(timeLeft.minutes)}m – ${pad(timeLeft.seconds)}s`}
      </Text>

      <Text style={styles.banner__subtitle}>
        para que {teamName} juegue
      </Text>
    </View>
  );
}