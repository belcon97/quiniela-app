import {
  useFonts,
  Archivo_700Bold,
  Archivo_900Black,
} from "@expo-google-fonts/archivo";
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";

export function useAppFonts(): boolean {
  const [fontsLoaded, fontError] = useFonts({
    Archivo_700Bold,
    Archivo_900Black,
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });

  // Seguimos con fuente del sistema en el caso de error
  return fontsLoaded || !!fontError;
}
