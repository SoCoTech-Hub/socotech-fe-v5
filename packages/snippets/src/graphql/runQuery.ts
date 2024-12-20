import { DocumentNode } from "graphql";

import { apolloClient } from "./apolloClient";

export async function runQuery<T>(
  query: DocumentNode,
  variables?: Record<string, any>,
): Promise<T> {
  try {
    const { data } = await apolloClient.query<T>({ query, variables });
    return data as T;
  } catch (error) {
    console.error("GraphQL Query Error:", error);
    throw error;
  }
}
