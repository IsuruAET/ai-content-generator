import type { AppProps } from "next/app";
import { ThemeToggle } from "components/ThemeToggle";
import { ThemeContextProvider } from "context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <ThemeToggle />
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}
