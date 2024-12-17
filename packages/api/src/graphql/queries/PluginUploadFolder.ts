
export const GET_PLUGINUPLOADFOLDER_QUERY = `
query GetPluginUploadFolder($limit: Int!) {
  pluginuploadfolder(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        children
        createdAt
        createdBy
        files
        locale
        localizations
        name
        parent
        path
        pathId
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface PluginUploadFolder {
  id: string;
  attributes: {
    children: string;
    createdAt: string;
    createdBy: string;
    files: string;
    locale: string;
    localizations: string;
    name: string;
    parent: string;
    path: string;
    pathId: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetPluginUploadFolderResponse {
  pluginuploadfolder: {
    data: PluginUploadFolder[];
  };
}
