
import { AdminUser } from "../attributes/AdminUser";

export interface GetAdminUserResponse {
  adminuser: {
    data: AdminUser[];
  };
}
