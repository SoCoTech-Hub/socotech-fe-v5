
export const GET_APIARTICLECATEGORYARTICLECATEGORY_QUERY = `
query GetApiArticleCategoryArticleCategory($limit: Int!) {
  apiarticlecategoryarticlecategory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        articles
        createdAt
        createdBy
        image
        locale
        localizations
        name
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiArticleCategoryArticleCategory {
  id: string;
  attributes: {
    articles: string;
    createdAt: string;
    createdBy: string;
    image: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiArticleCategoryArticleCategoryResponse {
  apiarticlecategoryarticlecategory: {
    data: ApiArticleCategoryArticleCategory[];
  };
}
