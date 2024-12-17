
export const GET_APIQUERYFILTERQUERYFILTER_QUERY = `
query GetApiQueryFilterQueryFilter($limit: Int!) {
  apiqueryfilterqueryfilter(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        publishedAt
        queryType
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiQueryFilterQueryFilter {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    queryType: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiQueryFilterQueryFilterResponse {
  apiqueryfilterqueryfilter: {
    data: ApiQueryFilterQueryFilter[];
  };
}
