import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "../src/theme";
import { Provider as NextAuthProvider } from "next-auth/client";
import ThemeModeContext from "../src/context/ThemeModeContext";
import useThemeMode from "../src/hooks/useThemeMode";

export default function App({ Component, pageProps }: AppProps) {
  const [themeMode, setThemeMode] = useThemeMode("light");
  const apolloClient = useApollo();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild?.(jssStyles);
  }, []);
  return (
    <>
      <Head>
        <title>You Done Yet</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
            <ThemeProvider
              theme={themeMode === "light" ? lightTheme : darkTheme}
            >
              <CssBaseline />
              <div data-theme-mode={themeMode}>
                <Component {...pageProps} />
              </div>
            </ThemeProvider>
          </ThemeModeContext.Provider>
        </ApolloProvider>
      </NextAuthProvider>
    </>
  );
}
