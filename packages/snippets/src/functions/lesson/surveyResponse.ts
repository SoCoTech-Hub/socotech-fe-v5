import { runQuery } from "../../graphql";
import { GET_SURVEY_RESPONSE_CHECK } from "../../graphql/lesson/surveyResponse";

export const FetchSurveyResponseCheck = async (
  lessonId: string,
  surveyIds: string,
  userId: string,
) => {
  // let { surveyResponses } = await getGQLRequest({
  //   endpoint: `surveyResponses`,
  //   where: `isCompleted:true,survey:{id:${x?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
  //   fields: `id`,
  // });
  return await runQuery<{
    surveyResponses: {
      id: string;
    }[];
  }>(GET_SURVEY_RESPONSE_CHECK, {
    lessonId,
    surveyIds,
    userId,
  });
};
