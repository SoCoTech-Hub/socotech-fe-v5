import { runQuery } from "../../graphql";
import { GET_ASSIGNMENT_REPLY_CHECK } from "../../graphql/lesson/assignmentReply";

export const FetchAssignmentReplyCheck = async (
  lessonId: string,
  lessonAssignments: string,
  userId: string,
) => {
  // let { assignmentReplies } = await getGQLRequest({
  //   endpoint: `assignmentReplies`,
  //   where: `isCompleted:true,assignment:[${lesson?.lmsAssignments?.map(
  //     (assignment) => assignment.id,
  //   )}],students:{id:${userId}},lesson:{id:${lesson?.id}}`,
  //   fields: `id`,
  // });
  return await runQuery<{
    assignmentReplies: {
      id: string;
    }[];
  }>(GET_ASSIGNMENT_REPLY_CHECK, {
    lessonId,
    lessonAssignments,
    userId,
  });
};
