
export const GET_APICOMMENTCOMMENT_QUERY = `
query GetApiCommentComment($limit: Int!) {
  apicommentcomment(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        comment
        createdAt
        createdBy
        locale
        localizations
        parent
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

export interface ApiCommentComment {
  id: string;
  attributes: {
    comment: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    parent: string;
    profile: string;
    publishedAt: string;
    social: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiCommentCommentResponse {
  apicommentcomment: {
    data: ApiCommentComment[];
  };
}
