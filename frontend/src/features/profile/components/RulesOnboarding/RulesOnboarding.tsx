import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./RulesOnboarding.styles";
import { colors } from "@/styles/theme";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    badge: "+1\nPT",
    badgeColor: "#FEF9C3",
    badgeTextColor: "#854D0E",
    title: "Puntuación básica",
    description:
      "Ganás +1 PT por acertar el ganador del partido o el empate, sin necesidad de acertar el marcador exacto.",
  },
  {
    id: "2",
    badge: "+3\nPTS",
    badgeColor: "#DCFCE7",
    badgeTextColor: "#166534",
    title: "Resultado exacto",
    description: "Ganás +3 PTS por acertar el marcador exacto del partido.",
  },
  {
    id: "3",
    badge: "×2",
    badgeColor: colors.primary,
    badgeTextColor: colors.background,
    title: "Comodín",
    description:
      "Podés usar el comodín una sola vez durante todo el torneo. Duplica los puntos obtenidos en ese partido.",
  },
  {
    id: "4",
    badge: "+3\nPTS",
    badgeColor: "#DCFCE7",
    badgeTextColor: "#166534",
    title: "Goleador del torneo",
    description:
      "Si acertás el goleador del torneo al inicio de la quiniela, sumás 3 puntos adicionales.",
  },
  {
    id: "5",
    badge: "⚖️",
    badgeColor: colors.neutral100,
    badgeTextColor: colors.text,
    title: "Empates y fase eliminatoria",
    description:
      "En caso de empate en el ranking, los premios se dividen en partes iguales.\n\nA partir de dieciseisavos, el resultado válido incluye el tiempo extra. Si el partido continúa empatado, se considera empate — los penales no cuentan.",
  },
];

interface RulesOnboardingProps {
  visible: boolean;
  onFinish: () => void;
}

export function RulesOnboarding({ visible, onFinish }: RulesOnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLast = currentSlide === SLIDES.length - 1;
  const slide = SLIDES[currentSlide];

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Indicadores */}
          <View style={styles.indicators}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentSlide && styles.indicator__active,
                  index < currentSlide && styles.indicator__done,
                ]}
              />
            ))}
          </View>

          {/* Step label */}
          <Text style={styles.step}>
            STEP {currentSlide + 1} OF {SLIDES.length}
          </Text>

          {/* Badge */}
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: slide.badgeColor }]}>
              <Text
                style={[styles.badge__text, { color: slide.badgeTextColor }]}
              >
                {slide.badge}
              </Text>
            </View>
          </View>

          {/* Contenido */}
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>

          {/* Botones */}
          <View style={styles.buttons}>
            {currentSlide > 0 && (
              <Pressable
                style={styles.button__back}
                onPress={() => setCurrentSlide((prev) => prev - 1)}
              >
                <Text style={styles.button__backText}>← Anterior</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, currentSlide > 0 && styles.button__flex]}
              onPress={handleNext}
            >
              <Text style={styles.button__text}>
                {isLast ? "Finalizar" : "Siguiente →"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
