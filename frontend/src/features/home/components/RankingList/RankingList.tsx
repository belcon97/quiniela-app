import { View } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { SectionHeader } from "@/features/home/components/SectionHeader/SectionHeader";
import { RankingTable } from "@/shared/components/RankingTable/RankingTable";
import { StateView } from "@/shared/ui/StateView/StateView";
// Utils
import { getFlagByTeam } from "@/shared/utils/getFlagByTeam";
// Types
import type { RankingEntry, RankingRowData } from "@/shared/types";
// Styles
import { makeStyles } from "./RankingList.styles";

interface RankingListProps {
  ranking: RankingEntry[];
  myUsername?: string;
  onViewMore?: () => void;
  onRowPress?: (username: string) => void;
}

export function RankingList({
  ranking,
  myUsername,
  onViewMore,
  onRowPress,
}: RankingListProps) {
  const styles = useStyles(makeStyles);

  const rankingRows: RankingRowData[] = ranking.map((entry) => ({
    position: entry.position,
    name: entry.name,
    username: entry.username,
    flagUrl: getFlagByTeam(entry.favoriteTeam),
    points: entry.totalPoints,
  }));

  const top5 = rankingRows.slice(0, 5);
  const myEntry = rankingRows.find((row) => row.username === myUsername);
  const isInTop5 = top5.some((row) => row.username === myUsername);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SectionHeader
        title="RANKING GENERAL"
        icon="bar-chart-2"
        onViewMore={onViewMore}
      />

      {/* Table */}
      {ranking.length === 0 ? (
        <StateView
          icon="bar-chart-2"
          title="SIN RANKING"
          message="Todavía no hay puntos registrados."
        />
      ) : (
        <RankingTable
          data={top5}
          myUsername={myUsername}
          myEntry={isInTop5 ? undefined : myEntry}
          onRowPress={onRowPress}
        />
      )}
    </View>
  );
}
