import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/site/logo";
import { LocaleSwitcher } from "@/components/site/locale-switcher";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Link href={`/${params.locale}`} aria-label={dict.nav.home}>
            <Logo />
          </Link>
          <LocaleSwitcher locale={params.locale} label={dict.locale.switchTo} />
        </div>
        <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          {children}
        </main>
      </div>
      <aside className="hero-bg relative hidden overflow-hidden lg:flex lg:items-end">
        <div className="grid-pattern absolute inset-0" aria-hidden />
        <div className="relative p-12 text-white">
          <p className="text-sm font-semibold text-brand-teal-light">{dict.brand.tagline}</p>
          <p className="mt-3 max-w-md text-3xl font-bold leading-snug">
            {params.locale === "ar"
              ? "دخول واحد إلى IPE وCEO OS وNexus AI — بأمان مؤسسي."
              : "One sign-in for IPE, CEO OS and Nexus AI — with enterprise-grade security."}
          </p>
          <p className="mt-4 text-sm text-white/70">
            {params.locale === "ar"
              ? "دخول موحد SAML/OIDC · مفاتيح المرور · مصادقة ثنائية · عزل البيانات على مستوى الصف"
              : "SAML/OIDC SSO · Passkeys · MFA · Row-level data isolation"}
          </p>
        </div>
      </aside>
    </div>
  );
}
