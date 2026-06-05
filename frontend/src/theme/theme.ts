import { dark, light, semantic } from "./colors";
import { palette, space, radius } from "./tokens";

// ThemeColors cumple con lo que hay en "dark"
export type ThemeColors = typeof dark;

export interface Theme extends ThemeColors {
  semantic: typeof semantic;
  palette: typeof palette;
  space: typeof space;
  radius: typeof radius;
  isDark: boolean;
}

// Dark Theme
export const darkTheme: Theme = {
  ...dark,
  semantic,
  palette,
  space,
  radius,
  isDark: true,
};

// LightTheme
export const lightTheme: Theme = {
  ...light,
  semantic,
  palette,
  space,
  radius,
  isDark: false,
};
