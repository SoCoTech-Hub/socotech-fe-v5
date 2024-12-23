import { gql } from "graphql-tag";

export const GET_SHOW_CARD__DETAILS = gql`
  query GetShowCardDetails($showCategoryId: string) {
    shows(where: { showCategory: { id: $showCategoryId } }) {
      id
      name
      image {
        url
      }
    }
  }
`;
