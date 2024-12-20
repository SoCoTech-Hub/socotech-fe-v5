import axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@acme/config/url";

import { GetToken } from "../cookies/token";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = GetToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  GET: async (url: string, config?: AxiosRequestConfig) =>
    apiClient.get(url, config),
  POST: async (url: string, data: unknown, config?: AxiosRequestConfig) =>
    apiClient.post(url, data, config),
  PUT: async (url: string, data: unknown, config?: AxiosRequestConfig) =>
    apiClient.put(url, data, config),
  DELETE: async (url: string, config?: AxiosRequestConfig) =>
    apiClient.delete(url, config),
};
