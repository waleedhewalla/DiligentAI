import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";
import { hardenCookie } from "./cookies";

/**
 * Validates the session and rotates the refresh token when the access token
 * (1-hour JWT) has expired. Returns the response carrying updated cookies.
 */
export async function updateSession(request: NextRequest, requestHeaders: Headers) {
  let response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!isSupabaseConfigured) return { response, user: null };

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: requestHeaders } });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, hardenCookie(options)));
      },
    },
  });

  // getUser() verifies the JWT with Supabase Auth rather than trusting the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { response, user };
}
