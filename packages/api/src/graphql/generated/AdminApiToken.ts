
import { AdminApiToken } from "../attributes/AdminApiToken";

export interface GetAdminApiTokenResponse {
  adminapitoken: {
    data: AdminApiToken[];
  };
}
