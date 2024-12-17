
export const GET_PLUGINUPLOADFILE_QUERY = `
query GetPluginUploadFile($limit: Int!) {
  pluginuploadfile(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        alternativeText
        caption
        createdAt
        createdBy
        ext
        folder
        folderPath
        formats
        hash
        height
        locale
        localizations
        mime
        name
        previewUrl
        provider
        provider_metadata
        publishedAt
        related
        size
        updatedAt
        updatedBy
        url
        width
      }
    }
  }
}
`;

export interface PluginUploadFile {
  id: string;
  attributes: {
    alternativeText: string;
    caption: string;
    createdAt: string;
    createdBy: string;
    ext: string;
    folder: string;
    folderPath: string;
    formats: string;
    hash: string;
    height: string;
    locale: string;
    localizations: string;
    mime: string;
    name: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    publishedAt: string;
    related: string;
    size: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
    width: string;
  };
}

export interface GetPluginUploadFileResponse {
  pluginuploadfile: {
    data: PluginUploadFile[];
  };
}
