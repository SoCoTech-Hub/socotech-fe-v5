import { gql } from "graphql-tag";

export const GET_ASSIGNMENT_REPLIES = gql`
  query GetAssignmentReplies(
    $lessonId: string
    $assignmentId: string
    $userId: string
  ) {
    articleReaders(
      where: {
        lesson: { id: $lessonId }
        students: { id: $userId }
        assignment: { id: $assignmentId }
      }
    ) {
      id
      answer
      attachments {
        id
        mime
        name
        url
      }
      students {
        id
        profile {
          id
          firstName
          lastName
        }
      }
      isCompleted
    }
  }
`;
