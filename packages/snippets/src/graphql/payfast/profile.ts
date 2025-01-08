import { gql } from "graphql-tag";

export const GET_PROFILE_ID = gql`
  query GetUserProfileId {
    profiles(where: { uniqueId: $uniqueId }) {
      id
    }
  }
`;
