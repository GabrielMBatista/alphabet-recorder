export interface LetterMapping {
  letter: string;
  size: "small" | "medium" | "large" | "xlarge";
  priority: number; // 1 = alta prioridade, 5 = baixa prioridade
  spacing: "tight" | "normal" | "loose";
}

export interface ResolutionLayout {
  rows: LetterMapping[][];
  maxLettersPerRow: number;
  optimalLettersPerRow: number;
  containerAspectRatio: number;
  adaptiveSpacing: boolean;
}

export interface Resolution {
  width: string;
  height: string;
  scale: number;
  maxWidth?: string;
  maxHeight?: string;
  alphabetMapping: ResolutionLayout;
  fontSize: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  spacing: {
    padding: string;
    margin: string;
    gap: string;
  };
  dimensions: {
    letterButton: {
      width: string;
      height: string;
      minWidth: string;
      minHeight: string;
    };
    container: {
      width: string;
      height: string;
      maxWidth: string;
      maxHeight: string;
    };
    card: {
      width: string;
      height: string;
      padding: string;
    };
    modal: {
      width: string;
      height: string;
      maxWidth: string;
      maxHeight: string;
    };
  };
}

export interface ResponsiveStyles {
  width: string;
  height: string;
  maxWidth: string;
  maxHeight: string;
  transform: string;
  transformOrigin: string;
  overflow: string;
  boxSizing: string;
}

const createLetterMapping = (
  letters: string[],
  size: "small" | "medium" | "large" | "xlarge",
  spacing: "tight" | "normal" | "loose"
): LetterMapping[] => {
  return letters.map((letter, index) => ({
    letter,
    size,
    priority: ["A", "E", "I", "O", "U"].includes(letter)
      ? 1
      : [
          "B",
          "C",
          "D",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "M",
          "N",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ].includes(letter)
      ? 2
      : 3,
    spacing,
  }));
};

export const resolutions: Record<string, Resolution> = {
  Responsive: {
    width: "100vw",
    height: "100vh",
    scale: 1,
    maxWidth: "100%",
    maxHeight: "100%",
    alphabetMapping: {
      rows: [
        createLetterMapping(["A", "B", "C", "D"], "medium", "normal"),
        createLetterMapping(["E", "F", "G", "H", "I", "J"], "medium", "normal"),
        createLetterMapping(["K", "L", "M", "N", "O", "P"], "medium", "normal"),
        createLetterMapping(["Q", "R", "S", "T", "U", "V"], "medium", "normal"),
        createLetterMapping(["W", "X", "Y", "Z"], "medium", "normal"),
      ],
      maxLettersPerRow: 6,
      optimalLettersPerRow: 4,
      containerAspectRatio: 16 / 9,
      adaptiveSpacing: true,
    },
    fontSize: {
      small: "clamp(0.75rem, 2vw, 1rem)",
      medium: "clamp(1rem, 3vw, 1.25rem)",
      large: "clamp(1.25rem, 4vw, 1.5rem)",
      xlarge: "clamp(1.5rem, 5vw, 2rem)",
    },
    spacing: {
      padding: "clamp(0.5rem, 2vw, 1rem)",
      margin: "clamp(0.25rem, 1vw, 0.5rem)",
      gap: "clamp(0.5rem, 2vw, 1rem)",
    },
    dimensions: {
      letterButton: {
        width: "clamp(2.5rem, 6vw, 4rem)",
        height: "clamp(2.5rem, 6vw, 4rem)",
        minWidth: "2.5rem",
        minHeight: "2.5rem",
      },
      container: {
        width: "clamp(280px, 70vw, 600px)",
        height: "clamp(300px, 60vh, 500px)",
        maxWidth: "80vw",
        maxHeight: "70vh",
      },
      card: {
        width: "clamp(250px, 60vw, 400px)",
        height: "clamp(200px, 50vh, 350px)",
        padding: "clamp(0.75rem, 3vw, 1.5rem)",
      },
      modal: {
        width: "clamp(280px, 80vw, 500px)",
        height: "clamp(200px, 70vh, 450px)",
        maxWidth: "90vw",
        maxHeight: "85vh",
      },
    },
  },
  "Mobile - iPhone SE": {
    width: "375px",
    height: "667px",
    scale: 0.95,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(["A", "B", "C", "D", "E", "F"], "small", "tight"),
        createLetterMapping(["G", "H", "I", "J", "K", "L"], "small", "tight"),
        createLetterMapping(["M", "N", "O", "P", "Q", "R"], "small", "tight"),
        createLetterMapping(["S", "T", "U", "V", "W", "X"], "small", "tight"),
        createLetterMapping(["Y", "Z"], "small", "tight"),
      ],
      maxLettersPerRow: 6,
      optimalLettersPerRow: 6,
      containerAspectRatio: 9 / 16,
      adaptiveSpacing: true,
    },
    fontSize: {
      small: "0.75rem",
      medium: "0.875rem",
      large: "1rem",
      xlarge: "1.125rem",
    },
    spacing: {
      padding: "0.25rem",
      margin: "0.125rem",
      gap: "0.25rem",
    },
    dimensions: {
      letterButton: {
        width: "2rem",
        height: "2rem",
        minWidth: "1.75rem",
        minHeight: "1.75rem",
      },
      container: {
        width: "90vw",
        height: "50vh",
        maxWidth: "320px",
        maxHeight: "400px",
      },
      card: {
        width: "85vw",
        height: "35vh",
        padding: "0.5rem",
      },
      modal: {
        width: "92vw",
        height: "70vh",
        maxWidth: "340px",
        maxHeight: "450px",
      },
    },
  },
  "Mobile - Galaxy S20": {
    width: "360px",
    height: "800px",
    scale: 0.95,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(["A", "B", "C", "D", "E", "F"], "small", "tight"),
        createLetterMapping(["G", "H", "I", "J", "K", "L"], "small", "tight"),
        createLetterMapping(["M", "N", "O", "P", "Q", "R"], "small", "tight"),
        createLetterMapping(["S", "T", "U", "V", "W", "X"], "small", "tight"),
        createLetterMapping(["Y", "Z"], "small", "tight"),
      ],
      maxLettersPerRow: 3,
      optimalLettersPerRow: 3,
      containerAspectRatio: 9 / 20,
      adaptiveSpacing: true,
    },
    fontSize: {
      small: "0.75rem",
      medium: "0.875rem",
      large: "1rem",
      xlarge: "1.125rem",
    },
    spacing: {
      padding: "0.375rem",
      margin: "0.125rem",
      gap: "0.375rem",
    },
    dimensions: {
      letterButton: {
        width: "2.25rem",
        height: "2.25rem",
        minWidth: "2rem",
        minHeight: "2rem",
      },
      container: {
        width: "85vw",
        height: "55vh",
        maxWidth: "310px",
        maxHeight: "450px",
      },
      card: {
        width: "80vw",
        height: "40vh",
        padding: "0.625rem",
      },
      modal: {
        width: "90vw",
        height: "75vh",
        maxWidth: "330px",
        maxHeight: "550px",
      },
    },
  },
  "Mobile - Large": {
    width: "414px",
    height: "896px",
    scale: 0.9,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(["A", "B", "C", "D"], "medium", "normal"),
        createLetterMapping(["E", "F", "G", "H"], "medium", "normal"),
        createLetterMapping(["I", "J", "K", "L"], "medium", "normal"),
        createLetterMapping(["M", "N", "O", "P"], "medium", "normal"),
        createLetterMapping(["Q", "R", "S", "T"], "medium", "normal"),
        createLetterMapping(["U", "V", "W", "X"], "medium", "normal"),
        createLetterMapping(["Y", "Z"], "medium", "normal"),
      ],
      maxLettersPerRow: 4,
      optimalLettersPerRow: 4,
      containerAspectRatio: 9 / 19.5,
      adaptiveSpacing: true,
    },
    fontSize: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.125rem",
      xlarge: "1.25rem",
    },
    spacing: {
      padding: "0.5rem",
      margin: "0.25rem",
      gap: "0.5rem",
    },
    dimensions: {
      letterButton: {
        width: "2.5rem",
        height: "2.5rem",
        minWidth: "2.25rem",
        minHeight: "2.25rem",
      },
      container: {
        width: "80vw",
        height: "60vh",
        maxWidth: "350px",
        maxHeight: "500px",
      },
      card: {
        width: "75vw",
        height: "45vh",
        padding: "0.75rem",
      },
      modal: {
        width: "85vw",
        height: "70vh",
        maxWidth: "370px",
        maxHeight: "600px",
      },
    },
  },
  Tablet: {
    width: "768px",
    height: "1024px",
    scale: 0.95,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(["A", "B", "C", "D", "E", "F"], "small", "tight"),
        createLetterMapping(["G", "H", "I", "J", "K", "L"], "small", "tight"),
        createLetterMapping(["M", "N", "O", "P", "Q", "R"], "small", "tight"),
        createLetterMapping(["S", "T", "U", "V", "W", "X"], "small", "tight"),
        createLetterMapping(["Y", "Z"], "small", "tight"),
      ],
      maxLettersPerRow: 5,
      optimalLettersPerRow: 5,
      containerAspectRatio: 3 / 4,
      adaptiveSpacing: true,
    },
    fontSize: {
      small: "1rem",
      medium: "1.25rem",
      large: "1.5rem",
      xlarge: "1.75rem",
    },
    spacing: {
      padding: "0.75rem",
      margin: "0.375rem",
      gap: "0.75rem",
    },
    dimensions: {
      letterButton: {
        width: "3rem",
        height: "3rem",
        minWidth: "2.75rem",
        minHeight: "2.75rem",
      },
      container: {
        width: "70vw",
        height: "65vh",
        maxWidth: "500px",
        maxHeight: "650px",
      },
      card: {
        width: "60vw",
        height: "50vh",
        padding: "1rem",
      },
      modal: {
        width: "75vw",
        height: "65vh",
        maxWidth: "550px",
        maxHeight: "700px",
      },
    },
  },
  "Tablet - Landscape": {
    width: "1024px",
    height: "768px",
    scale: 0.95,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(
          ["A", "B", "C", "D", "E", "F", "G"],
          "small",
          "tight"
        ),
        createLetterMapping(
          ["H", "I", "J", "K", "L", "M", "N"],
          "small",
          "tight"
        ),
        createLetterMapping(
          ["O", "P", "Q", "R", "S", "T", "U"],
          "small",
          "tight"
        ),
        createLetterMapping(["V", "W", "X", "Y", "Z"], "small", "tight"),
      ],
      maxLettersPerRow: 8,
      optimalLettersPerRow: 8,
      containerAspectRatio: 16 / 9,
      adaptiveSpacing: true,
    },
    fontSize: {
      small: "1rem",
      medium: "1.25rem",
      large: "1.5rem",
      xlarge: "1.75rem",
    },
    spacing: {
      padding: "0.75rem",
      margin: "0.375rem",
      gap: "0.75rem",
    },
    dimensions: {
      letterButton: {
        width: "3.5rem",
        height: "3.5rem",
        minWidth: "3rem",
        minHeight: "3rem",
      },
      container: {
        width: "60vw",
        height: "70vh",
        maxWidth: "600px",
        maxHeight: "500px",
      },
      card: {
        width: "50vw",
        height: "55vh",
        padding: "1.25rem",
      },
      modal: {
        width: "65vw",
        height: "60vh",
        maxWidth: "650px",
        maxHeight: "450px",
      },
    },
  },
  "Laptop (720p)": {
    width: "1280px",
    height: "720px",
    scale: 1,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(["A", "B", "C", "D", "E", "F"], "xlarge", "normal"),
        createLetterMapping(["G", "H", "I", "J", "K", "L"], "xlarge", "normal"),
        createLetterMapping(["M", "N", "O", "P", "Q", "R"], "xlarge", "normal"),
        createLetterMapping(["S", "T", "U", "V", "W", "X"], "xlarge", "normal"),
        createLetterMapping(["Y", "Z"], "xlarge", "loose"),
      ],
      maxLettersPerRow: 6,
      optimalLettersPerRow: 6,
      containerAspectRatio: 16 / 9,
      adaptiveSpacing: false,
    },
    fontSize: {
      small: "1.125rem",
      medium: "1.375rem",
      large: "1.625rem",
      xlarge: "1.875rem",
    },
    spacing: {
      padding: "1rem",
      margin: "0.5rem",
      gap: "1rem",
    },
    dimensions: {
      letterButton: {
        width: "3.5rem",
        height: "3.5rem",
        minWidth: "3.25rem",
        minHeight: "3.25rem",
      },
      container: {
        width: "55vw",
        height: "65vh",
        maxWidth: "700px",
        maxHeight: "500px",
      },
      card: {
        width: "45vw",
        height: "55vh",
        padding: "1.5rem",
      },
      modal: {
        width: "60vw",
        height: "65vh",
        maxWidth: "750px",
        maxHeight: "550px",
      },
    },
  },
  "Desktop (1080p)": {
    width: "1920px",
    height: "1080px",
    scale: 1,
    maxWidth: "100vw",
    maxHeight: "100vh",
    alphabetMapping: {
      rows: [
        createLetterMapping(
          ["A", "B", "C", "D", "E", "F", "G", "H"],
          "xlarge",
          "loose"
        ),
        createLetterMapping(
          ["I", "J", "K", "L", "M", "N", "O", "P"],
          "xlarge",
          "loose"
        ),
        createLetterMapping(
          ["Q", "R", "S", "T", "U", "V", "W", "X"],
          "xlarge",
          "loose"
        ),
        createLetterMapping(["Y", "Z"], "xlarge", "loose"),
      ],
      maxLettersPerRow: 8,
      optimalLettersPerRow: 8,
      containerAspectRatio: 16 / 9,
      adaptiveSpacing: false,
    },
    fontSize: {
      small: "1.25rem",
      medium: "1.5rem",
      large: "1.75rem",
      xlarge: "2rem",
    },
    spacing: {
      padding: "1.25rem",
      margin: "0.625rem",
      gap: "1.25rem",
    },
    dimensions: {
      letterButton: {
        width: "4rem",
        height: "4rem",
        minWidth: "3.75rem",
        minHeight: "3.75rem",
      },
      container: {
        width: "50vw",
        height: "60vh",
        maxWidth: "800px",
        maxHeight: "600px",
      },
      card: {
        width: "40vw",
        height: "50vh",
        padding: "2rem",
      },
      modal: {
        width: "55vw",
        height: "60vh",
        maxWidth: "900px",
        maxHeight: "650px",
      },
    },
  },
};

// Breakpoints para CSS responsivo
export const breakpoints: Record<string, string> = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  laptop: "(min-width: 1024px) and (max-width: 1439px)",
  desktop: "(min-width: 1440px)",
};

// Função para obter resolução baseada no viewport atual
export const getCurrentResolution = (): Resolution => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width <= 375 && height <= 667) {
    return resolutions["Mobile - iPhone SE"];
  } else if (width <= 414 && height <= 896) {
    return resolutions["Mobile - Large"];
  } else if (width <= 768) {
    return resolutions.Tablet;
  } else if (width <= 1024) {
    return resolutions.Tablet;
  } else if (width <= 1280) {
    return resolutions["Laptop (720p)"];
  } else {
    return resolutions["Desktop (1080p)"];
  }
};

// Função para obter mapeamento de letras baseado na resolução
export const getLetterMapping = (resolution?: Resolution): ResolutionLayout => {
  if (!resolution) {
    const currentResolution = getCurrentResolution();
    return currentResolution.alphabetMapping;
  }
  return resolution.alphabetMapping;
};

// Função para calcular espaçamento dinâmico baseado no número de letras
export const calculateDynamicSpacing = (
  totalLetters: number,
  maxLettersPerRow: number,
  containerWidth: number,
  letterMinWidth: number
): { gap: string; letterWidth: string } => {
  const availableSpace = containerWidth - letterMinWidth * maxLettersPerRow;
  const optimalGap = Math.max(8, availableSpace / (maxLettersPerRow + 1));
  const adjustedLetterWidth = Math.min(
    letterMinWidth * 1.2,
    (containerWidth - optimalGap * (maxLettersPerRow + 1)) / maxLettersPerRow
  );

  return {
    gap: `${optimalGap}px`,
    letterWidth: `${adjustedLetterWidth}px`,
  };
};

// Função para adaptar layout baseado no espaço disponível
export const adaptLayoutToSpace = (
  mapping: ResolutionLayout,
  availableWidth: number,
  availableHeight: number
): ResolutionLayout => {
  const aspectRatio = availableWidth / availableHeight;
  const targetAspectRatio = mapping.containerAspectRatio;

  if (!mapping.adaptiveSpacing) {
    return mapping;
  }

  // Se o aspect ratio for muito diferente, reorganizar as linhas
  if (Math.abs(aspectRatio - targetAspectRatio) > 0.3) {
    const allLetters = mapping.rows.flat();
    const newMaxPerRow =
      aspectRatio > targetAspectRatio
        ? Math.min(mapping.maxLettersPerRow + 2, 10)
        : Math.max(mapping.maxLettersPerRow - 1, 2);

    const newRows: LetterMapping[][] = [];
    for (let i = 0; i < allLetters.length; i += newMaxPerRow) {
      newRows.push(allLetters.slice(i, i + newMaxPerRow));
    }

    return {
      ...mapping,
      rows: newRows,
      maxLettersPerRow: newMaxPerRow,
      optimalLettersPerRow: newMaxPerRow,
    };
  }

  return mapping;
};

// Função para obter estilos de fonte baseado na resolução
export const getFontStyles = (resolution?: Resolution) => {
  if (!resolution) {
    const currentResolution = getCurrentResolution();
    return currentResolution.fontSize;
  }
  return resolution.fontSize;
};

// Função para obter espaçamentos baseado na resolução
export const getSpacingStyles = (resolution?: Resolution) => {
  if (!resolution) {
    const currentResolution = getCurrentResolution();
    return currentResolution.spacing;
  }
  return resolution.spacing;
};

// Função para obter dimensões baseado na resolução
export const getDimensions = (resolution?: Resolution) => {
  if (!resolution) {
    const currentResolution = getCurrentResolution();
    return currentResolution.dimensions;
  }
  return resolution.dimensions;
};

// Função para aplicar estilos responsivos
export const getResponsiveStyles = (
  resolution: Resolution
): ResponsiveStyles => {
  return {
    width: resolution.width,
    height: resolution.height,
    maxWidth: resolution.maxWidth || "100vw",
    maxHeight: resolution.maxHeight || "100vh",
    transform: `scale(${resolution.scale})`,
    transformOrigin: "top left",
    overflow: "hidden",
    boxSizing: "border-box",
  };
};

// Função para gerar CSS custom properties baseado na resolução
export const generateCSSCustomProperties = (
  resolution: Resolution
): Record<string, string> => {
  const { fontSize, spacing, dimensions } = resolution;

  return {
    // Font sizes
    "--font-size-small": fontSize.small,
    "--font-size-medium": fontSize.medium,
    "--font-size-large": fontSize.large,
    "--font-size-xlarge": fontSize.xlarge,

    // Spacing
    "--spacing-padding": spacing.padding,
    "--spacing-margin": spacing.margin,
    "--spacing-gap": spacing.gap,

    // Letter button dimensions
    "--letter-button-width": dimensions.letterButton.width,
    "--letter-button-height": dimensions.letterButton.height,
    "--letter-button-min-width": dimensions.letterButton.minWidth,
    "--letter-button-min-height": dimensions.letterButton.minHeight,

    // Container dimensions
    "--container-width": dimensions.container.width,
    "--container-height": dimensions.container.height,
    "--container-max-width": dimensions.container.maxWidth,
    "--container-max-height": dimensions.container.maxHeight,

    // Card dimensions
    "--card-width": dimensions.card.width,
    "--card-height": dimensions.card.height,
    "--card-padding": dimensions.card.padding,

    // Modal dimensions
    "--modal-width": dimensions.modal.width,
    "--modal-height": dimensions.modal.height,
    "--modal-max-width": dimensions.modal.maxWidth,
    "--modal-max-height": dimensions.modal.maxHeight,
  } as const;
};

// Função para aplicar propriedades CSS ao documento
export const applyResponsiveProperties = (resolution: Resolution): void => {
  const properties = generateCSSCustomProperties(resolution);
  const root = document.documentElement;

  Object.entries(properties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};
