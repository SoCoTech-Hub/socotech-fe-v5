import { runQuery } from "../../graphql";
import { GET_QUIZ_RESPONSE_CHECK } from "../../graphql/lesson/quizResponse";

export const FetchQuizResponseCheck = async (
  lessonId: string,
  quizIds: string,
  userId: string,
) => {
  // let { quizResponses } = await getGQLRequest({
  //   endpoint: `quizResponses`,
  //   where: `isCompleted:true,quiz:{id:${x?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
  //   fields: `id`,
  // });
  return await runQuery<{
    quizResponses: {
      id: string;
    }[];
  }>(GET_QUIZ_RESPONSE_CHECK, {
    lessonId,
    quizIds,
    userId,
  });
};
