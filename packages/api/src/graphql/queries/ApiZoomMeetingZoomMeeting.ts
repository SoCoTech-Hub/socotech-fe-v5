
export const GET_APIZOOMMEETINGZOOMMEETING_QUERY = `
query GetApiZoomMeetingZoomMeeting($limit: Int!) {
  apizoommeetingzoommeeting(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        host
        locale
        localizations
        meetingLink
        participants
        publishedAt
        updatedAt
        updatedBy
        zoom
      }
    }
  }
}
`;

export interface ApiZoomMeetingZoomMeeting {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    host: string;
    locale: string;
    localizations: string;
    meetingLink: string;
    participants: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    zoom: string;
  };
}

export interface GetApiZoomMeetingZoomMeetingResponse {
  apizoommeetingzoommeeting: {
    data: ApiZoomMeetingZoomMeeting[];
  };
}
