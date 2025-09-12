export interface FontSet {
  name: string;
  description: string;
  fontFamily: string;
  cdnUrl: string;
  type: string;
  accessibility?: boolean;
  scientific?: boolean;
}

export const fontSets: Record<string, FontSet> = {
  inter: {
    name: "Inter",
    description: "Modern, clean sans-serif (default)",
    fontFamily: '"Inter", system-ui, sans-serif',
    cdnUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    type: "sans-serif",
  },
  openDyslexic: {
    name: "OpenDyslexic",
    description: "Dyslexia-friendly typography",
    fontFamily: '"OpenDyslexic", sans-serif',
    cdnUrl:
      "https://cdn.jsdelivr.net/npm/opendyslexic@1.4.2/open_dyslexic_regular.ttf",
    type: "accessibility",
    accessibility: true,
  },
  atkinson: {
    name: "Atkinson Hyperlegible",
    description: "Low vision accessibility",
    fontFamily: '"Atkinson Hyperlegible", sans-serif',
    cdnUrl:
      "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap",
    type: "accessibility",
    accessibility: true,
  },
  sourceSerifPro: {
    name: "Source Serif Pro",
    description: "Therapeutic, calming serif",
    fontFamily: '"Source Serif Pro", Georgia, serif',
    cdnUrl:
      "https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@300;400;600&display=swap",
    type: "serif",
  },
  nunito: {
    name: "Nunito",
    description: "Friendly, approachable sans-serif",
    fontFamily: '"Nunito", sans-serif',
    cdnUrl:
      "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
    type: "sans-serif",
  },
  lexend: {
    name: "Lexend",
    description: "Reading proficiency optimized",
    fontFamily: '"Lexend", sans-serif',
    cdnUrl:
      "https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap",
    type: "sans-serif",
    scientific: true,
  },
};
