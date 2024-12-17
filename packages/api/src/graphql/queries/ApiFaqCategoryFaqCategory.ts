
export const GET_APIFAQCATEGORYFAQCATEGORY_QUERY = `
query GetApiFaqCategoryFaqCategory($limit: Int!) {
  apifaqcategoryfaqcategory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        background
        createdAt
        createdBy
        description
        faqs
        image
        locale
        localizations
        name
        organization
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiFaqCategoryFaqCategory {
  id: string;
  attributes: {
    background: string;
    createdAt: string;
    createdBy: string;
    description: string;
    faqs: string;
    image: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiFaqCategoryFaqCategoryResponse {
  apifaqcategoryfaqcategory: {
    data: ApiFaqCategoryFaqCategory[];
  };
}
