import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { CONFIG } from "@acme/config/url";

import { GetToken } from "../cookies/token";

const httpLink = new HttpLink({
  uri: CONFIG.GQL_URL,
  headers: {
    "Content-Type": "application/json",
    ...(GetToken() && { Authorization: `Bearer ${GetToken()}` }),
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
