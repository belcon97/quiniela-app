import { View, Text, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";
import { colors } from "@/styles/theme";
import { styles } from "./PredictionPendingOverlay.styles";

export function PredictionPendingOverlay() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.blur}>
        <View style={styles.card}>
          <MaterialIcons name="lock" size={32} color={colors.primary} />
          <Text style={styles.title}>Contenido bloqueado</Text>
          <Text style={styles.description}>
            Para ver las predicciones de otros usuarios, primero completá las tuyas.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Profile", undefined)}
          >
            <Text style={styles.button__text}>Ir a mi perfil</Text>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}