import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

// Store
import { useAuthStore } from "@/store/authStore";

// Features
import { MatchesTab } from "@/features/admin/components/MatchesTab/MatchesTab";
import { TopScorersTab } from "@/features/admin/components/TopScorersTab/TopScorersTab";
import { UsersTab } from "@/features/admin/components/UsersTab/UsersTab";

// Styles
import { styles } from "./AdminDashboard.styles";

type Tab = "matches" | "topScorers" | "users";

const TABS: { key: Tab; label: string }[] = [
  { key: "matches", label: "Partidos" },
  { key: "topScorers", label: "Goleadores" },
  { key: "users", label: "Usuarios" },
];

export default function AdminDashboard() {
  const { logout } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>("matches");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View>
          <Text style={styles.header__title}>Panel Admin</Text>
          <Text style={styles.header__subtitle}>Mundial 2026</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.header__logout}>
          <Feather name="log-out" size={20} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tab__active]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tab__label,
                activeTab === tab.key && styles.tab__label_active,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {activeTab === "matches" && <MatchesTab />}
        {activeTab === "topScorers" && <TopScorersTab />}
        {activeTab === "users" && <UsersTab />}
      </View>
    </View>
  );
}