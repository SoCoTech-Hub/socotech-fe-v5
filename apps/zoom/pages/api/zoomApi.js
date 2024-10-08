import Cookies from "js-cookie";
import { create } from "apisauce";

const api = create({
  baseURL: process.env.NEXT_PUBLIC_ZOOM_SIGNATURE_URL,
});

api.addRequestTransform((request) => {
  const jwtToken = Cookies.get("token");
  request.headers.Authorization = `Bearer ${jwtToken}`;
});

export default api;
