import { gql } from "graphql-tag";

export const GET_ARTICLE_READERS = gql`
  query GetArticleReaders($profileId: string, $articleId: string) {
    articleReaders(
      where: { profile: { id: $profileId }, article: { id: $articleId } }
    ) {
      id
    }
  }
`;
