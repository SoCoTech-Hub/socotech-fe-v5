
export const GET_APILIKELIKE_QUERY = `
query GetApiLikeLike($limit: Int!) {
  apilikelike(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        emoticon
        locale
        localizations
        profile
        publishedAt
        social
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiLikeLike {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    emoticon: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    social: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiLikeLikeResponse {
  apilikelike: {
    data: ApiLikeLike[];
  };
}
