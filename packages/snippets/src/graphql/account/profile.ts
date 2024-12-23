import { gql } from "graphql-tag";

export const GET_PROFILE = gql`
  query GetProfile {
    profile($id:string) {
      id
      cancelDate
      isPaying
      isPayingDate
    }
  }
`;
