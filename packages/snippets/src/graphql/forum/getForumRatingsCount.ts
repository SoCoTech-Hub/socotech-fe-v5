import { gql } from "graphql-tag";

export const GET_FORUM_RATINGS_COUNT = gql`
  query GetForumRatings($id: ID!) {
    forumsConnection(where: { parentForum: { id: $id } }) {
      aggregate {
        count
      }
    }
  }
`;
