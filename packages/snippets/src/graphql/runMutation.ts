import { OperationVariables } from "@apollo/client";
import { DocumentNode } from "graphql";

import { apolloClient } from "./apolloClient";

export async function runMutation<
  T,
  V extends OperationVariables = OperationVariables,
>(mutation: DocumentNode, variables?: V): Promise<T> {
  try {
    const { data, errors } = await apolloClient.mutate<T>({
      mutation,
      variables,
    });
    if (!data) {
      console.log({ errors });
      throw new Error("Mutation did not return any data");
    }
    return data as T;
  } catch (error) {
    console.error("GraphQL Mutation Error:", error);
    throw error;
  }
}
