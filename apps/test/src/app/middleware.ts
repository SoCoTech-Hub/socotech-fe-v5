import { NextResponse } from "next/server";

export function middleware(request) {
  const currentTime = new Date().toISOString();
  const currentPage = request.nextUrl.pathname;

  console.log(`User navigated to ${currentPage} at ${currentTime}`);

  const token = request.cookies.get("authToken");
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
