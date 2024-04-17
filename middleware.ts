import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const auth = await supabase.auth.getUser();
  const pathName = request.nextUrl.pathname;
  const isAuthUrl =
    pathName.startsWith("/login") || pathName.startsWith("/verify-request");
  const isLoggedIn = auth.data.user;
  if (!isLoggedIn && !isAuthUrl) {
    const refUrl = new URL(pathName, request.url);
    const ref = `${refUrl.pathname}${refUrl.search}`;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.append("ref", ref);

    return NextResponse.redirect(loginUrl);
  } else if (isLoggedIn && isAuthUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isAdminUrl = pathName.startsWith("/admin");
  const isAdminUser =
    isLoggedIn &&
    !!auth.data.user.email &&
    auth.data.user.email === process.env.ADMIN_EMAIL!;

  if (isAdminUrl && !isAdminUser) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/login",
    "/verify-request",
    "/admin/:path*",
    "/checkout/:path*",
  ],
};
