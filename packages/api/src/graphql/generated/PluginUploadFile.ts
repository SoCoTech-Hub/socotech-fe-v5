
import { PluginUploadFile } from "../attributes/PluginUploadFile";

export interface GetPluginUploadFileResponse {
  pluginuploadfile: {
    data: PluginUploadFile[];
  };
}
