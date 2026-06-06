import { View, Text, Pressable } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Styles
import { makeStyles } from "./AdminSubTabs.styles";

interface SubTabOption {
  key: string;
  label: string;
}

interface AdminSubTabsProps {
  options: SubTabOption[];
  active: string;
  onChange: (key: string) => void;
}

export function AdminSubTabs({ options, active, onChange }: AdminSubTabsProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Pressable
          key={option.key}
          style={[styles.tab, active === option.key && styles.tab_active]}
          onPress={() => onChange(option.key)}
        >
          <Text
            style={[
              styles.tabText,
              active === option.key && styles.tabText_active,
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
