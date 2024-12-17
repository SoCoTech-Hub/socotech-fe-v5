
export const GET_APIINFOINFO_QUERY = `
query GetApiInfoInfo($limit: Int!) {
  apiinfoinfo(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        content
        createdAt
        createdBy
        image
        locale
        localizations
        organization
        publishedAt
        title
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiInfoInfo {
  id: string;
  attributes: {
    content: string;
    createdAt: string;
    createdBy: string;
    image: string;
    locale: string;
    localizations: string;
    organization: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiInfoInfoResponse {
  apiinfoinfo: {
    data: ApiInfoInfo[];
  };
}
