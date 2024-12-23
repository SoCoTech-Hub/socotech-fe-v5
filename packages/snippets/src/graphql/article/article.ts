import { gql } from "graphql-tag";

export const GET_ARTICLE = gql`
  query GetArticle($articleId: string) {
    article(where: { id: $articleId }) {
      id
      title
      shortDescription
      description
      author {
        id
        firstName
        lastName
      }
      published_at
      image {
        url
      }
    }
  }
`;
