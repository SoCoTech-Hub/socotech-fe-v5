import { create } from "apisauce";

const publicapi = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default publicapi;
