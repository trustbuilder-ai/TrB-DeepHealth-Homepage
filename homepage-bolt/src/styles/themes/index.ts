import type { Theme } from "../../types/theme.types";

export const themes: Record<string, Theme> = {
  "coastal-breeze": {
    name: "coastal-breeze",
    displayName: "Coastal Breeze",
    description:
      "Soothing teal tones reminiscent of the ocean with warm peach accents",
    variables: {
      "--primary-color": "#05aabd",
      "--secondary-color": "#47969e",
      "--accent-color": "#ffc107",
      "--background-color": "#f8fbfc",
      "--text-color": "#0d1b1c",
      "--theme-teal": "#008080",
      "--theme-peach": "#FFDAB9",
      "--theme-bg": "#FFFFFF",
      "--theme-text": "#333333",
      "--theme-text-light": "#666666",
      "--theme-border": "#E0E0E0",
      "--card-bg": "#ffffff",
      "--button-bg": "#05aabd",
      "--button-text": "#ffffff",
      "--button-hover": "#47969e",
      "--crisis-banner-bg": "#e53e3e",
      "--crisis-banner-text": "#ffffff",
    },
  },
  "coastal-glow": {
    name: "coastal-glow",
    displayName: "Coastal Glow",
    description:
      "Fresh, clean, and approachable with calming teal tones and warm amber",
    variables: {
      "--primary-color": "#05aabd",
      "--secondary-color": "#47969e",
      "--accent-color": "#ffc107",
      "--background-color": "#f8fbfc",
      "--text-color": "#0d1b1c",
      "--theme-teal": "#05aabd",
      "--theme-peach": "#ffc107",
      "--theme-bg": "#f8fbfc",
      "--theme-text": "#0d1b1c",
      "--theme-text-light": "#47969e",
      "--theme-border": "#47969e",
      "--card-bg": "#ffffff",
      "--button-bg": "#05aabd",
      "--button-text": "#ffffff",
      "--button-hover": "#47969e",
      "--crisis-banner-bg": "#e53e3e",
      "--crisis-banner-text": "#ffffff",
    },
  },
  "earthy-serenity": {
    name: "earthy-serenity",
    displayName: "Earthy Serenity",
    description:
      "Warm, natural, and calming with soft beige, sage, peach, and rose tones",
    variables: {
      "--primary-color": "#A8C4A8",
      "--secondary-color": "#E8B4B8",
      "--accent-color": "#FFDAB9",
      "--background-color": "#F0ECE3",
      "--text-color": "#4A627A",
      "--theme-teal": "#A8C4A8",
      "--theme-peach": "#FFDAB9",
      "--theme-bg": "#F0ECE3",
      "--theme-text": "#4A627A",
      "--theme-text-light": "#E8B4B8",
      "--theme-border": "#E8B4B8",
      "--card-bg": "#ffffff",
      "--button-bg": "#A8C4A8",
      "--button-text": "#ffffff",
      "--button-hover": "#E8B4B8",
      "--crisis-banner-bg": "#e53e3e",
      "--crisis-banner-text": "#ffffff",
    },
  },
  "neon-tide": {
    name: "neon-tide",
    displayName: "Neon Tide",
    description:
      "Glowing teal and warm accents against dark background, like neon on water",
    variables: {
      "--primary-color": "#05aabd",
      "--secondary-color": "#47969e",
      "--accent-color": "#ffc107",
      "--background-color": "#1a202c",
      "--text-color": "#f7fafc",
      "--theme-teal": "#4fd1c5",
      "--theme-peach": "#F6AD55",
      "--theme-bg": "#1a202c",
      "--theme-text": "#f7fafc",
      "--theme-text-light": "#a0aec0",
      "--theme-border": "#4a5568",
      "--card-bg": "#2d3748",
      "--button-bg": "#4fd1c5",
      "--button-text": "#1a202c",
      "--button-hover": "#05aabd",
      "--crisis-banner-bg": "#e53e3e",
      "--crisis-banner-text": "#ffffff",
    },
  },
  "cyber-mint": {
    name: "cyber-mint",
    displayName: "Cyber Mint",
    description:
      "Bold and modern with lively aqua and mint tones, futuristic and tech-inspired",
    variables: {
      "--primary-color": "#5eead4",
      "--secondary-color": "#a7f3d0",
      "--accent-color": "#fde047",
      "--background-color": "#1a202c",
      "--text-color": "#e2e8f0",
      "--theme-teal": "#5eead4",
      "--theme-peach": "#fde047",
      "--theme-bg": "#1a202c",
      "--theme-text": "#e2e8f0",
      "--theme-text-light": "#a7f3d0",
      "--theme-border": "#4a5568",
      "--card-bg": "#2d3748",
      "--button-bg": "#5eead4",
      "--button-text": "#1a202c",
      "--button-hover": "#a7f3d0",
      "--crisis-banner-bg": "#e53e3e",
      "--crisis-banner-text": "#ffffff",
    },
  },
  "midnight-pulse": {
    name: "midnight-pulse",
    displayName: "Midnight Pulse",
    description:
      "Sleek, modern, and dramatic with dark slate tones and vibrant blue accent",
    variables: {
      "--primary-color": "#63b3ed",
      "--secondary-color": "#a0aec0",
      "--accent-color": "#e53e3e",
      "--background-color": "#1a202c",
      "--text-color": "#e2e8f0",
      "--theme-teal": "#63b3ed",
      "--theme-peach": "#a0aec0",
      "--theme-bg": "#1a202c",
      "--theme-text": "#e2e8f0",
      "--theme-text-light": "#a0aec0",
      "--theme-border": "#4a5568",
      "--card-bg": "#2d3748",
      "--button-bg": "#63b3ed",
      "--button-text": "#1a202c",
      "--button-hover": "#a0aec0",
      "--crisis-banner-bg": "#e53e3e",
      "--crisis-banner-text": "#ffffff",
    },
  },
};

export const getAllThemeVariables = (): string[] => {
  const allVariables = new Set<string>();
  Object.values(themes).forEach((theme) => {
    Object.keys(theme.variables).forEach((variable) => {
      allVariables.add(variable);
    });
  });
  return Array.from(allVariables);
};
