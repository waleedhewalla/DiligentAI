import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { safeNext } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login-form";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: getDictionary(params.locale).auth.loginTitle };
}

export default function LoginPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { next?: string; error?: string; mfa?: string };
}) {
  const dict = getDictionary(params.locale);
  const next = safeNext(searchParams.next, `/${params.locale}/portal`);
  return (
    <>
      <h1 className="text-3xl font-bold text-brand-navy">{dict.auth.loginTitle}</h1>
      <p className="mt-2 text-muted-foreground">{dict.auth.loginSubtitle}</p>
      <div className="mt-8">
        <LoginForm
          locale={params.locale}
          dict={dict}
          next={next} initialError={searchParams.error ? "generic" : undefined}
          startWithMfa={searchParams.mfa === "1"}
        />
      </div>
    </>
  );
}
