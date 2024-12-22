import { deleteCookie, getCookie, setCookie } from "cookie-handler-pro";

import { CONFIG } from "@acme/config/url";

export interface CreateCookieProps {
  key: string;
  value: string;
  time?: string; //7d
}

export function CreateCookie(req: CreateCookieProps) {
  setCookie(req.key, req.value, {
    expires: req.time ?? "7d",
    path: "/",
    domain: CONFIG.DOMAIN,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  return { ok: 200, message: "Cookie set successfully" };
}

export interface DeleteCookieProps {
  key: string;
}

export function DeleteCookie(req: DeleteCookieProps) {
  deleteCookie(req.key, { path: "/", domain: CONFIG.DOMAIN });
  return { ok: 200, message: "Cookie deleted successfully" };
}

export interface GetCookieProps {
  key: string;
}

export function GetCookie(req: GetCookieProps) {
  return getCookie(req.key);
}
