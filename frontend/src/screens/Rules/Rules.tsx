import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./Rules.styles";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

type RulesNavigationProp = NativeStackNavigationProp<AppStackParams, "Rules">;

export default function Rules({
  navigation,
}: {
  navigation: RulesNavigationProp;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.rules, { paddingTop: insets.top }]}>
      <View style={styles.rules__header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.rules__title}>Reglas</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.rules__scroll}>
        <Text style={styles.rules__intro}>
          La quiniela es con fines de entretenimiento. Los pronósticos se
          puntúan de la siguiente manera:
        </Text>

        <View style={styles.rules__section}>
          <Text style={styles.rules__sectionTitle}>Puntuación</Text>

          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, { backgroundColor: "#FEF9C3" }]}>
              <Text style={[styles.rules__badgeText, { color: "#854D0E" }]}>
                +1 PT
              </Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Ganador o empate</Text>
              <Text style={styles.rules__cardDesc}>
                Acertás el ganador del partido o el empate, pero no el resultado
                exacto.
              </Text>
            </View>
          </View>

          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, { backgroundColor: "#DCFCE7" }]}>
              <Text style={[styles.rules__badgeText, { color: "#166534" }]}>
                +3 PTS
              </Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Resultado exacto</Text>
              <Text style={styles.rules__cardDesc}>
                Acertás el ganador y el marcador exacto del partido.
              </Text>
            </View>
          </View>

          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, { backgroundColor: "#EDE9FE" }]}>
              <Text style={[styles.rules__badgeText, { color: "#5B21B6" }]}>
                ×2
              </Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Comodín</Text>
              <Text style={styles.rules__cardDesc}>
                Podés usar el comodín una sola vez durante la fase de grupos.
                Duplica los puntos obtenidos en ese partido.
              </Text>
            </View>
          </View>

          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, { backgroundColor: "#DCFCE7" }]}>
              <Text style={[styles.rules__badgeText, { color: "#166534" }]}>
                +3 PTS
              </Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Goleador del torneo</Text>
              <Text style={styles.rules__cardDesc}>
                Si acertás el goleador del torneo al inicio de la quiniela,
                sumás 3 puntos adicionales.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rules__section}>
          <Text style={styles.rules__sectionTitle}>Empates en el ranking</Text>
          <Text style={styles.rules__body}>
            En caso de empate entre dos o más participantes, los premios se
            suman y se dividen en partes iguales entre los empatados.
          </Text>
        </View>

        <View style={styles.rules__section}>
          <Text style={styles.rules__sectionTitle}>Fase eliminatoria</Text>
          <Text style={styles.rules__body}>
            A partir de cuartos de final, el resultado válido incluye el tiempo
            extra. Si el partido continúa empatado en tiempo extra, se considera
            empate — los penales no cuentan.
          </Text>
          <Text style={[styles.rules__body, { marginTop: 8 }]}>
            Los pronósticos para cada fase eliminatoria deben enviarse con al
            menos 24 horas de anticipación al primer partido de esa fase.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
