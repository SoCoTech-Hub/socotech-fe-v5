
export const GET_APIBURSARYCATEGORYBURSARYCATEGORY_QUERY = `
query GetApiBursaryCategoryBursaryCategory($limit: Int!) {
  apibursarycategorybursarycategory(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        bursaries
        color
        createdAt
        createdBy
        description
        icon
        institutes
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

export interface ApiBursaryCategoryBursaryCategory {
  id: string;
  attributes: {
    bursaries: string;
    color: string;
    createdAt: string;
    createdBy: string;
    description: string;
    icon: string;
    institutes: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiBursaryCategoryBursaryCategoryResponse {
  apibursarycategorybursarycategory: {
    data: ApiBursaryCategoryBursaryCategory[];
  };
}
