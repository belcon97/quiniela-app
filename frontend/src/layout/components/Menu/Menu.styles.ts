import { StyleSheet, Dimensions } from "react-native";

const MENU_WIDTH = Dimensions.get("window").width * 0.75;

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },

  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: MENU_WIDTH,
    backgroundColor: "#fff",
    zIndex: 11,
    paddingHorizontal: 24,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 24,
  },
  closeButton: {
    marginLeft: "auto",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  navItem__active: {
    backgroundColor: "#f5f5f5",
  },
  navItem__text: {
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 8,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutItem__text: {
    fontSize: 15,
    color: "#ff3b30",
    fontWeight: "500",
  },
});

export { MENU_WIDTH };