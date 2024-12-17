
export const GET_ADMINTRANSFERTOKEN_QUERY = `
query GetAdminTransferToken($limit: Int!) {
  admintransfertoken(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        accessKey
        createdAt
        createdBy
        description
        expiresAt
        lastUsedAt
        lifespan
        locale
        localizations
        name
        permissions
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface AdminTransferToken {
  id: string;
  attributes: {
    accessKey: string;
    createdAt: string;
    createdBy: string;
    description: string;
    expiresAt: string;
    lastUsedAt: string;
    lifespan: string;
    locale: string;
    localizations: string;
    name: string;
    permissions: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetAdminTransferTokenResponse {
  admintransfertoken: {
    data: AdminTransferToken[];
  };
}
