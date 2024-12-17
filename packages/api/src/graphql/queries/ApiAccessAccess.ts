
export const GET_APIACCESSACCESS_QUERY = `
query GetApiAccessAccess($limit: Int!) {
  apiaccessaccess(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        organization
        paid
        publishedAt
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiAccessAccess {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    paid: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiAccessAccessResponse {
  apiaccessaccess: {
    data: ApiAccessAccess[];
  };
}
