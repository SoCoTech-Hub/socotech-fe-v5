
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
