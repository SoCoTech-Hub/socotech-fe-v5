import createClient from "openapi-fetch";
import qs from "qs";

import type { paths } from "./types/strapi";

const token = getAuthToken();
const headers: Record<string, string> = {
  Accept: "application/json",
};
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337/api",
  headers,
  querySerializer(params) {
    console.log("querySerializer", params, qs.stringify(params));
    return qs.stringify(params, {
      encodeValuesOnly: true, // prettify URL
    });
  },
});
export { api };

function getAuthToken(): string | null {
  // Retrieve token from cookies
  //TODO: uncomment this section
  // return (
  //   document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token="))
  //     ?.split("=")[1] ?? null
  // );
  return null;
}
