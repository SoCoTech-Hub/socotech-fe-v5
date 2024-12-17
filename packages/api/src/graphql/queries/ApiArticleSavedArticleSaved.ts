
export const GET_APIARTICLESAVEDARTICLESAVED_QUERY = `
query GetApiArticleSavedArticleSaved($limit: Int!) {
  apiarticlesavedarticlesaved(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        article
        createdAt
        createdBy
        locale
        localizations
        profile
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiArticleSavedArticleSaved {
  id: string;
  attributes: {
    article: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiArticleSavedArticleSavedResponse {
  apiarticlesavedarticlesaved: {
    data: ApiArticleSavedArticleSaved[];
  };
}
