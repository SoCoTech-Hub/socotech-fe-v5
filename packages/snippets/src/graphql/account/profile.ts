import { gql } from "graphql-tag";

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      cancelDate
      isPaying
      isPayingDate
    }
  }
`;
