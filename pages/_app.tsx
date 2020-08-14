import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "../src/theme";

import ThemeTypeContext from "../src/context/ThemeTypeContext";
import { ThemeType } from "../src/types/ThemeType";

export default function App({ Component, pageProps }: AppProps) {
  const [themeType, setThemeType] = useState<ThemeType>("light");
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
      <ApolloProvider client={apolloClient}>
        <ThemeTypeContext.Provider value={{ themeType, setThemeType }}>
          <ThemeProvider theme={themeType === "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <div data-theme-type={themeType}>
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </ThemeTypeContext.Provider>
      </ApolloProvider>
    </>
  );
}
