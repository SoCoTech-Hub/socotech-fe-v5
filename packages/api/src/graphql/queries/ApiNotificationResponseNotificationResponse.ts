
export const GET_APINOTIFICATIONRESPONSENOTIFICATIONRESPONSE_QUERY = `
query GetApiNotificationResponseNotificationResponse($limit: Int!) {
  apinotificationresponsenotificationresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        notification
        profile
        publishedAt
        read
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiNotificationResponseNotificationResponse {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    notification: string;
    profile: string;
    publishedAt: string;
    read: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiNotificationResponseNotificationResponseResponse {
  apinotificationresponsenotificationresponse: {
    data: ApiNotificationResponseNotificationResponse[];
  };
}
