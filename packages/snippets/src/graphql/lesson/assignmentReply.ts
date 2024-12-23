import { gql } from "graphql-tag";

// let { assignmentReplies } = await getGQLRequest({
//   endpoint: `assignmentReplies`,
//   where: `isCompleted:true,assignment:[${lesson?.lmsAssignments?.map(
//     (assignment) => assignment.id,
//   )}],students:{id:${userId}},lesson:{id:${lesson?.id}}`,
//   fields: `id`,
// });

export const GET_ASSIGNMENT_REPLY_CHECK = gql`
  query GetLessonsSubjectAndCategories(
    $lessonId: string
    $lessonAssignments: string
    $userId: string
  ) {
    assignmentReplies(
      where: {
        lesson: { id: $lessonId }
        assignment: $lessonAssignments
        students: { id: $userId }
      }
    ) {
      id
    }
  }
`;
