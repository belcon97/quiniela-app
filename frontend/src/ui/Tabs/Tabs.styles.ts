import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    color: "#888",
  },
  tabLabelActive: {
    color: "#000",
  },
  content: {
    flex: 1,
  },
});
