
export const GET_APIPRODUCTCATEGORYPRODUCTCATEGORY_QUERY = `
query GetApiProductCategoryProductCategory($limit: Int!) {
  apiproductcategoryproductcategory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        organization
        products
        publishedAt
        slug
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiProductCategoryProductCategory {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    products: string;
    publishedAt: string;
    slug: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiProductCategoryProductCategoryResponse {
  apiproductcategoryproductcategory: {
    data: ApiProductCategoryProductCategory[];
  };
}
