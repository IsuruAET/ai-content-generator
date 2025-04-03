import { createTheme } from "@mui/material/styles";

// Breakpoint constants
const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// Media query helpers
const mediaQuery = {
  sm: `@media (min-width:${BREAKPOINTS.sm}px)`,
  md: `@media (min-width:${BREAKPOINTS.md}px)`,
  lg: `@media (min-width:${BREAKPOINTS.lg}px)`,
  xl: `@media (min-width:${BREAKPOINTS.xl}px)`,
};

// Common responsive styles
const commonResponsiveStyles = {
  container: {
    padding: {
      xs: 2,
      sm: 3,
      md: 4,
    },
    margin: {
      xs: 1,
      sm: 2,
      md: 3,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      [mediaQuery.sm]: {
        fontSize: "2.5rem",
      },
      [mediaQuery.md]: {
        fontSize: "3rem",
      },
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      [mediaQuery.sm]: {
        fontSize: "2rem",
      },
      [mediaQuery.md]: {
        fontSize: "2.5rem",
      },
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      [mediaQuery.sm]: {
        fontSize: "1.75rem",
      },
      [mediaQuery.md]: {
        fontSize: "2rem",
      },
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.875rem",
      [mediaQuery.sm]: {
        fontSize: "1rem",
      },
      [mediaQuery.md]: {
        fontSize: "1.125rem",
      },
    },
  },
  spacing: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  borderRadius: {
    xs: 1,
    sm: 2,
    md: 3,
  },
  icon: {
    size: {
      xs: 20,
      sm: 24,
      md: 28,
    },
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    [mediaQuery.sm]: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
    },
    [mediaQuery.md]: {
      padding: "1rem 2rem",
      fontSize: "1.125rem",
    },
  },
  input: {
    fontSize: "0.875rem",
    padding: "0.5rem",
    [mediaQuery.sm]: {
      fontSize: "1rem",
      padding: "0.75rem",
    },
    [mediaQuery.md]: {
      fontSize: "1.125rem",
      padding: "1rem",
    },
  },
  paper: {
    padding: 2,
    [mediaQuery.sm]: {
      padding: 3,
    },
    [mediaQuery.md]: {
      padding: 4,
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1877F2",
      light: "#E4E6EB",
      dark: "#166FE5",
    },
    secondary: {
      main: "#42B72A",
      light: "#E4E6EB",
      dark: "#36A420",
    },
    background: {
      default: "#F0F2F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#050505",
      secondary: "#65676B",
    },
    divider: "#DADDE1",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          ...commonResponsiveStyles.paper,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ...commonResponsiveStyles.button,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            ...commonResponsiveStyles.input,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ...commonResponsiveStyles.icon,
        },
      },
    },
  },
  typography: {
    ...commonResponsiveStyles.typography,
  },
  spacing: 8,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1877F2",
      light: "#3A3B3C",
      dark: "#166FE5",
    },
    secondary: {
      main: "#42B72A",
      light: "#3A3B3C",
      dark: "#36A420",
    },
    background: {
      default: "#18191A",
      paper: "#242526",
    },
    text: {
      primary: "#E4E6EB",
      secondary: "#B0B3B8",
    },
    divider: "#3E4042",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          ...commonResponsiveStyles.paper,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ...commonResponsiveStyles.button,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            ...commonResponsiveStyles.input,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ...commonResponsiveStyles.icon,
        },
      },
    },
  },
  typography: {
    ...commonResponsiveStyles.typography,
  },
  spacing: 8,
});
