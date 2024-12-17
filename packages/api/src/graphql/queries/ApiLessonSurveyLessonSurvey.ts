
export const GET_APILESSONSURVEYLESSONSURVEY_QUERY = `
query GetApiLessonSurveyLessonSurvey($limit: Int!) {
  apilessonsurveylessonsurvey(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        lessons
        locale
        localizations
        name
        organization
        publishedAt
        questions
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiLessonSurveyLessonSurvey {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    questions: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiLessonSurveyLessonSurveyResponse {
  apilessonsurveylessonsurvey: {
    data: ApiLessonSurveyLessonSurvey[];
  };
}
