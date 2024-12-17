
export const GET_APIQUERYTYPEQUERYTYPE_QUERY = `
query GetApiQueryTypeQueryType($limit: Int!) {
  apiquerytypequerytype(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        publishedAt
        queryFilters
        queryHeaders
        table
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiQueryTypeQueryType {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    queryFilters: string;
    queryHeaders: string;
    table: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiQueryTypeQueryTypeResponse {
  apiquerytypequerytype: {
    data: ApiQueryTypeQueryType[];
  };
}
