
export const GET_PLUGINCONTENTRELEASESRELEASEACTION_QUERY = `
query GetPluginContentReleasesReleaseAction($limit: Int!) {
  plugincontentreleasesreleaseaction(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        contentType
        createdAt
        createdBy
        entryDocumentId
        isEntryValid
        locale
        localizations
        publishedAt
        release
        type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface PluginContentReleasesReleaseAction {
  id: string;
  attributes: {
    contentType: string;
    createdAt: string;
    createdBy: string;
    entryDocumentId: string;
    isEntryValid: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    release: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetPluginContentReleasesReleaseActionResponse {
  plugincontentreleasesreleaseaction: {
    data: PluginContentReleasesReleaseAction[];
  };
}
