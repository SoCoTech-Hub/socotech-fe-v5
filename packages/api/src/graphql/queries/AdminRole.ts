
export const GET_ADMINROLE_QUERY = `
query GetAdminRole($limit: Int!) {
  adminrole(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        code
        createdAt
        createdBy
        description
        locale
        localizations
        name
        permissions
        publishedAt
        updatedAt
        updatedBy
        users
      }
    }
  }
}
`;

export interface AdminRole {
  id: string;
  attributes: {
    code: string;
    createdAt: string;
    createdBy: string;
    description: string;
    locale: string;
    localizations: string;
    name: string;
    permissions: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    users: string;
  };
}

export interface GetAdminRoleResponse {
  adminrole: {
    data: AdminRole[];
  };
}
