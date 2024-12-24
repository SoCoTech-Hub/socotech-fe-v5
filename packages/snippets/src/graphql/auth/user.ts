import { gql } from "graphql-tag";

//TODO: Check if this works
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: string) {
    users(where: { email: $email }) {
      id
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query GetUserDetail($id: string) {
    user(id: $id) {
      id
      profile {
        id
      }
    }
  }
`;
