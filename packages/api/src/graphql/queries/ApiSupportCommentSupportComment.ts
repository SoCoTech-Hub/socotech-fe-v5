
export const GET_APISUPPORTCOMMENTSUPPORTCOMMENT_QUERY = `
query GetApiSupportCommentSupportComment($limit: Int!) {
  apisupportcommentsupportcomment(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        attachments
        comment
        createdAt
        createdBy
        locale
        localizations
        profile
        publishedAt
        support_ticket
        timeSpent
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSupportCommentSupportComment {
  id: string;
  attributes: {
    attachments: string;
    comment: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    support_ticket: string;
    timeSpent: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSupportCommentSupportCommentResponse {
  apisupportcommentsupportcomment: {
    data: ApiSupportCommentSupportComment[];
  };
}
