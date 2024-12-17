
export const GET_APIPAGETRACKPAGETRACK_QUERY = `
query GetApiPageTrackPageTrack($limit: Int!) {
  apipagetrackpagetrack(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        action
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        time
        title
        updatedAt
        updatedBy
        url
        user
      }
    }
  }
}
`;

export interface ApiPageTrackPageTrack {
  id: string;
  attributes: {
    action: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    time: string;
    title: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
    user: string;
  };
}

export interface GetApiPageTrackPageTrackResponse {
  apipagetrackpagetrack: {
    data: ApiPageTrackPageTrack[];
  };
}
