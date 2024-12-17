
export const GET_APIQUERYBASEQUERYBASE_QUERY = `
query GetApiQueryBaseQueryBase($limit: Int!) {
  apiquerybasequerybase(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        baseQuery
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        query_type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiQueryBaseQueryBase {
  id: string;
  attributes: {
    baseQuery: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    query_type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiQueryBaseQueryBaseResponse {
  apiquerybasequerybase: {
    data: ApiQueryBaseQueryBase[];
  };
}
