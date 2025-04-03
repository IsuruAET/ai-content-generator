import {
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

interface ResponseCardProps {
  question: string;
  response: string;
  index: number;
  copiedIndex: number | null;
  onCopy: (text: string, index: number) => void;
}

export default function ResponseCard({
  question,
  response,
  index,
  copiedIndex,
  onCopy,
}: ResponseCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        transition: "transform 0.2s",
        backgroundColor: (theme) => theme.palette.background.paper,
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        color="primary"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Q: {question}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            "& .MuiTypography-root": {
              mb: 2,
              color: (theme) => theme.palette.text.primary,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
            "& ul": { pl: { xs: 2, sm: 4 }, mb: 2 },
            "& ol": { pl: { xs: 2, sm: 4 }, mb: 2 },
            "& li": { mb: 0.5 },
            "& pre": {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#F0F2F5" : "#3A3B3C",
              p: { xs: 1, sm: 2 },
              borderRadius: 1,
              overflowX: "auto",
              mb: 2,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
            "& code": {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#F0F2F5" : "#3A3B3C",
              px: 0.5,
              py: 0.25,
              borderRadius: 0.5,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => <Typography>{children}</Typography>,
              ul: ({ children }) => <Box component="ul">{children}</Box>,
              ol: ({ children }) => <Box component="ol">{children}</Box>,
              li: ({ children }) => <Box component="li">{children}</Box>,
              pre: ({ children }) => <Box component="pre">{children}</Box>,
              code: ({ children }) => <Box component="code">{children}</Box>,
            }}
          >
            {response}
          </ReactMarkdown>
        </Box>
        <Tooltip title={copiedIndex === index ? "Copied!" : "Copy"}>
          <IconButton
            onClick={() => onCopy(response, index)}
            color={copiedIndex === index ? "success" : "default"}
            sx={{ mt: 2 }}
          >
            {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}
