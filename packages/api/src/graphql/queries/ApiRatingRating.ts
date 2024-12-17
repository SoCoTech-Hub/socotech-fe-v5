
export const GET_APIRATINGRATING_QUERY = `
query GetApiRatingRating($limit: Int!) {
  apiratingrating(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        profile
        publishedAt
        rating
        social
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiRatingRating {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    rating: string;
    social: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiRatingRatingResponse {
  apiratingrating: {
    data: ApiRatingRating[];
  };
}
