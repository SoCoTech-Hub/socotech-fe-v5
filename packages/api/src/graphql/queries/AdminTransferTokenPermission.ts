
export const GET_ADMINTRANSFERTOKENPERMISSION_QUERY = `
query GetAdminTransferTokenPermission($limit: Int!) {
  admintransfertokenpermission(pagination: { limit: $limit }) {
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

export interface AdminTransferTokenPermission {
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

export interface GetAdminTransferTokenPermissionResponse {
  admintransfertokenpermission: {
    data: AdminTransferTokenPermission[];
  };
}
