import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
