
export const GET_APISHOWCATEGORYSHOWCATEGORY_QUERY = `
query GetApiShowCategoryShowCategory($limit: Int!) {
  apishowcategoryshowcategory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        description
        image
        locale
        localizations
        name
        organization
        publishedAt
        shows
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiShowCategoryShowCategory {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    description: string;
    image: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    shows: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiShowCategoryShowCategoryResponse {
  apishowcategoryshowcategory: {
    data: ApiShowCategoryShowCategory[];
  };
}
