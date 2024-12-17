
export const GET_APIQUIZRESPONSEQUIZRESPONSE_QUERY = `
query GetApiQuizResponseQuizResponse($limit: Int!) {
  apiquizresponsequizresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        answer
        attempt
        createdAt
        createdBy
        isCompleted
        lesson
        lesson_quiz
        locale
        localizations
        points
        publishedAt
        response
        totalPoints
        updatedAt
        updatedBy
        user
      }
    }
  }
}
`;

export interface ApiQuizResponseQuizResponse {
  id: string;
  attributes: {
    answer: string;
    attempt: string;
    createdAt: string;
    createdBy: string;
    isCompleted: string;
    lesson: string;
    lesson_quiz: string;
    locale: string;
    localizations: string;
    points: string;
    publishedAt: string;
    response: string;
    totalPoints: string;
    updatedAt: string;
    updatedBy: string;
    user: string;
  };
}

export interface GetApiQuizResponseQuizResponseResponse {
  apiquizresponsequizresponse: {
    data: ApiQuizResponseQuizResponse[];
  };
}
