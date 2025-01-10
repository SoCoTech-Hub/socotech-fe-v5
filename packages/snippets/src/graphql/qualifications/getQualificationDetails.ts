import { gql } from "graphql-tag";

export const GET_QUALIFICATION_DETAILS = gql`
  query GetQualificationDetails($id: ID!) {
    qualification(id: $id) {
      id
      name
      institution
      degree
      shortDescription
      url
      created_at
      duration
      openDate
      closeDate
      programmDescription
      requirements
      university {
        logo {
          url
        }
      }
      subjects {
        id
        name
      }
    }
  }
`;
