
export const GET_APIASSIGNMENTREPLYASSIGNMENTREPLY_QUERY = `
query GetApiAssignmentReplyAssignmentReply($limit: Int!) {
  apiassignmentreplyassignmentreply(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        answer
        attachmentReply
        attachments
        attempt
        createdAt
        createdBy
        feedback
        grade
        instructor
        isCompleted
        isGrouped
        lesson
        lesson_assignment
        locale
        localizations
        publishedAt
        students
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiAssignmentReplyAssignmentReply {
  id: string;
  attributes: {
    answer: string;
    attachmentReply: string;
    attachments: string;
    attempt: string;
    createdAt: string;
    createdBy: string;
    feedback: string;
    grade: string;
    instructor: string;
    isCompleted: string;
    isGrouped: string;
    lesson: string;
    lesson_assignment: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    students: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiAssignmentReplyAssignmentReplyResponse {
  apiassignmentreplyassignmentreply: {
    data: ApiAssignmentReplyAssignmentReply[];
  };
}
