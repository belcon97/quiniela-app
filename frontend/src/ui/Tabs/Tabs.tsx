import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Tabs.styles";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export function Tabs({
  tabs,
  activeTab: controlledTab,
  onTabChange,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(0);

  const isControlled = controlledTab !== undefined;
  const activeTab = isControlled ? controlledTab : internalTab;

  const handleTabChange = (index: number) => {
    if (!isControlled) setInternalTab(index);
    onTabChange?.(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, activeTab === index && styles.tabActive]}
            onPress={() => handleTabChange(index)}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === index && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>{tabs[activeTab].content}</View>
    </View>
  );
}
