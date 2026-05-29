import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
// Styles
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

export function Tabs({ tabs, activeTab: controlledTab, onTabChange }: TabsProps) {
  const [internalTab, setInternalTab] = useState(0);

  const isControlled = controlledTab !== undefined;
  const activeTab = isControlled ? controlledTab : internalTab;

  const handleTabChange = (index: number) => {
    if (!isControlled) setInternalTab(index);
    onTabChange?.(index);
  };

  return (
    <View style={styles.tabs}>

      {/* Tab bar */}
      <View style={styles.tabs__bar}>
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.label}
            style={[styles.tabs__tab, activeTab === index && styles.tabs__tab__active]}
            onPress={() => handleTabChange(index)}
          >
            <Text style={[styles.tabs__label, activeTab === index && styles.tabs__label__active]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Contenido */}
      <ScrollView style={styles.tabs__content}>
        {tabs[activeTab].content}
      </ScrollView>

    </View>
  );
}