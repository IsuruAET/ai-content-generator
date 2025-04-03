import {
  Container,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          background: (theme) => theme.palette.background.paper,
          backdropFilter: "blur(10px)",
        }}
      >
        <Box textAlign="center" mb={{ xs: 3, sm: 4, md: 6 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            sx={{
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ px: { xs: 2, sm: 0 } }}
          >
            {subtitle}
          </Typography>
        </Box>
        {children}
      </Paper>
    </Container>
  );
}
