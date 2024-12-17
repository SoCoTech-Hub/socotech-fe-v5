
export const GET_APIARTICLETAGARTICLETAG_QUERY = `
query GetApiArticleTagArticleTag($limit: Int!) {
  apiarticletagarticletag(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        articles
        createdAt
        createdBy
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

export interface ApiArticleTagArticleTag {
  id: string;
  attributes: {
    articles: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiArticleTagArticleTagResponse {
  apiarticletagarticletag: {
    data: ApiArticleTagArticleTag[];
  };
}
