import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "strapi_secret_key1";

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};
