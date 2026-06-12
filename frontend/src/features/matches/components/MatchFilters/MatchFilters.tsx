// React Native
import { View, ScrollView } from "react-native";

// Hooks
import { useStyles } from "@/shared/hooks/useStyles";

// Components
import { Chip } from "@/shared/ui/Chip/Chip";

// Styles
import { makeStyles } from "./MatchFilters.styles";

// Types
import type { MatchFilter } from "../../types/matches.types";

const FILTERS: MatchFilter[] = ["TODOS", "POR JUGAR", "JUGADOS"];

interface MatchFiltersProps {
  activeFilter: MatchFilter;
  selectedGroup: string;
  groups: string[];
  onFilterChange: (filter: MatchFilter) => void;
  onGroupChange: (group: string) => void;
}

export function MatchFilters({
  activeFilter,
  selectedGroup,
  groups,
  onFilterChange,
  onGroupChange,
}: MatchFiltersProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={styles.container}>
      {/* Status tabs */}
      <View style={styles.filters}>
        {FILTERS.map((filter) => (
          <Chip
            key={filter}
            isActive={activeFilter === filter}
            onPress={() => onFilterChange(filter)}
          >
            {filter}
          </Chip>
        ))}
      </View>

      {/* Grupos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.groups}
      >
        <Chip
          isActive={selectedGroup === "TODOS"}
          onPress={() => onGroupChange("TODOS")}
        >
          TODOS
        </Chip>
        {groups.map((g) => (
          <Chip
            key={g}
            isActive={selectedGroup === g}
            onPress={() => onGroupChange(g)}
          >
            {g}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}
