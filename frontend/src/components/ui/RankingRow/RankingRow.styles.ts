import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowActive: {
    backgroundColor: "#f0f7ff",
    borderBottomWidth: 0,
  },
  position: {
    width: 24,
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 8,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  username: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  points: {
    fontSize: 14,
    fontWeight: "700",
  },
});
