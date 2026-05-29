import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";

// Components
import { Layout } from "@/layout/Layout";
// Styles
import { styles } from "./Rules.styles";
// Types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

export function Rules() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  const containerStyle = [styles.rules, { paddingTop: insets.top }];

  return (
    <Layout>
    <View style={containerStyle}>
      <ScrollView contentContainerStyle={styles.rules__scroll}>

        {/* Header */}
        <View style={styles.rules__header}>
          <Text style={styles.rules__title}>Reglas del Juego</Text>
          <Text style={styles.rules__subtitle}>PUNTUACIÓN Y FUNCIONAMIENTO</Text>
        </View>

        {/* Seccion puntuacion */}
        <View style={styles.rules__section}>
          <View style={styles.rules__sectionHeader}>
            <Text style={styles.rules__sectionTitle}>Puntuación</Text>
            <MaterialIcons name="scoreboard" size={20} color={colors.secondary} />
          </View>

          {/* +1 PT */}
          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, styles.rules__badge__yellow]}>
              <Text style={[styles.rules__badgeText, styles.rules__badgeText__yellow]}>+1{"\n"}PT</Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Ganador o empate</Text>
              <Text style={styles.rules__cardDesc}>
                Acertás el ganador del partido o el empate, pero no el resultado exacto.
              </Text>
            </View>
          </View>

          {/* +3 PTS */}
          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, styles.rules__badge__green]}>
              <Text style={[styles.rules__badgeText, styles.rules__badgeText__green]}>+3{"\n"}PTS</Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Resultado exacto</Text>
              <Text style={styles.rules__cardDesc}>
                Acertás el ganador y el marcador exacto del partido.
              </Text>
            </View>
          </View>

          {/* Comodin — card destacada */}
          <View style={styles.rules__card__wildcard}>
            <View style={styles.rules__wildcardBadge}>
              <Text style={styles.rules__wildcardBadgeText}>×2</Text>
            </View>
            <View style={styles.rules__wildcardHeader}>
              <Text style={styles.rules__wildcardTitle}>Comodín</Text>
              <View style={styles.rules__wildcardChip}>
                <Text style={styles.rules__wildcardChipText}>LIMITED</Text>
              </View>
            </View>
            <Text style={styles.rules__wildcardDesc}>
              Podés usar el comodín una sola vez durante la fase de grupos. Duplica los puntos obtenidos en ese partido.
            </Text>
          </View>

          {/* Goleador */}
          <View style={styles.rules__card}>
            <View style={[styles.rules__badge, styles.rules__badge__green]}>
              <Text style={[styles.rules__badgeText, styles.rules__badgeText__green]}>+3{"\n"}PTS</Text>
            </View>
            <View style={styles.rules__cardContent}>
              <Text style={styles.rules__cardTitle}>Goleador del torneo</Text>
              <Text style={styles.rules__cardDesc}>
                Si acertás el goleador del torneo al inicio de la quiniela, sumás 3 puntos adicionales.
              </Text>
            </View>
          </View>
        </View>

        {/* Seccion empates */}
        <View style={styles.rules__section}>
          <View style={styles.rules__empates}>
            <Text style={styles.rules__empatesLabel}>EMPATES EN EL RANKING</Text>
            <Text style={styles.rules__empatesText}>
              En caso de empate entre dos o más participantes, los premios se suman y se dividen en partes iguales entre los empatados.
            </Text>
          </View>
        </View>

        {/* Seccion fase eliminatoria */}
        <View style={styles.rules__section}>
          <View style={styles.rules__sectionHeader}>
            <MaterialIcons name="info-outline" size={18} color={colors.text} />
            <Text style={styles.rules__sectionTitle}>Fase Eliminatoria</Text>
          </View>
          <View style={styles.rules__sectionDivider} />

          <Text style={styles.rules__body}>
            A partir de cuartos de final, el resultado válido incluye el tiempo extra. Si el partido continúa empatado en tiempo extra, se considera empate — los penales no cuentan.
          </Text>

          {/* Advertencia */}
          <View style={styles.rules__warning}>
            <MaterialIcons name="schedule" size={16} color={colors.tertiary} />
            <Text style={styles.rules__warningText}>
              Los pronósticos para cada fase eliminatoria deben enviarse con al menos 24 horas de anticipación al primer partido de esa fase.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>

    </Layout>
  );
}