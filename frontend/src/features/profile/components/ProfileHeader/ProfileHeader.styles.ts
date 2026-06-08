import { StyleSheet } from "react-native";
import { font, fontSize, space, radius, palette } from "@/theme";
import type { Theme } from "@/theme";

const IMAGE_OVERLAY = "rgba(0, 0, 0, 0.35)";
const TEXT_ON_IMAGE = "#FFFFFF";
const TEXT_ON_IMAGE_MUTED = "#FFFFFF";

export function makeStyles(_t: Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: 220,
      borderRadius: radius.xl,
      overflow: "hidden",
    },
    bg: {
      flex: 1,
      
      width: '100%',
      height: '100%',
      justifyContent: "flex-end",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: IMAGE_OVERLAY,
    },

    // Content
    content: {
      padding: space[5],
      gap: space[3],
    },

    userRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[3],
    },
    userInfo: {
      flex: 1,
      gap: 2,
    },
    name: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h1,
      color: TEXT_ON_IMAGE,
      textTransform: "uppercase",
      letterSpacing: -0.56,
    },
    role: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: TEXT_ON_IMAGE_MUTED,
    },

    // Wildcard badge
    wildcard: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      gap: space[2],
      paddingVertical: space[2],
      paddingHorizontal: space[3],
      borderRadius: radius.full,
      borderWidth: 1.5,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    wildcard_active: {
      backgroundColor: "rgba(0, 166, 81, 0.3)",
      borderColor: "#00A651",
    },
    wildcard_inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    wildcardBadge: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.caption,
      color: TEXT_ON_IMAGE,
    },
    wildcardLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.caption,
      color: TEXT_ON_IMAGE,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    wildcardStatus: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: TEXT_ON_IMAGE_MUTED,
    },

    // Stats row
    statsRow: {
      flexDirection: "row",
      gap: space[3],
    },
    statBox: {
      flex: 1,
      backgroundColor: "rgba(132, 124, 124, 0.39)",
      borderRadius: radius.md,
      padding: space[3],
      gap: 2,
    },
    statLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: TEXT_ON_IMAGE_MUTED,
      letterSpacing: 1.28,
      textTransform: "uppercase",
    },
    statValue: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h2,
      color: TEXT_ON_IMAGE,
    },
    statValue_ranking: {
      color: palette.green,
    },
    badges: {
      flexDirection: "row",
      gap: space[3],
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[2],
      paddingVertical: space[1],
      paddingHorizontal: space[3],
      borderRadius: radius.full,
      borderWidth: 1,
    },
    badge_active: {
      borderColor: "rgba(255,255,255,0.6)",
      backgroundColor: "rgba(255,255,255,0.15)",
    },
    badge_inactive: {
      borderColor: "rgba(255,255,255,0.2)",
      backgroundColor: "transparent",
    },
    badgeIcon: {
      fontSize: fontSize.caption,
      color: "#FFFFFF",
    },
    badgeLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: "rgba(255,255,255,0.7)",
      letterSpacing: 0.5,
    },
    badgeStatus: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: "#FFFFFF",
      maxWidth: 80,
    },
  });
}
