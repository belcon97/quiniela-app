import { useState } from "react";
import { View, TextInput, Pressable, Platform, type TextInputProps } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./Input.styles";
import { colors } from "@/styles/theme";

interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  hasError?: boolean;
}

export default function Input({
  icon,
  hasError = false,
  secureTextEntry = false,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.input, hasError && styles.input_error]}>
      {icon && <View style={styles.input__icon}>{icon}</View>}

      <TextInput
        style={styles.input__field}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        autoCapitalize="none"
        placeholderTextColor={colors.textPlaceholder}
        underlineColorAndroid="transparent"
        // En web forzamos type="text" para evitar el slider del browser
        {...(Platform.OS === "web" ? { type: "text" } : {})}
        {...props}
      />

      {secureTextEntry && (
        <Pressable
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={styles.input__eye}
        >
          <Feather
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={18}
            color={colors.neutral400}
          />
        </Pressable>
      )}
    </View>
  );
}