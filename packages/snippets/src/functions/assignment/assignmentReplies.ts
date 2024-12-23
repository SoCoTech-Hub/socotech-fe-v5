import { runQuery } from "../../graphql";
import { GET_ASSIGNMENT_REPLIES } from "../../graphql/assignment/assignmentReplies";

export const FetchAssignmentReplies = async ({
  lessonId,
  assignmentId,
  userId,
}: {
  lessonId: string;
  assignmentId: string;
  userId: string;
}) => {
  return await runQuery<{
    id?: string;
    answer?: string;
    attachments: {
      id?: string;
      mime?: string;
      name?: string;
      url?: string;
    };
    students: {
      id?: string;
      profile: {
        id?: string;
        firstName?: string;
        lastName?: string;
      };
    };
    isCompleted?: boolean;
  }>(GET_ASSIGNMENT_REPLIES, { lessonId, assignmentId, userId });
};
