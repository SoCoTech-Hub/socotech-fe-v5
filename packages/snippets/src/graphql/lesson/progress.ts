import { gql } from "graphql-tag";

export const GET_LESSON_PROGRESSES = gql`
  query GetLessonProgresses(
    $subjectId: string
    $subjectCategory: string
    $profileId: string
  ) {
    LessonProgresses(
      where: {
        subject: { id: $subjectId }
        lesson: { subjectCategory: { id: $subjectCategory } }
        profile: { id: $profileId }
        isComplete: true
      }
    ) {
      id
      lesson {
        id
        subject {
          name
        }
        name
        duration
        featuredImage {
          url
        }
      }
      subject {
        id
        name
      }
    }
  }
`;
export const GET_LESSON_PROGRESS = gql`
  query GetLessonProgress($userId: string, $lessonId: string) {
    LessonProgresses(
      where: { user: { id: $userId }, lesson: { id: $lessonId } }
    ) {
      id
      totalSteps
      completedSteps
      isComplete
    }
  }
`;
