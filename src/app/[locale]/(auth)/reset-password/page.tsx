import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { NewPasswordForm } from "@/components/auth/password-forms";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: getDictionary(params.locale).auth.resetTitle };
}

export default async function ResetPasswordPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  if (isSupabaseConfigured) {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    // Recovery links establish a short-lived session via /auth/callback.
    if (!user) redirect(`/${params.locale}/forgot-password`);
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-brand-navy">{dict.auth.resetTitle}</h1>
      <div className="mt-8">
        <NewPasswordForm locale={params.locale} dict={dict} mode="reset" />
      </div>
    </>
  );
}
