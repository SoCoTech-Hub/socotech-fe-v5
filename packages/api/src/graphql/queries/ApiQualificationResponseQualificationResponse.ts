
export const GET_APIQUALIFICATIONRESPONSEQUALIFICATIONRESPONSE_QUERY = `
query GetApiQualificationResponseQualificationResponse($limit: Int!) {
  apiqualificationresponsequalificationresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        applied
        createdAt
        createdBy
        isSaved
        locale
        localizations
        profile
        publishedAt
        qualification
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiQualificationResponseQualificationResponse {
  id: string;
  attributes: {
    applied: string;
    createdAt: string;
    createdBy: string;
    isSaved: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    qualification: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiQualificationResponseQualificationResponseResponse {
  apiqualificationresponsequalificationresponse: {
    data: ApiQualificationResponseQualificationResponse[];
  };
}
