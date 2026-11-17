import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match admin routes and login route:
     * - /admin/:path*
     * - /adminlogin
     */
    "/admin/:path*",
    "/adminlogin",
  ],
};
