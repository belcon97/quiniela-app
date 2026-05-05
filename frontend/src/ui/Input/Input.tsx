import { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./Input.styles";
import { colors } from "@/styles/theme";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  hasError?: boolean;
  secureTextEntry?: boolean;
}

export default function Input({
  value,
  onChangeText,
  placeholder,
  icon,
  hasError = false,
  secureTextEntry = false,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.input, hasError && styles.input_error]}>
      {icon && <View style={styles.input__icon}>{icon}</View>}

      <TextInput
        style={styles.input__field}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        autoCapitalize="none"
        placeholderTextColor={colors.textPlaceholder}
        underlineColorAndroid="transparent" // Para Android
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
