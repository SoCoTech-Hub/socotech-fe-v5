
export const GET_APIFORUMFORUM_QUERY = `
query GetApiForumForum($limit: Int!) {
  apiforumforum(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        answer
        createdAt
        createdBy
        locale
        localizations
        name
        pin
        publishedAt
        question
        slug
        social
        updatedAt
        updatedBy
        user
      }
    }
  }
}
`;

export interface ApiForumForum {
  id: string;
  attributes: {
    answer: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    pin: string;
    publishedAt: string;
    question: string;
    slug: string;
    social: string;
    updatedAt: string;
    updatedBy: string;
    user: string;
  };
}

export interface GetApiForumForumResponse {
  apiforumforum: {
    data: ApiForumForum[];
  };
}
