
export const GET_PLUGINUSERSPERMISSIONSUSER_QUERY = `
query GetPluginUsersPermissionsUser($limit: Int!) {
  pluginuserspermissionsuser(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        assignmentReplies
        blocked
        confirmationToken
        confirmed
        createdAt
        createdBy
        email
        locale
        localizations
        password
        provider
        publishedAt
        resetPasswordToken
        role
        updatedAt
        updatedBy
        username
        zoomMeetings
      }
    }
  }
}
`;

export interface PluginUsersPermissionsUser {
  id: string;
  attributes: {
    assignmentReplies: string;
    blocked: string;
    confirmationToken: string;
    confirmed: string;
    createdAt: string;
    createdBy: string;
    email: string;
    locale: string;
    localizations: string;
    password: string;
    provider: string;
    publishedAt: string;
    resetPasswordToken: string;
    role: string;
    updatedAt: string;
    updatedBy: string;
    username: string;
    zoomMeetings: string;
  };
}

export interface GetPluginUsersPermissionsUserResponse {
  pluginuserspermissionsuser: {
    data: PluginUsersPermissionsUser[];
  };
}
