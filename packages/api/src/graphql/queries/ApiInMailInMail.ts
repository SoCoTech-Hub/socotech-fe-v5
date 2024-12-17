
export const GET_APIINMAILINMAIL_QUERY = `
query GetApiInMailInMail($limit: Int!) {
  apiinmailinmail(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        attachments
        bcc
        body
        cc
        createdAt
        createdBy
        draft
        from
        locale
        localizations
        publishedAt
        reply
        replyParent
        subject
        to
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiInMailInMail {
  id: string;
  attributes: {
    attachments: string;
    bcc: string;
    body: string;
    cc: string;
    createdAt: string;
    createdBy: string;
    draft: string;
    from: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    reply: string;
    replyParent: string;
    subject: string;
    to: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiInMailInMailResponse {
  apiinmailinmail: {
    data: ApiInMailInMail[];
  };
}
