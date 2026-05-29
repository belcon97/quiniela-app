import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./Header.styles";
import { colors, typography, spacing, radius } from "@/styles/theme";
import { useAuthStore } from "@/store/authStore";

interface HeaderProps {
  onMenuPress?: () => void;
  onRulesPress?: () => void;
}

export function Header({ onMenuPress, onRulesPress }: HeaderProps) {
  const [showRules, setShowRules] = useState(false);
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        {onMenuPress && <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>}

        <Text numberOfLines={1} style={styles.title}>
          Hola, {user?.username}
        </Text>

        <TouchableOpacity
          onPress={() => setShowRules(true)}
          style={styles.rulesBtn}
        >
          <Feather name="help-circle" size={26} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showRules}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRules(false)}
      >
        <View style={rulesStyles.overlay}>
          <View style={rulesStyles.sheet}>
            <View style={rulesStyles.header}>
              <Text style={rulesStyles.title}>Reglas de puntuación</Text>
              <TouchableOpacity onPress={() => setShowRules(false)}>
                <Feather name="x" size={20} color={colors.neutral900} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={rulesStyles.rule}>
                <View
                  style={[rulesStyles.badge, { backgroundColor: "#FEF9C3" }]}
                >
                  <Text style={[rulesStyles.badgeText, { color: "#854D0E" }]}>
                    +1 PT
                  </Text>
                </View>
                <Text style={rulesStyles.ruleText}>
                  Acertás el ganador o empate, pero no el resultado exacto.
                </Text>
              </View>

              <View style={rulesStyles.divider} />

              <View style={rulesStyles.rule}>
                <View
                  style={[rulesStyles.badge, { backgroundColor: "#DCFCE7" }]}
                >
                  <Text style={[rulesStyles.badgeText, { color: "#166534" }]}>
                    +3 PTS
                  </Text>
                </View>
                <Text style={rulesStyles.ruleText}>
                  Acertás el ganador y el resultado exacto del partido.
                </Text>
              </View>

              <View style={rulesStyles.divider} />

              <View style={rulesStyles.rule}>
                <View
                  style={[rulesStyles.badge, { backgroundColor: "#EDE9FE" }]}
                >
                  <Text style={[rulesStyles.badgeText, { color: "#5B21B6" }]}>
                    ×2
                  </Text>
                </View>
                <Text style={rulesStyles.ruleText}>
                  Comodín — duplica los puntos de un partido. Solo en fase de
                  grupos, una vez por quiniela.
                </Text>
              </View>

              <View style={rulesStyles.divider} />

              <View style={rulesStyles.rule}>
                <View
                  style={[rulesStyles.badge, { backgroundColor: "#DCFCE7" }]}
                >
                  <Text style={[rulesStyles.badgeText, { color: "#166534" }]}>
                    +3 PTS
                  </Text>
                </View>
                <Text style={rulesStyles.ruleText}>
                  Goleador — acertás el goleador del torneo al inicio de la
                  quiniela.
                </Text>
              </View>

              <TouchableOpacity
                style={rulesStyles.fullRulesBtn}
                onPress={() => {
                  setShowRules(false);
                  onRulesPress?.();
                }}
              >
                <Text style={rulesStyles.fullRulesBtnText}>
                  Ver reglas completas
                </Text>
                <Feather name="arrow-right" size={14} color={colors.primary} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const rulesStyles = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end" as const,
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    maxHeight: "70%" as const,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
  },
  rule: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 56,
    alignItems: "center" as const,
  },
  badgeText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
  },
  ruleText: {
    flex: 1,
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral200,
  },
  fullRulesBtn: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: spacing.xs,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  fullRulesBtnText: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
};
