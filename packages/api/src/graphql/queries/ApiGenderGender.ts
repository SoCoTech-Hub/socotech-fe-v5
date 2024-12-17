
export const GET_APIGENDERGENDER_QUERY = `
query GetApiGenderGender($limit: Int!) {
  apigendergender(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiGenderGender {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiGenderGenderResponse {
  apigendergender: {
    data: ApiGenderGender[];
  };
}
