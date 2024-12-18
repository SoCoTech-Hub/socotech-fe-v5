import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { GQL_URL } from "../constants";
import { GetToken } from "../cookies/token";

const httpLink = new HttpLink({
  uri: GQL_URL,
  headers: {
    "Content-Type": "application/json",
    ...(GetToken() && { Authorization: `Bearer ${GetToken()}` }),
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
