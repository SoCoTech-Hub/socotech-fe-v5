import { gql } from "graphql-tag";

import { runQuery } from "../../runQuery";

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
