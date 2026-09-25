/** @type {import('next').NextConfig} */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : "*.supabase.co";

// Content-Security-Policy. Pages are statically rendered (ISR) for speed, so we
// use an allowlist rather than per-request nonces. Third parties: GA4, Hotjar,
// Calendly, Supabase.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.hotjar.com https://*.calendly.com",
  "font-src 'self' data: https://*.hotjar.com",
  "style-src 'self' 'unsafe-inline' https://*.hotjar.com https://assets.calendly.com",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.hotjar.com https://assets.calendly.com https://challenges.cloudflare.com",
  `connect-src 'self' https://${supabaseHost} wss://${supabaseHost} https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://calendly.com`,
  "frame-src https://calendly.com https://*.hotjar.com https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), publickey-credentials-get=(self), publickey-credentials-create=(self)" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
