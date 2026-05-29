import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Styles
import { styles } from "./RulesModal.styles";
// Theme
import { colors, typography, spacing } from "@/styles/theme";

interface RulesModalProps {
  visible: boolean;
  onClose: () => void;
  onRulesPress?: () => void;
}

export function RulesModal({ visible, onClose, onRulesPress }: RulesModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Reglas de puntuación</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color={colors.neutral900} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.rule}>
              <View style={[styles.badge, { backgroundColor: "#FEF9C3" }]}>
                <Text style={[styles.badge__text, { color: "#854D0E" }]}>+1 PT</Text>
              </View>
              <Text style={styles.rule__text}>
                Acertás el ganador o empate, pero no el resultado exacto.
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rule}>
              <View style={[styles.badge, { backgroundColor: "#DCFCE7" }]}>
                <Text style={[styles.badge__text, { color: "#166534" }]}>+3 PTS</Text>
              </View>
              <Text style={styles.rule__text}>
                Acertás el ganador y el resultado exacto del partido.
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rule}>
              <View style={[styles.badge, { backgroundColor: "#EDE9FE" }]}>
                <Text style={[styles.badge__text, { color: "#5B21B6" }]}>×2</Text>
              </View>
              <Text style={styles.rule__text}>
                Comodín — duplica los puntos de un partido. Solo en fase de grupos, una vez por quiniela.
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rule}>
              <View style={[styles.badge, { backgroundColor: "#DCFCE7" }]}>
                <Text style={[styles.badge__text, { color: "#166534" }]}>+3 PTS</Text>
              </View>
              <Text style={styles.rule__text}>
                Goleador — acertás el goleador del torneo al inicio de la quiniela.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.fullRulesBtn}
              onPress={() => {
                onClose();
                onRulesPress?.();
              }}
            >
              <Text style={styles.fullRulesBtn__text}>Ver reglas completas</Text>
              <Feather name="arrow-right" size={14} color={colors.primary} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}