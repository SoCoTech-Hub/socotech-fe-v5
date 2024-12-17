
export const GET_APIEVENTRESPONSEEVENTRESPONSE_QUERY = `
query GetApiEventResponseEventResponse($limit: Int!) {
  apieventresponseeventresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        attending
        createdAt
        createdBy
        event
        locale
        localizations
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

export interface ApiEventResponseEventResponse {
  id: string;
  attributes: {
    attending: string;
    createdAt: string;
    createdBy: string;
    event: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    read: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiEventResponseEventResponseResponse {
  apieventresponseeventresponse: {
    data: ApiEventResponseEventResponse[];
  };
}
