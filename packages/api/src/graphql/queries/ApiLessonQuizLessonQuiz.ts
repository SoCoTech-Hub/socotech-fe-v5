
export const GET_APILESSONQUIZLESSONQUIZ_QUERY = `
query GetApiLessonQuizLessonQuiz($limit: Int!) {
  apilessonquizlessonquiz(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        isSiyavula
        lessons
        locale
        localizations
        name
        organization
        publishedAt
        questions
        siyavulaActivityIds
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiLessonQuizLessonQuiz {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    isSiyavula: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    questions: string;
    siyavulaActivityIds: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiLessonQuizLessonQuizResponse {
  apilessonquizlessonquiz: {
    data: ApiLessonQuizLessonQuiz[];
  };
}
