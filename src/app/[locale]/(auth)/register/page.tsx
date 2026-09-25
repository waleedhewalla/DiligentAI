import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { NewPasswordForm } from "@/components/auth/password-forms";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: getDictionary(params.locale).auth.registerTitle };
}

export default async function RegisterPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  // The invite link (via /auth/callback) creates the session; without it, registration is closed.
  let email: string | null = null;
  if (isSupabaseConfigured) {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    email = user?.email ?? null;
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-brand-navy">{dict.auth.registerTitle}</h1>
      <p className="mt-2 text-muted-foreground">{dict.auth.registerSubtitle}</p>
      <div className="mt-8">
        {email ? (
          <>
            <p className="mb-4 rounded-lg bg-muted px-4 py-3 text-sm" dir="ltr">
              {email}
            </p>
            <NewPasswordForm locale={params.locale} dict={dict} mode="register" />
          </>
        ) : (
          <div className="grid gap-4">
            <p className="rounded-lg bg-brand-amber/10 p-4 text-sm">{dict.auth.inviteRequired}</p>
            <Link href={`/${params.locale}/login`} className="text-sm font-medium text-brand-teal-dark hover:underline">
              {dict.auth.backToLogin}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
