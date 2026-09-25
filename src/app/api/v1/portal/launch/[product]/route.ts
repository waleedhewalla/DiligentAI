import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPortalContext } from "@/lib/auth";
import { mintLaunchToken } from "@/lib/scoped-token";
import { audit } from "@/lib/audit";
import type { ProductKey } from "@/content/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCTS: ProductKey[] = ["ipe", "ceo_os", "nexus"];

export async function POST(request: Request, { params }: { params: { product: string } }) {
  const product = params.product as ProductKey;
  if (!PRODUCTS.includes(product)) return NextResponse.json({ error: "unknown_product" }, { status: 404 });

  // CSRF: only same-origin browser requests may launch products.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ctx = await getPortalContext();
  if (!ctx) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (ctx.aal.next === "aal2" && ctx.aal.current !== "aal2") {
    return NextResponse.json({ error: "mfa_required" }, { status: 403 });
  }
  if (!ctx.org || !ctx.profile) return NextResponse.json({ error: "no_org" }, { status: 403 });

  // Entitlement check runs under RLS: the row must exist for this user in this org.
  const supabase = createClient();
  const { data: grant } = await supabase
    .from("product_access")
    .select("access_level, expires_at")
    .eq("user_id", ctx.user.id)
    .eq("product", product)
    .maybeSingle();
  if (!grant || (grant.expires_at && new Date(grant.expires_at) < new Date())) {
    await audit({ action: "product_launch_denied", userId: ctx.user.id, orgId: ctx.org.id, resource: product });
    return NextResponse.json({ error: "no_access" }, { status: 403 });
  }

  try {
    const result = await mintLaunchToken({
      product,
      userId: ctx.user.id,
      orgId: ctx.org.id,
      orgSlug: ctx.org.slug,
      role: ctx.profile.role,
      scope: grant.access_level as "full" | "read_only" | "trial",
      locale: ctx.profile.language_pref,
    });
    await audit({ action: "product_launch", userId: ctx.user.id, orgId: ctx.org.id, resource: product });
    return NextResponse.json({ expiresIn: result.expiresIn, productUrl: result.productUrl }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
}
