
import { AdminApiTokenPermission } from "../attributes/AdminApiTokenPermission";

export interface GetAdminApiTokenPermissionResponse {
  adminapitokenpermission: {
    data: AdminApiTokenPermission[];
  };
}
