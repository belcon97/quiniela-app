import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Hooks
import { useMatches } from "@/features/admin/hooks/useMatches";

// Components
import { CreateMatchForm } from "./CreateMatchForm/CreateMatchForm";
import { MatchesList } from "./MatchesList/MatchesList";

// Styles
import { styles } from "./MatchesTab.styles";

type SubTab = "create" | "list";

const SUBTABS: { key: SubTab; label: string }[] = [
  { key: "create", label: "Crear partido" },
  { key: "list", label: "Partidos" },
];

export function MatchesTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("create");
  const {
    matches,
    loading,
    creating,
    createError,
    createSuccess,
    updating,
    updateError,
    deleting,
    deleteError,
    fetchMatches,
    handleCreate,
    handleUpdateScore,
    handleDelete,
    clearCreateError,
    clearCreateSuccess,
    clearUpdateError,
    clearDeleteError,
  } = useMatches();

  const handleSubTabChange = (tab: SubTab) => {
    setActiveSubTab(tab);
    if (tab === "list") fetchMatches();
  };

  return (
    <View style={styles.container}>
      {/* Subtabs */}
      <View style={styles.subtabs}>
        {SUBTABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.subtab,
              activeSubTab === tab.key && styles.subtab__active,
            ]}
            onPress={() => handleSubTabChange(tab.key)}
          >
            <Text
              style={[
                styles.subtab__label,
                activeSubTab === tab.key && styles.subtab__label_active,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {activeSubTab === "create" && (
          <CreateMatchForm
            onCreate={handleCreate}
            creating={creating}
            createError={createError}
            createSuccess={createSuccess}
            onClearError={clearCreateError}
            onClearSuccess={clearCreateSuccess}
          />
        )}
        {activeSubTab === "list" && (
          <MatchesList
            matches={matches}
            loading={loading}
            updating={updating}
            updateError={updateError}
            deleting={deleting}
            deleteError={deleteError}
            onUpdateScore={handleUpdateScore}
            onDelete={handleDelete}
            onClearUpdateError={clearUpdateError}
            onClearDeleteError={clearDeleteError}
          />
        )}
      </View>
    </View>
  );
}