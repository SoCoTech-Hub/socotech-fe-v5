import { gql } from "graphql-tag";

export const CHECK_EMAIL = gql`
  query CheckEmail($email: String!) {
    users(where: { email: $email }) {
      provider
    }
  }
`;
