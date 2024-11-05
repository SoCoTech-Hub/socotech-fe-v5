import type { ApiResponse, ApisauceInstance } from "apisauce";
import { create } from "apisauce";
import { getCookie } from "cookie-handler-pro";

import { API_URL } from "../constants";

// Define API base URL and check for its presence
const baseURL = API_URL;
if (!baseURL) {
  throw new Error("API URL is not defined in environment variables");
}

// Create an API instance
const api: ApisauceInstance = create({
  baseURL,
});

// Add a request transform to include the Authorization header if the token exists
api.addRequestTransform((request) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jwtToken: any = getCookie("token");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  request.headers.Authorization = jwtToken ? `Bearer ${jwtToken}` : "";
});

// Generic response type for API calls
export type ApiResponseData<T> = Promise<ApiResponse<T>>;

export default api;
