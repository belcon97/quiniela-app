import { FlatList, ActivityIndicator, View } from "react-native";
import { useRef, useState, useEffect } from "react";

import { styles } from "./UpcomingMatches.styles";

// components
import { MatchCard } from "../ui/MatchCard/MatchCard";

// Types
import { UpcomingMatch } from "../../types/home.types";

interface Props {
  matches: UpcomingMatch[];
  loading: boolean;
}

export function UpcomingMatches({ matches, loading }: Props) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (matches.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev === matches.length - 1 ? 0 : prev + 1;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [matches]);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.list}
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
