import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { GQL_URL } from "../constants";
import { GetToken } from "../cookies/token";

const token = GetToken();

const httpLink = new HttpLink({
  uri: GQL_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
