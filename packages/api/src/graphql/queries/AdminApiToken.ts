
export const GET_ADMINAPITOKEN_QUERY = `
query GetAdminApiToken($limit: Int!) {
  adminapitoken(pagination: { limit: $limit }) {
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
        type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface AdminApiToken {
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
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetAdminApiTokenResponse {
  adminapitoken: {
    data: AdminApiToken[];
  };
}
