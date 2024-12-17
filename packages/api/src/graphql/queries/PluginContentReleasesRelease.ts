
export const GET_PLUGINCONTENTRELEASESRELEASE_QUERY = `
query GetPluginContentReleasesRelease($limit: Int!) {
  plugincontentreleasesrelease(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        actions
        createdAt
        createdBy
        locale
        localizations
        name
        publishedAt
        releasedAt
        scheduledAt
        status
        timezone
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface PluginContentReleasesRelease {
  id: string;
  attributes: {
    actions: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    releasedAt: string;
    scheduledAt: string;
    status: string;
    timezone: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetPluginContentReleasesReleaseResponse {
  plugincontentreleasesrelease: {
    data: PluginContentReleasesRelease[];
  };
}
