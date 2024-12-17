
export const GET_APIKBCATEGORYKBCATEGORY_QUERY = `
query GetApiKbCategoryKbCategory($limit: Int!) {
  apikbcategorykbcategory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        background
        bgColor
        createdAt
        createdBy
        description
        image
        knowledgeBases
        locale
        localizations
        name
        organization
        publishedAt
        slug
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiKbCategoryKbCategory {
  id: string;
  attributes: {
    background: string;
    bgColor: string;
    createdAt: string;
    createdBy: string;
    description: string;
    image: string;
    knowledgeBases: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    slug: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiKbCategoryKbCategoryResponse {
  apikbcategorykbcategory: {
    data: ApiKbCategoryKbCategory[];
  };
}
