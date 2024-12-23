import { gql } from "graphql-tag";

// let { quizResponses } = await getGQLRequest({
//   endpoint: `quizResponses`,
//   where: `isCompleted:true,quiz:{id:${x?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
//   fields: `id`,
// });

export const GET_QUIZ_RESPONSE_CHECK = gql`
  query GetQuizResponseCheck(
    $lessonId: string
    $quizIds: string
    $userId: string
  ) {
    quizResponses(
      where: {
        lesson: $lessonId
        quiz: { id: $quizIds }
        user: { id: $userId }
      }
    ) {
      id
    }
  }
`;
