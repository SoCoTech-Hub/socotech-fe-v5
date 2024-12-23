import { gql } from "graphql-tag";

export const GET_ALL_BURSARY_CATEGORIES = gql`
  query GetBursaryCategories($location: string) {
    bursaryCategories {
      id
      name
      description
      color
      icon {
        url
      }
    }
  }
`;
