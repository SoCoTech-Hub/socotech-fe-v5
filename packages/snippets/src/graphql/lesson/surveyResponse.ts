import { gql } from "graphql-tag";





// let { surveyResponses } = await getGQLRequest({
//   endpoint: `surveyResponses`,
//   where: `isCompleted:true,survey:{id:${x?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
//   fields: `id`,
// });

export const GET_SURVEY_RESPONSE_CHECK = gql`
  query GetSurveyResponseCheck(
    $lessonId: string
    $surveyIds: string
    $userId: string
  ) {
    surveyResponses(
      where: {
        lesson: $lessonId
        survey: { id: $surveyIds }
        user: { id: $userId }
      }
    ) {
      id
    }
  }
`;