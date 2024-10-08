import { create } from "apisauce";

const api = create({
  baseURL: process.env.NEXT_PUBLIC_SIYAVULA_API_URL,
  timeout: 30000,
});

export default api;
