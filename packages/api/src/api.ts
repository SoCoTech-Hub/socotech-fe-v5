import createClient from "openapi-fetch";

import type { paths } from "./types/strapi";

const token = getAuthToken();
const headers: Record<string, string> = {
  Accept: "application/json",
};
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337/api",
  headers,
});
export { client };

/**
 * Example function to retrieve the token
 * Replace with your own token retrieval logic
 */
function getAuthToken(): string | null {
  // Example: Retrieve token from cookies
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1] ?? null
  );
}
