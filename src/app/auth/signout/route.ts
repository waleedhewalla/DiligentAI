import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return new NextResponse(null, { status: 403 });
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await audit({ action: "logout", userId: user.id, orgId: (user.app_metadata?.org_id as string | undefined) ?? null });
  }
  // scope: 'local' revokes this session's refresh token server-side.
  await supabase.auth.signOut({ scope: "local" });
  const locale = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "ar";
  return NextResponse.redirect(new URL(`/${locale}/login`, request.nextUrl.origin), { status: 303 });
}
