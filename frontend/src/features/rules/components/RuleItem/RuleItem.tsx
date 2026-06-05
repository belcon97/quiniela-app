import { View, Text } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Types
import type { RuleStep } from '@/features/rules/types/rules.types'
// Styles
import { makeStyles } from "./RuleItem.styles";

interface RuleItemProps {
  step: RuleStep;
}

export function RuleItem({ step }: RuleItemProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.container}>
      {/* Badge */}
      <View style={[styles.badge, { backgroundColor: step.badgeColor }]}>
        <Text style={[styles.badgeText, { color: step.badgeTextColor }]}>
          {step.badge}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>
    </View>
  );
}
