
export const GET_APIARTICLEARTICLE_QUERY = `
query GetApiArticleArticle($limit: Int!) {
  apiarticlearticle(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        author
        categories
        content
        createdAt
        createdBy
        description
        image
        locale
        localizations
        organization
        publishedAt
        shortDescription
        slug
        social
        tags
        targets
        title
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiArticleArticle {
  id: string;
  attributes: {
    author: string;
    categories: string;
    content: string;
    createdAt: string;
    createdBy: string;
    description: string;
    image: string;
    locale: string;
    localizations: string;
    organization: string;
    publishedAt: string;
    shortDescription: string;
    slug: string;
    social: string;
    tags: string;
    targets: string;
    title: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiArticleArticleResponse {
  apiarticlearticle: {
    data: ApiArticleArticle[];
  };
}
