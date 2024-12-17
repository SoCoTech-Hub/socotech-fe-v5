
export const GET_APISOCIALSOCIAL_QUERY = `
query GetApiSocialSocial($limit: Int!) {
  apisocialsocial(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        article
        comments
        createdAt
        createdBy
        forum
        knowledgeBase
        lesson
        likes
        locale
        localizations
        publishedAt
        ratings
        read
        share
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSocialSocial {
  id: string;
  attributes: {
    article: string;
    comments: string;
    createdAt: string;
    createdBy: string;
    forum: string;
    knowledgeBase: string;
    lesson: string;
    likes: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    ratings: string;
    read: string;
    share: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSocialSocialResponse {
  apisocialsocial: {
    data: ApiSocialSocial[];
  };
}
