import { gql } from "graphql-tag";

export const GET_SAVED_ARTICLES = gql`
  query GetSavedArticles($profileId: ID!) {
    savedArticles(where: { profile: { id: $profileId } }) {
      id
      articles {
        id
        title
        description
        image {
          url
        }
      }
    }
  }
`;
