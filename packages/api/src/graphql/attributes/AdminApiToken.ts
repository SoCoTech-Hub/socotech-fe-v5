
export interface AdminApiToken {
  id: string;
  attributes: {
    accessKey: string;
    createdAt: string;
    createdBy: string;
    description: string;
    expiresAt: string;
    lastUsedAt: string;
    lifespan: string;
    locale: string;
    localizations: string;
    name: string;
    permissions: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}
