
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
