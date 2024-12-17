
export const GET_APINOTIFICATIONSUBSCRIBERNOTIFICATIONSUBSCRIBER_QUERY = `
query GetApiNotificationSubscriberNotificationSubscriber($limit: Int!) {
  apinotificationsubscribernotificationsubscriber(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        updatedAt
        updatedBy
        user
      }
    }
  }
}
`;

export interface ApiNotificationSubscriberNotificationSubscriber {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    user: string;
  };
}

export interface GetApiNotificationSubscriberNotificationSubscriberResponse {
  apinotificationsubscribernotificationsubscriber: {
    data: ApiNotificationSubscriberNotificationSubscriber[];
  };
}
