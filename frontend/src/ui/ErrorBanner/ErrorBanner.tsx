import { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors, typography, spacing, radius } from "@/styles/theme";

type ErrorBannerProps = {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
};

export default function ErrorBanner({
  message,
  visible,
  onHide,
  duration = 3000,
}: ErrorBannerProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-8)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(duration),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -8,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start(onHide);
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.banner, { opacity, transform: [{ translateY }] }]}
    >
      <Feather name="alert-circle" size={16} color={colors.error} />
      <Text style={styles.banner__text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#FEE2E2",
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  banner__text: {
    color: colors.error,
    fontFamily: typography.medium,
    fontSize: typography.sm,
    flex: 1,
  },
});
