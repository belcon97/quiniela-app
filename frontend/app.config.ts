import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "ProdeMundial26",
  slug: "prode-mundial-26",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/icon.png",
    resizeMode: "contain",
    backgroundColor: "#001F5B",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.belcon.quiniela",
  },
  android: {
    package: "com.belcon.quiniela",
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#001F5B",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: "./assets/images/icon.png",
  },
  plugins: [
    "expo-font",
    "expo-secure-store",
    "@react-native-community/datetimepicker",
  ],
  extra: {
    eas: {
      projectId: "e4129d4a-82c6-4c63-a93d-c19d224cb7e2",
    },
  },
})