
import { PluginUploadFolder } from "../attributes/PluginUploadFolder";

export interface GetPluginUploadFolderResponse {
  pluginuploadfolder: {
    data: PluginUploadFolder[];
  };
}
