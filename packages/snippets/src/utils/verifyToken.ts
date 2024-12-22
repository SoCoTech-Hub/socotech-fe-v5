import jwt from "jsonwebtoken";

import { CONFIG } from "@acme/config/url";

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, CONFIG.JWT_SECRET_KEY);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};
