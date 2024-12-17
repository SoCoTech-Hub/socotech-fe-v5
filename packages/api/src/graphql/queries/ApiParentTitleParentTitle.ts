
export const GET_APIPARENTTITLEPARENTTITLE_QUERY = `
query GetApiParentTitleParentTitle($limit: Int!) {
  apiparenttitleparenttitle(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        organization
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiParentTitleParentTitle {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiParentTitleParentTitleResponse {
  apiparenttitleparenttitle: {
    data: ApiParentTitleParentTitle[];
  };
}
