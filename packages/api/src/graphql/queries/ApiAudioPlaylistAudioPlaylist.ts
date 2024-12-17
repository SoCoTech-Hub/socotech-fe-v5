
export const GET_APIAUDIOPLAYLISTAUDIOPLAYLIST_QUERY = `
query GetApiAudioPlaylistAudioPlaylist($limit: Int!) {
  apiaudioplaylistaudioplaylist(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        organization
        publishedAt
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiAudioPlaylistAudioPlaylist {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiAudioPlaylistAudioPlaylistResponse {
  apiaudioplaylistaudioplaylist: {
    data: ApiAudioPlaylistAudioPlaylist[];
  };
}
