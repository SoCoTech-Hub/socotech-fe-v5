
export const GET_APINOTIFICATIONNOTIFICATION_QUERY = `
query GetApiNotificationNotification($limit: Int!) {
  apinotificationnotification(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        author
        body
        createdAt
        createdBy
        lesson
        locale
        localizations
        name
        organization
        profiles
        publishedAt
        type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiNotificationNotification {
  id: string;
  attributes: {
    author: string;
    body: string;
    createdAt: string;
    createdBy: string;
    lesson: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    profiles: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiNotificationNotificationResponse {
  apinotificationnotification: {
    data: ApiNotificationNotification[];
  };
}
