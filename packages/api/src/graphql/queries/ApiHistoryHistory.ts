
export const GET_APIHISTORYHISTORY_QUERY = `
query GetApiHistoryHistory($limit: Int!) {
  apihistoryhistory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        action
        content
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiHistoryHistory {
  id: string;
  attributes: {
    action: string;
    content: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiHistoryHistoryResponse {
  apihistoryhistory: {
    data: ApiHistoryHistory[];
  };
}
