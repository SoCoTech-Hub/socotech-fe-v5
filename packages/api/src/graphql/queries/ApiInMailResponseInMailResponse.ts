
export const GET_APIINMAILRESPONSEINMAILRESPONSE_QUERY = `
query GetApiInMailResponseInMailResponse($limit: Int!) {
  apiinmailresponseinmailresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        deleted
        important
        inMail
        locale
        localizations
        profile
        publishedAt
        read
        starred
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiInMailResponseInMailResponse {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    deleted: string;
    important: string;
    inMail: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    read: string;
    starred: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiInMailResponseInMailResponseResponse {
  apiinmailresponseinmailresponse: {
    data: ApiInMailResponseInMailResponse[];
  };
}
