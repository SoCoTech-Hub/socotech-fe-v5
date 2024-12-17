
export const GET_ADMINUSER_QUERY = `
query GetAdminUser($limit: Int!) {
  adminuser(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        blocked
        createdAt
        createdBy
        email
        firstname
        isActive
        lastname
        locale
        localizations
        password
        preferedLanguage
        publishedAt
        registrationToken
        resetPasswordToken
        roles
        updatedAt
        updatedBy
        username
      }
    }
  }
}
`;

export interface AdminUser {
  id: string;
  attributes: {
    blocked: string;
    createdAt: string;
    createdBy: string;
    email: string;
    firstname: string;
    isActive: string;
    lastname: string;
    locale: string;
    localizations: string;
    password: string;
    preferedLanguage: string;
    publishedAt: string;
    registrationToken: string;
    resetPasswordToken: string;
    roles: string;
    updatedAt: string;
    updatedBy: string;
    username: string;
  };
}

export interface GetAdminUserResponse {
  adminuser: {
    data: AdminUser[];
  };
}
