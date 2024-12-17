
export const GET_APIQUERYHEADERQUERYHEADER_QUERY = `
query GetApiQueryHeaderQueryHeader($limit: Int!) {
  apiqueryheaderqueryheader(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        display
        locale
        localizations
        name
        publishedAt
        queryStructures
        queryTypes
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiQueryHeaderQueryHeader {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    display: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    queryStructures: string;
    queryTypes: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiQueryHeaderQueryHeaderResponse {
  apiqueryheaderqueryheader: {
    data: ApiQueryHeaderQueryHeader[];
  };
}
