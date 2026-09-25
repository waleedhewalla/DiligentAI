import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ForgotPasswordForm } from "@/components/auth/password-forms";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: getDictionary(params.locale).auth.forgotTitle };
}

export default function ForgotPasswordPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <h1 className="text-3xl font-bold text-brand-navy">{dict.auth.forgotTitle}</h1>
      <p className="mt-2 text-muted-foreground">{dict.auth.forgotSubtitle}</p>
      <div className="mt-8">
        <ForgotPasswordForm locale={params.locale} dict={dict} />
      </div>
    </>
  );
}
