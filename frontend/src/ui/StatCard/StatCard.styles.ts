import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#888",
    marginBottom: 6,
    fontFamily: "Inter_600SemiBold",
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Inter_700Bold",
  },
});
