/**
 * HangiKredi E-Ticaret - Minimal Tema (shadcn Neutral)
 * HSL değerleri HEX'e çevrildi
 */

export const Colors = {
  light: {
    background: "#ffffff", // 0 0% 100%
    foreground: "#0a0a0a", // 0 0% 3.9%
    card: "#ffffff", // 0 0% 100%
    cardForeground: "#0a0a0a", // 0 0% 3.9%
    primary: "#171717", // 0 0% 9%
    primaryForeground: "#fafafa", // 0 0% 98%
    secondary: "#f5f5f5", // 0 0% 96.1%
    secondaryForeground: "#171717", // 0 0% 9%
    muted: "#f5f5f5", // 0 0% 96.1%
    mutedForeground: "#737373", // 0 0% 45.1%
    accent: "#f5f5f5", // 0 0% 96.1%
    accentForeground: "#171717", // 0 0% 9%
    destructive: "#ef4444", // 0 84.2% 60.2%
    destructiveForeground: "#fafafa", // 0 0% 98%
    border: "#e5e5e5", // 0 0% 89.8%
    input: "#e5e5e5", // 0 0% 89.8%
    ring: "#0a0a0a", // 0 0% 3.9%
  },
  dark: {
    background: "#0a0a0a", // 0 0% 3.9%
    foreground: "#fafafa", // 0 0% 98%
    card: "#0a0a0a", // 0 0% 3.9%
    cardForeground: "#fafafa", // 0 0% 98%
    primary: "#fafafa", // 0 0% 98%
    primaryForeground: "#171717", // 0 0% 9%
    secondary: "#262626", // 0 0% 14.9%
    secondaryForeground: "#fafafa", // 0 0% 98%
    muted: "#262626", // 0 0% 14.9%
    mutedForeground: "#a3a3a3", // 0 0% 63.9%
    accent: "#262626", // 0 0% 14.9%
    accentForeground: "#fafafa", // 0 0% 98%
    destructive: "#7f1d1d", // 0 62.8% 30.6%
    destructiveForeground: "#fafafa", // 0 0% 98%
    border: "#262626", // 0 0% 14.9%
    input: "#262626", // 0 0% 14.9%
    ring: "#d4d4d4", // 0 0% 83.1%
  },
};

// Varsayılan olarak light mode kullan
export const Theme = Colors.light;

// Typography
export const Typography = {
  family: {
    regular: "Outfit_400Regular",
    medium: "Outfit_500Medium",
    semiBold: "Outfit_600SemiBold",
    bold: "Outfit_700Bold",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    display: 32,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Border Radius (0.5rem = 8px)
export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Shadows (Minimal)
export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
};
