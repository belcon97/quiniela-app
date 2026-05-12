import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  colorBar: {
    width: 4,
    height: "100%",
    borderRadius: 4,
    alignSelf: "stretch",
  },
  flags: {
    gap: 4,
  },
  flag: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  info: {
    flex: 1,
  },
  matchName: {
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#000",
  },
  scores: {
    fontSize: 12,
    color: "#888",
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  pointsGreen: {
    backgroundColor: "#22c55e",
  },
  pointsYellow: {
    backgroundColor: "#eab308",
  },
  pointsRed: {
    backgroundColor: "#ef4444",
  },
});
