
export const GET_APIEMAILLISTEMAILLIST_QUERY = `
query GetApiEmailListEmailList($limit: Int!) {
  apiemaillistemaillist(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        body
        createdAt
        createdBy
        from
        locale
        localizations
        publishedAt
        subject
        to
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiEmailListEmailList {
  id: string;
  attributes: {
    body: string;
    createdAt: string;
    createdBy: string;
    from: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    subject: string;
    to: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiEmailListEmailListResponse {
  apiemaillistemaillist: {
    data: ApiEmailListEmailList[];
  };
}
