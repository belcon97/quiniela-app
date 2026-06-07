import { useState } from "react";
import { View, Text, Pressable, ImageBackground, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Store
import { useAuthStore } from "@/store/authStore";
// Components
import { MatchesTab } from "@/features/admin/components/MatchesTab/MatchesTab";
import { TopScorersTab } from "@/features/admin/components/TopScorersTab/TopScorersTab";
import { UsersTab } from "@/features/admin/components/UsersTab/UsersTab";
// Styles
import { makeStyles } from "./AdminDashboard.styles";

const BG_IMAGE = require("../../../assets/images/teams/default.png");

type MainTab = "matches" | "topScorers" | "users";

const MAIN_TABS: { key: MainTab; label: string }[] = [
  { key: "matches", label: "PARTIDOS" },
  { key: "topScorers", label: "GOLEADORES" },
  { key: "users", label: "USUARIOS" },
];

export default function AdminDashboard() {
  const styles = useStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const logout = useAuthStore((state) => state.logout);

  const [activeTab, setActiveTab] = useState<MainTab>("matches");

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      {Platform.OS === "web" ? (
        <View style={[styles.header, styles.headerWeb]}>
          <View style={styles.headerOverlay} pointerEvents="none" />
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>PANEL ADMIN</Text>
              <Text style={styles.headerSubtitle}>Mundial 2026</Text>
            </View>
            <Pressable onPress={logout}>
              <Feather name="log-out" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      ) : (
        <ImageBackground
          source={BG_IMAGE}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay} pointerEvents="none" />
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>PANEL ADMIN</Text>
              <Text style={styles.headerSubtitle}>Mundial 2026</Text>
            </View>
            <Pressable onPress={logout}>
              <Feather name="log-out" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </ImageBackground>
      )}

      {/* Main tabs */}
      <View style={styles.mainTabs}>
        {MAIN_TABS.map((tab) => (
          <Pressable
            key={tab.key}
            style={[
              styles.mainTab,
              activeTab === tab.key && styles.mainTab_active,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.mainTabText,
                activeTab === tab.key && styles.mainTabText_active,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "matches" && <MatchesTab />}
        {activeTab === "topScorers" && <TopScorersTab />}
        {activeTab === "users" && <UsersTab />}
      </View>
    </View>
  );
}
