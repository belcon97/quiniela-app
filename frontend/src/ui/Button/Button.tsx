import { useRef } from "react";
import { Pressable, Text, Animated } from "react-native";
import { styles, buttonTextStyles } from "./Button.styles";

type ButtonVariant = "primary" | "secondary" | "outlined";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  children,
  onPress,
  variant = "primary",
  icon,
  disabled,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button__base,
          styles[`button__${variant}`],
          disabled && { opacity: 0.4 },
          { transform: [{ scale }] },
        ]}
      >
        <Text
          style={[
            buttonTextStyles.button__text_base,
            buttonTextStyles[`button__text_${variant}`],
          ]}
        >
          {children}
        </Text>
        {icon}
      </Animated.View>
    </Pressable>
  );
}
