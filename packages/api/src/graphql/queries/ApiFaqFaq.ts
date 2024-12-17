
export const GET_APIFAQFAQ_QUERY = `
query GetApiFaqFaq($limit: Int!) {
  apifaqfaq(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        answer
        category
        createdAt
        createdBy
        locale
        localizations
        organization
        publishedAt
        question
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiFaqFaq {
  id: string;
  attributes: {
    answer: string;
    category: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    organization: string;
    publishedAt: string;
    question: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiFaqFaqResponse {
  apifaqfaq: {
    data: ApiFaqFaq[];
  };
}
