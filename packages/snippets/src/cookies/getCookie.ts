import { getCookie } from "cookie-handler-pro";

export interface GetCookieProps {
  key: string;
}

export default function GetCookie(req: GetCookieProps) {
  return getCookie(req.key);
}
