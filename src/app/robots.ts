import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/ar/portal", "/en/portal", "/ar/login", "/en/login", "/ar/register", "/en/register", "/ar/forgot-password", "/en/forgot-password", "/ar/reset-password", "/en/reset-password"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
