import { gql } from "graphql-tag";

export const GET_PROFILE = gql`
  query GetUserProfile {
    user(id: $id) {
      id
      profile {
        firstName
        lastName
        profilePic {
          id
          url
        }
        banner {
          id
          url
        }
      }
    }
  }
`;
