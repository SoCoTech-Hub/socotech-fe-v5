
export const GET_APIPRODUCTPRODUCT_QUERY = `
query GetApiProductProduct($limit: Int!) {
  apiproductproduct(pagination: { limit: $limit }) {
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
        price
        productCategories
        productCustomField
        publishedAt
        slug
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiProductProduct {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    description: string;
    image: string;
    locale: string;
    localizations: string;
    name: string;
    price: string;
    productCategories: string;
    productCustomField: string;
    publishedAt: string;
    slug: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiProductProductResponse {
  apiproductproduct: {
    data: ApiProductProduct[];
  };
}
