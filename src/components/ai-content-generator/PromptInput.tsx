import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";

interface PromptInputProps {
  onGenerate: (prompt: string) => Promise<void>;
  loading: boolean;
  error: boolean;
}

export default function PromptInput({
  onGenerate,
  loading,
  error,
}: PromptInputProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (prompt.trim()) {
      await onGenerate(prompt);
      setPrompt("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 4,
      }}
    >
      <TextField
        fullWidth
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading && prompt) {
            handleGenerate();
          }
        }}
        placeholder="Enter your prompt here..."
        disabled={loading}
        error={error}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            backgroundColor: (theme) => theme.palette.background.paper,
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleGenerate}
        disabled={loading || !prompt}
        fullWidth={isMobile}
        sx={{
          borderRadius: 2,
          px: { xs: 2, sm: 4 },
          py: 1.5,
          minWidth: { xs: "100%", sm: "auto" },
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "#FFFFFF",
          fontWeight: 600,
          textTransform: "none",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
          "&:disabled": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.12)",
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.26)",
          },
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} sx={{ color: "inherit" }} />
            <span>Generating...</span>
          </Box>
        ) : (
          <>
            <AutoAwesomeIcon sx={{ mr: 1 }} />
            Generate
          </>
        )}
      </Button>
    </Box>
  );
}
