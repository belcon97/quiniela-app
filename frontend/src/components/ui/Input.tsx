import { View, Text, TextInput } from "react-native";
import { inputStyles } from "../../styles/ui";
import { colors } from "../../styles/theme";

type InputVariant = "form" | "search";

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: InputVariant;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
}

export default function Input({
  label,
  placeholder,
  error,
  value,
  onChangeText,
  variant = "form",
  icon,
  secureTextEntry = false,
}: InputProps) {
  if (variant === "search") {
    return (
      <View style={inputStyles.searchContainer}>
        {icon && icon}
        <TextInput
          style={inputStyles.search}
          placeholder={placeholder || "Search"}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.secondary}
        />
      </View>
    );
  }

  return (
    <View style={inputStyles.container}>
      {label && <Text style={inputStyles.label}>{label}</Text>}
      <TextInput
        style={inputStyles.form}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholderTextColor={colors.secondary}
      />
      {error && <Text style={inputStyles.error}>{error}</Text>}
    </View>
  );
}
