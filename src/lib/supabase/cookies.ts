import type { CookieOptions } from "@supabase/ssr";

/**
 * Session cookies are httpOnly: the browser never sees the access or refresh
 * token (spec §5.4). All auth calls therefore run server-side (route
 * handlers / server actions); the browser only performs WebAuthn ceremonies.
 */
export function hardenCookie(options: CookieOptions = {}): CookieOptions {
  return {
    ...options,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };
}
