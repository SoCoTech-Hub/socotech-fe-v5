
export const GET_PLUGINUSERSPERMISSIONSROLE_QUERY = `
query GetPluginUsersPermissionsRole($limit: Int!) {
  pluginuserspermissionsrole(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        description
        locale
        localizations
        name
        permissions
        publishedAt
        type
        updatedAt
        updatedBy
        users
      }
    }
  }
}
`;

export interface PluginUsersPermissionsRole {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    description: string;
    locale: string;
    localizations: string;
    name: string;
    permissions: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
    users: string;
  };
}

export interface GetPluginUsersPermissionsRoleResponse {
  pluginuserspermissionsrole: {
    data: PluginUsersPermissionsRole[];
  };
}
