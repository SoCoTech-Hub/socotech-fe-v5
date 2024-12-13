import { deleteCookie } from "cookie-handler-pro";

import { DOMAIN } from "../constants";

export interface DeleteCookieProps {
  key: string;
}

export default function DeleteCookie(req: DeleteCookieProps) {
  deleteCookie(req.key, { path: "/", domain: DOMAIN });
  return { ok: 200, message: "Cookie deleted successfully" };
}
