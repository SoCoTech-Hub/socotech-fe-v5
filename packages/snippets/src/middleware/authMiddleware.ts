import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// import { GetToken } from "../cookies/token";
// import { verifyToken } from "../utils/verifyToken";

const PUBLIC_ROUTES = ["/", "/auth", "/info"]; //TODO: add more routes without authentication here

export default function authMiddleware(request: NextRequest) {
  // const token = GetToken();
  const { pathname } = request.nextUrl;

  // Allow access to public routes without authentication
  if (PUBLIC_ROUTES.find((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  // If no token or token not valid, redirect to login
  //TODO: uncomment token check
  // if (!token || !verifyToken(token)) {
  //   const loginUrl = new URL("/auth/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}
