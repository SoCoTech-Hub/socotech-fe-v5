
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
