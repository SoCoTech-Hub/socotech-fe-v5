
export const GET_APISURVEYRESPONSESURVEYRESPONSE_QUERY = `
query GetApiSurveyResponseSurveyResponse($limit: Int!) {
  apisurveyresponsesurveyresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        answer
        createdAt
        createdBy
        isCompleted
        lesson
        lessonSurvey
        locale
        localizations
        publishedAt
        response
        updatedAt
        updatedBy
        user
      }
    }
  }
}
`;

export interface ApiSurveyResponseSurveyResponse {
  id: string;
  attributes: {
    answer: string;
    createdAt: string;
    createdBy: string;
    isCompleted: string;
    lesson: string;
    lessonSurvey: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    response: string;
    updatedAt: string;
    updatedBy: string;
    user: string;
  };
}

export interface GetApiSurveyResponseSurveyResponseResponse {
  apisurveyresponsesurveyresponse: {
    data: ApiSurveyResponseSurveyResponse[];
  };
}
