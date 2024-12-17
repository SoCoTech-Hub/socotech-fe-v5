
export const GET_ADMINPERMISSION_QUERY = `
query GetAdminPermission($limit: Int!) {
  adminpermission(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        action
        actionParameters
        conditions
        createdAt
        createdBy
        locale
        localizations
        properties
        publishedAt
        role
        subject
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface AdminPermission {
  id: string;
  attributes: {
    action: string;
    actionParameters: string;
    conditions: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    properties: string;
    publishedAt: string;
    role: string;
    subject: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetAdminPermissionResponse {
  adminpermission: {
    data: AdminPermission[];
  };
}
