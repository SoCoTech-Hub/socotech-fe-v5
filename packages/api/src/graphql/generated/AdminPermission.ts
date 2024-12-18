
import { AdminPermission } from "../attributes/AdminPermission";

export interface GetAdminPermissionResponse {
  adminpermission: {
    data: AdminPermission[];
  };
}
