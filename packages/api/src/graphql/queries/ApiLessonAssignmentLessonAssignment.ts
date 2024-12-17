
export const GET_APILESSONASSIGNMENTLESSONASSIGNMENT_QUERY = `
query GetApiLessonAssignmentLessonAssignment($limit: Int!) {
  apilessonassignmentlessonassignment(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        attachments
        createdAt
        createdBy
        dueDate
        isCompleted
        isGrouped
        lessons
        locale
        localizations
        name
        organization
        price
        publishedAt
        question
        reminderDate
        retry
        rubicon
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiLessonAssignmentLessonAssignment {
  id: string;
  attributes: {
    attachments: string;
    createdAt: string;
    createdBy: string;
    dueDate: string;
    isCompleted: string;
    isGrouped: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    price: string;
    publishedAt: string;
    question: string;
    reminderDate: string;
    retry: string;
    rubicon: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiLessonAssignmentLessonAssignmentResponse {
  apilessonassignmentlessonassignment: {
    data: ApiLessonAssignmentLessonAssignment[];
  };
}
