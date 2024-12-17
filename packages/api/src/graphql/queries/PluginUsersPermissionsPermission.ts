
export const GET_PLUGINUSERSPERMISSIONSPERMISSION_QUERY = `
query GetPluginUsersPermissionsPermission($limit: Int!) {
  pluginuserspermissionspermission(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        action
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        role
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface PluginUsersPermissionsPermission {
  id: string;
  attributes: {
    action: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    role: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetPluginUsersPermissionsPermissionResponse {
  pluginuserspermissionspermission: {
    data: PluginUsersPermissionsPermission[];
  };
}
