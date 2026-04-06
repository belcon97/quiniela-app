import { TouchableOpacity, Text, View } from "react-native";
import { buttonStyles } from "../../styles/ui";

type ButtonVariant = "primary" | "secondary" | "outlined";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  onPress,
  variant = "primary",
  icon,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.base,
        buttonStyles[variant],
        disabled && { opacity: 0.4 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text
          style={[
            buttonStyles.baseText,
            buttonStyles[`${variant}Text` as keyof typeof buttonStyles],
          ]}
        >
          {children}
        </Text>
        {icon && icon}
      </View>
    </TouchableOpacity>
  );
}
