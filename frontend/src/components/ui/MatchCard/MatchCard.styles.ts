import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffd6d6ff",
    borderRadius: 16,
    padding: 16,
    width: width * 0.7,
    height: 160,
    marginRight: 12,
    shadowColor: "#1f1e1eff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  stadium: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
    textAlign: "right",
    marginBottom: 16,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: {
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 36,
    marginBottom: 6,
  },
  teamName: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  vs: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999",
    paddingHorizontal: 8,
  },
  date: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
});
