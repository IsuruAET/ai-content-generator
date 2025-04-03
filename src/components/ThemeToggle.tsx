import { IconButton, useTheme, Tooltip, useMediaQuery } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "context/ThemeContext";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? 8 : 16,
        right: isMobile ? 8 : 16,
        zIndex: 1000,
      }}
    >
      {isDarkMode ? (
        <Tooltip title="Switch to Light Mode">
          <IconButton
            sx={{
              backgroundColor: theme.palette.background.paper,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
            color="inherit"
            aria-label="light mode"
            onClick={toggleTheme}
          >
            <Brightness7
              sx={{
                color: theme.palette.warning.main,
                fontSize: { xs: 20, sm: 24 },
              }}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Switch to Dark Mode">
          <IconButton
            sx={{
              backgroundColor: theme.palette.background.paper,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
            color="inherit"
            aria-label="dark mode"
            onClick={toggleTheme}
          >
            <Brightness4
              sx={{
                color: theme.palette.info.main,
                fontSize: { xs: 20, sm: 24 },
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};
