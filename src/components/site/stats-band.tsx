import type { Locale } from "@/i18n/config";
import { home } from "@/content/home";
import { listDepartments, listOfferings, signedPartners } from "@/content/catalog";
import { MIN_CUSTOMERS_STAT, MIN_PARTNERS_STAT, customerLogos } from "@/content/proof";
import { CountUp } from "./count-up";

type Stat = { key: string; value: number; prefix?: string; suffix?: string; label: string };

/** "Diligent AI in numbers" — verifiable figures only (see home.stats). */
export function StatsBand({ locale }: { locale: Locale }) {
  const t = home.stats;
  const customers = customerLogos.filter((c) => c.approved).length;
  const stats: Stat[] = [
    { key: "solutions", value: listOfferings().length, label: t.solutions[locale] },
    { key: "departments", value: listDepartments().length, label: t.departments[locale] },
    { key: "erp", value: 55, suffix: "+", label: t.erp[locale] },
    { key: "years", value: 24, label: t.years[locale] },
    { key: "weeks", value: 8, label: t.weeks[locale] },
    { key: "planning", value: 80, prefix: "−", suffix: "%", label: t.planning[locale] },
  ];
  if (customers >= MIN_CUSTOMERS_STAT) stats.splice(2, 0, { key: "customers", value: customers, label: t.customers[locale] });
  if (signedPartners.length >= MIN_PARTNERS_STAT) stats.splice(3, 0, { key: "partners", value: signedPartners.length, label: t.partners[locale] });
  return (
    <section aria-labelledby="stats-title" className="border-b bg-brand-navy-deep text-white">
      <div className="container py-10">
        <h2 id="stats-title" className="sr-only">
          {t.title[locale]}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.key} className="flex flex-col text-center">
              <dt className="order-2 mt-1 text-sm text-white/75">{s.label}</dt>
              <dd className="order-1 text-3xl font-bold text-white md:text-4xl" dir="ltr">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
