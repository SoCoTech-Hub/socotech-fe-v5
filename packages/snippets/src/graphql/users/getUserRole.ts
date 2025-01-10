import { gql } from "graphql-tag";

export const GET_USER_ROLE = gql`
  query GetUserRole($userid: ID!) {
    user(id: $userid) {
      role {
        name
      }
    }
  }
`;
