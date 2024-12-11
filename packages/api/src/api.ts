import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337/api",
});

// Add an interceptor to include the token dynamically
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

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
