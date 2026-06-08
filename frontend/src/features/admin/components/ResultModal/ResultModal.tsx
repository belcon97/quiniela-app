import { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { ScoreInput } from "@/shared/ui/ScoreInput/ScoreInput";
import { makeStyles } from "./ResultModal.styles";

interface ResultModalProps {
  visible: boolean;
  homeTeam: string;
  awayTeam: string;
  group: string;
  onClose: () => void;
  onConfirm: (homeScore: number, awayScore: number) => void;
}

export function ResultModal({
  visible,
  homeTeam,
  awayTeam,
  onClose,
  onConfirm,
}: ResultModalProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleConfirm = () => {
    onConfirm(homeScore, awayScore);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <BlurView
        intensity={20}
        tint={theme.isDark ? "dark" : "light"}
        style={StyleSheet.absoluteFillObject}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <Text style={styles.title}>ACTUALIZAR{"\n"}RESULTADO</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <Feather name="x" size={22} color={theme.textSecondary} />
              </Pressable>
            </View>
            <Text style={styles.subtitle}>
              {homeTeam} vs {awayTeam}
            </Text>
            <View style={styles.scoreboard}>
              <View style={styles.teamSection}>
                <Text style={styles.teamLabel}>{homeTeam}</Text>
                <ScoreInput value={homeScore} onChange={setHomeScore} />
              </View>
              <Text style={styles.separator}>:</Text>
              <View style={styles.teamSection}>
                <Text style={styles.teamLabel}>{awayTeam}</Text>
                <ScoreInput value={awayScore} onChange={setAwayScore} />
              </View>
            </View>
            <View style={styles.footer}>
              <Pressable style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={handleConfirm}>
                <Feather
                  name="check"
                  size={16}
                  color={theme.secondaryContrast}
                />
                <Text style={styles.saveText}>GUARDAR</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
}
