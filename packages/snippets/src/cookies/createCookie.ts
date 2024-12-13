import { setCookie } from "cookie-handler-pro";

import { DOMAIN } from "../constants";

export interface CreateCookieProps {
  key: string;
  value: string;
  time?: string; //7d
}

export default function CreateCookie(req: CreateCookieProps) {
  setCookie(req.key, req.value, {
    expires: req.time ?? "7d",
    path: "/",
    domain: DOMAIN,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  return { ok: 200, message: "Cookie set successfully" };
}
