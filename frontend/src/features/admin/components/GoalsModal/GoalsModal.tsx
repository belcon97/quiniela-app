import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { BottomSheet } from "@/shared/ui/BottomSheet/BottomSheet";
// Styles
import { makeStyles } from "./GoalsModal.styles";

interface GoalsModalProps {
  visible: boolean;
  playerName: string;
  currentGoals: number;
  onClose: () => void;
  onConfirm: (goals: number) => void;
}

export function GoalsModal({
  visible,
  playerName,
  currentGoals,
  onClose,
  onConfirm,
}: GoalsModalProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  const [text, setText] = useState(
    currentGoals > 0 ? String(currentGoals) : "",
  );

  // Sincroniza cuando cambia el jugador
  useEffect(() => {
    setText(currentGoals > 0 ? String(currentGoals) : "");
  }, [currentGoals]);

  const isFilled = text !== "";
  const goalsValue = parseInt(text, 10);

  const handleChange = (newText: string) => {
    const cleaned = newText.replace(/[^0-9]/g, "");
    setText(cleaned);
  };

  const handleConfirm = () => {
    const goals = isNaN(goalsValue) ? 0 : goalsValue;
    onConfirm(goals);
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      title="EDITAR GOLES"
      subtitle={playerName}
      onClose={onClose}
    >
      <View style={styles.content}>
        {/* Input */}
        <TextInput
          style={[styles.input, isFilled && styles.input_filled]}
          value={text}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={3}
          selectTextOnFocus
          textAlign="center"
          placeholder="0"
          placeholderTextColor={theme.textDisabled}
        />

        {/* Helper */}
        <Text style={styles.helperText}>Goles convertidos en el torneo</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>CANCELAR</Text>
          </Pressable>
          <Pressable style={styles.saveBtn} onPress={handleConfirm}>
            <Feather name="check" size={16} color={theme.secondaryContrast} />
            <Text style={styles.saveText}>GUARDAR</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}
