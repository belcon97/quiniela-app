import { ScrollView, View, Text } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { Layout } from "@/layout/Layout";
import { RuleItem } from "@/features/rules/components/RuleItem/RuleItem";
import { RuleAccordion } from "@/features/rules/components/RuleAccordion/RuleAccordion";
// Data
import { RULES_STEPS } from "@/data/rulesSteps";
import { RULES_ACCORDION } from "@/data/rulesAccordion";
// Styles
import { makeStyles } from "./Rules.styles";

export function Rules() {
  const styles = useStyles(makeStyles);

  return (
    <Layout>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>REGLAS DEL{"\n"}JUEGO</Text>
          <Text style={styles.subtitle}>CÓMO SE PUNTÚA Y FUNCIONA</Text>
        </View>

        {/* Puntuacion */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PUNTUACIÓN</Text>
          <View style={styles.list}>
            {RULES_STEPS.map((step) => (
              <RuleItem key={step.id} step={step} />
            ))}
          </View>
        </View>

        {/* Como funciona */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CÓMO FUNCIONA</Text>
          <View style={styles.list}>
            {RULES_ACCORDION.map((item) => (
              <RuleAccordion key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
