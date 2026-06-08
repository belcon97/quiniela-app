import { View } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { SectionHeader } from "@/features/home/components/SectionHeader/SectionHeader";
import { TopScorerRow } from "@/features/home/components/TopScorerRow/TopScorerRow";
import { StateView } from '@/shared/ui/StateView/StateView'
// Types
import type { TopScorer } from "@/shared/types";
// Styles
import { makeStyles } from "./TopScorersList.styles";

interface TopScorersListProps {
  scorers: TopScorer[];
}

export function TopScorersList({ scorers }: TopScorersListProps) {
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.container}>

      {/* Header */}
      <SectionHeader
        title="TOP GOLEADORES"
        icon="award"
      />

      {/* List */}
      <View style={styles.list}>
        {scorers.length === 0
          ? (
            <StateView
              icon="award"
              title="SIN GOLEADORES"
              message="No hay goleadores registrados aún."
            />
          ) : (
            scorers.map((scorer, index) => (
              <TopScorerRow
                key={scorer.id}
                player={scorer}
                position={index + 1}
              />
            ))
          )
        }
      </View>

    </View>
  )
}