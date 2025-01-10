import { gql } from "graphql-tag";

export const GET_LESSON_RATING_COUNT = gql`
  query GetLessonRatings($id: ID!) {
    lessonRatingsConnection(where: { parentRating: { id: $id } }) {
      aggregate {
        count
      }
    }
  }
`;
