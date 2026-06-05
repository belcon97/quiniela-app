import { useState, useEffect } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Data
import { RULES_STEPS } from "@/data/rulesSteps";
// Styles
import { makeStyles } from "./RulesModal.styles";

interface RulesModalProps {
  visible: boolean;
  onFinish: () => void;
}

export function RulesModal({ visible, onFinish }: RulesModalProps) {
  const styles = useStyles(makeStyles);

  const [currentStep, setCurrentStep] = useState(0);

  // Siempre arranca desde el paso 1
  useEffect(() => {
    if (visible) setCurrentStep(0);
  }, [visible]);

  const step = RULES_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === RULES_STEPS.length - 1;
  const totalSteps = RULES_STEPS.length;

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) setCurrentStep((prev) => prev - 1);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Progress bar */}
          <View style={styles.progressRow}>
            {RULES_STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressSegment,
                  index <= currentStep && styles.progressSegment_active,
                ]}
              />
            ))}
          </View>

          {/* Step label */}
          <Text style={styles.stepLabel}>
            PASO {currentStep + 1} DE {totalSteps}
          </Text>

          {/* Visual */}
          <View style={styles.visual}>
            <View style={[styles.badge, { backgroundColor: step.badgeColor }]}>
              <Text style={[styles.badgeText, { color: step.badgeTextColor }]}>
                {step.badge}
              </Text>
            </View>
          </View>

          {/* Content */}
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>

          {/* Footer */}
          <View style={styles.footer}>
            {/* Anterior — oculto en el primer paso */}
            {!isFirst && (
              <Pressable style={styles.backBtn} onPress={handleBack}>
                <Feather name="arrow-left" size={16} color="#9AA1AD" />
                <Text style={styles.backText}>ANTERIOR</Text>
              </Pressable>
            )}

            {/* Siguiente / Finalizar */}
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextText}>
                {isLast ? "FINALIZAR" : "SIGUIENTE"}
              </Text>
              {isLast ? (
                <Feather name="check" size={16} color="#fff" />
              ) : (
                <Feather name="arrow-right" size={16} color="#fff" />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
