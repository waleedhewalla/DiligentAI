import "server-only";
import { SignJWT } from "jose";
import type { ProductKey } from "@/content/catalog";

/**
 * Cross-product SSO (spec §9.2). The portal mints a short-lived JWT scoped to
 * exactly one product and signed with that product's own secret, so an IPE
 * token can never be replayed against CEO OS or Nexus AI.
 */
const config: Record<ProductKey, { secretEnv: string; urlEnv: string }> = {
  ipe: { secretEnv: "IPE_SECRET_KEY", urlEnv: "IPE_APP_URL" },
  ceo_os: { secretEnv: "CEO_OS_SECRET_KEY", urlEnv: "CEO_OS_APP_URL" },
  nexus: { secretEnv: "NEXUS_SECRET_KEY", urlEnv: "NEXUS_APP_URL" },
};

export const LAUNCH_TOKEN_TTL_SECONDS = 3600;

export async function mintLaunchToken(input: {
  product: ProductKey;
  userId: string;
  orgId: string;
  orgSlug: string;
  role: string;
  scope: "full" | "read_only" | "trial";
  locale: "ar" | "en";
}) {
  const { secretEnv, urlEnv } = config[input.product];
  const secret = process.env[secretEnv];
  const appUrl = process.env[urlEnv];
  if (!secret || secret.length < 32 || !appUrl) throw new Error(`launch_not_configured:${input.product}`);

  const token = await new SignJWT({
    org: input.orgSlug,
    org_id: input.orgId,
    product: input.product,
    scope: input.scope,
    role: input.role,
    locale: input.locale,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(input.userId)
    .setIssuer("https://diligentai.com")
    .setAudience(`diligentai:${input.product}`)
    .setIssuedAt()
    .setNotBefore("0s")
    .setExpirationTime(`${LAUNCH_TOKEN_TTL_SECONDS}s`)
    .setJti(crypto.randomUUID())
    .sign(new TextEncoder().encode(secret));

  const url = new URL("/auth", appUrl);
  // Token in the fragment: never sent to servers, proxies or logs.
  url.hash = `token=${token}`;
  return { token, expiresIn: LAUNCH_TOKEN_TTL_SECONDS, productUrl: url.toString() };
}
