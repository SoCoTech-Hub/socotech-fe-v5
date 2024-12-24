import { gql } from "graphql-tag";

export const CHECK_LESSON_TIME_TRACK = gql`
  query GetCheckLessonTimeTrack($lessonId: string, $userId: string) {
    timeTracks(where: { lesson: $lessonId, user: $userId }) {
      id
    }
  }
`;
