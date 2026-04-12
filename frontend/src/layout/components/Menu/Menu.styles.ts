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
    left: 0,
    width: MENU_WIDTH,
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 11,
    padding: 24,
  },
  // Usuario
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  userUsername: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  // Items de navegación
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  navItemActive: {
    backgroundColor: "#f5f5f5",
  },
  navItemText: {
    fontSize: 15,
    fontWeight: "500",
  },

  // Logout
  footer: {
    position: "absolute",
    bottom: 40,
    left: 24,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutText: {
    fontSize: 15,
    color: "#ff3b30",
    fontWeight: "500",
  },
});

export { MENU_WIDTH };
