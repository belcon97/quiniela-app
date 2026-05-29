import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Bloque
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  // Elementos
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 6,
    gap: 2,
  },

  // Modificadores — icon
  icon__active: {
    color: "#6366F1",
  },
  icon__inactive: {
    color: "#9CA3AF",
  },

  // Modificadores — label
  label__active: {
    fontSize: 11,
    color: "#6366F1",
    fontWeight: "600",
  },
  label__inactive: {
    fontSize: 11,
    color: "#9CA3AF",
  },
});