import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Bloque
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: "#fff",
  },

  // Elementos
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    pointerEvents: "none",
  },
});