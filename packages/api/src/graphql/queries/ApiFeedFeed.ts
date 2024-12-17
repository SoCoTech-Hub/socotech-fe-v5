
export const GET_APIFEEDFEED_QUERY = `
query GetApiFeedFeed($limit: Int!) {
  apifeedfeed(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        author
        createdAt
        createdBy
        description
        locale
        localizations
        media
        organization
        publishedAt
        social
        targets
        title
        updatedAt
        updatedBy
        url
        videoLink
      }
    }
  }
}
`;

export interface ApiFeedFeed {
  id: string;
  attributes: {
    author: string;
    createdAt: string;
    createdBy: string;
    description: string;
    locale: string;
    localizations: string;
    media: string;
    organization: string;
    publishedAt: string;
    social: string;
    targets: string;
    title: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
    videoLink: string;
  };
}

export interface GetApiFeedFeedResponse {
  apifeedfeed: {
    data: ApiFeedFeed[];
  };
}
