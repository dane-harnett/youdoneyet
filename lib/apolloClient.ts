import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { SerializedHabit } from "../src/types/SerializedHabit";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          habits: {
            read() {
              const habits = JSON.parse(
                window.localStorage.getItem("habits") || "[]"
              );
              return habits.map((habit: SerializedHabit) => ({
                ...habit,
                count: 0,
              }));
            },
          },
        },
      },
    },
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache,
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo() {
  return useMemo(() => initializeApollo(), []);
}
