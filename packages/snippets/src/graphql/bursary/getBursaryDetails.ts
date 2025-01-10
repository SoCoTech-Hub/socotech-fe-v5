import { gql } from "graphql-tag";

export const GET_BURSARY_DETAILS = gql`
  query GetBursaryDetails($id: ID!) {
    bursary(id: $id) {
      id
      name
      whoQualifies
      bursaryCategories {
        id
        name
      }
      open
      close
      application
      particulars
      value
      note
      created_at
      url
    }
  }
`;
