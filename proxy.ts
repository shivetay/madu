import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/studio")) return;
  if (pathname.startsWith("/studio/logowanie")) return;
  if (!req.auth) {
    const login = new URL("/studio/logowanie", req.url);
    login.searchParams.set("next", pathname);
    return Response.redirect(login);
  }
});

export const config = {
  matcher: ["/studio/:path*"],
};
