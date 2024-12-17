
export const GET_APITIMETRACKTIMETRACK_QUERY = `
query GetApiTimeTrackTimeTrack($limit: Int!) {
  apitimetracktimetrack(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        isComplete
        locale
        localizations
        publishedAt
        secondaryTable
        secondaryTableId
        table
        tableId
        timeSpent
        updatedAt
        updatedBy
        url
        user
      }
    }
  }
}
`;

export interface ApiTimeTrackTimeTrack {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    isComplete: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    secondaryTable: string;
    secondaryTableId: string;
    table: string;
    tableId: string;
    timeSpent: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
    user: string;
  };
}

export interface GetApiTimeTrackTimeTrackResponse {
  apitimetracktimetrack: {
    data: ApiTimeTrackTimeTrack[];
  };
}
