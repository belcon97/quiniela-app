import type { TextStyle } from "react-native";
import {
  font,
  fontSize,
  fontWeight,
  tracking,
  lineHeightMultiplier,
} from "./tokens";

// Calcula lineHeight absoluto a partir del fontSize y el multiplicador
const lh = (size: number, multiplier: number) => Math.round(size * multiplier);

// Display
export const display: Record<string, TextStyle> = {
  "2xl": {
    fontFamily: font.archiveBlack,
    fontSize: fontSize.displayXl,
    fontWeight: fontWeight.black,
    lineHeight: lh(fontSize.displayXl, lineHeightMultiplier.tight),
    letterSpacing: tracking.display,
  },
  xl: {
    fontFamily: font.archiveBlack,
    fontSize: fontSize.displayLg,
    fontWeight: fontWeight.black,
    lineHeight: lh(fontSize.displayLg, lineHeightMultiplier.tight),
    letterSpacing: tracking.display,
  },
  lg: {
    fontFamily: font.archiveBlack,
    fontSize: fontSize.displayMd,
    fontWeight: fontWeight.black,
    lineHeight: lh(fontSize.displayMd, lineHeightMultiplier.snug),
    letterSpacing: tracking.display,
  },
};

// Headings
export const heading: Record<string, TextStyle> = {
  h1: {
    fontFamily: font.archivoBold,
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: lh(fontSize.h1, 1.15),
    letterSpacing: -0.16,
  },
  h2: {
    fontFamily: font.archivoBold,
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    lineHeight: lh(fontSize.h2, 1.2),
  },
  h3: {
    fontFamily: font.notoSemibold,
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
    lineHeight: lh(fontSize.h3, 1.25),
  },
};

// Body
export const body: Record<string, TextStyle> = {
  lg: {
    fontFamily: font.notoRegular,
    fontSize: fontSize.bodyLg,
    lineHeight: lh(fontSize.bodyLg, lineHeightMultiplier.normal),
  },
  base: {
    fontFamily: font.notoRegular,
    fontSize: fontSize.body,
    lineHeight: lh(fontSize.body, lineHeightMultiplier.normal),
  },
  sm: {
    fontFamily: font.notoRegular,
    fontSize: fontSize.bodySm,
    lineHeight: lh(fontSize.bodySm, lineHeightMultiplier.normal),
  },
};

// Label
export const label: TextStyle = {
  fontFamily: font.notoBold,
  fontSize: fontSize.caption,
  fontWeight: fontWeight.bold,
  letterSpacing: tracking.label,
};

// Micro
export const micro: TextStyle = {
  fontFamily: font.notoBold,
  fontSize: fontSize.micro,
  fontWeight: fontWeight.bold,
  letterSpacing: tracking.micro,
};

//  Button
export const btnText: TextStyle = {
  fontFamily: font.archivoBold,
  fontSize: fontSize.bodySm,
  fontWeight: fontWeight.bold,
  letterSpacing: 0.6,
};

export const typography = {
  display,
  heading,
  body,
  label,
  micro,
  btnText,
} as const;
