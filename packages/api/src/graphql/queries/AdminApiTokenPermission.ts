
export const GET_ADMINAPITOKENPERMISSION_QUERY = `
query GetAdminApiTokenPermission($limit: Int!) {
  adminapitokenpermission(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        action
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        token
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface AdminApiTokenPermission {
  id: string;
  attributes: {
    action: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    token: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetAdminApiTokenPermissionResponse {
  adminapitokenpermission: {
    data: AdminApiTokenPermission[];
  };
}
