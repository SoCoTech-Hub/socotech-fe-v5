import { NextResponse } from "next/server";

export function middleware(request) {
  const currentTime = new Date().toISOString();
  const currentPage = request.nextUrl.pathname;

  console.log(`User navigated to ${currentPage} at ${currentTime}`);
  return NextResponse.next();
}
