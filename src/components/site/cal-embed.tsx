"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarClock, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";

const CAL_ORIGINS = ["https://cal.com", "https://app.cal.com"];
const DAYS = 28; // four pages of seven days
const PAGE = 7;

type Slots = Record<string, string[]>; // local date (YYYY-MM-DD) -> ISO start times

const t = {
  en: {
    loading: "Loading available times…",
    pick: "Pick a day",
    times: "Available times",
    none: "No times left on this day.",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    continue: "Continue",
    change: "Change time",
    prev: "Previous week",
    next: "Next week",
    empty: "No open times in the next four weeks. Message us on WhatsApp and we'll find one.",
  },
  ar: {
    loading: "جارٍ تحميل المواعيد المتاحة…",
    pick: "اختر اليوم",
    times: "المواعيد المتاحة",
    none: "لا توجد مواعيد متبقية في هذا اليوم.",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءً",
    continue: "متابعة",
    change: "تغيير الموعد",
    prev: "الأسبوع السابق",
    next: "الأسبوع التالي",
    empty: "لا توجد مواعيد متاحة خلال الأسابيع الأربعة القادمة. راسلنا على واتساب وسنجد موعداً.",
  },
};

/** `https://cal.com/<user>/<event>` or `https://cal.com/team/<team>/<event>` -> API query. */
function calTarget(url: string): Record<string, string> | null {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    if (parts[0] === "team" && parts.length >= 3) return { teamSlug: parts[1], eventTypeSlug: parts[2] };
    if (parts.length >= 2) return { username: parts[0], eventTypeSlug: parts[1] };
  } catch {}
  return null;
}

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Normalises both Cal.com v2 slot response shapes into date -> ISO starts. */
function parseSlots(json: unknown): Slots | null {
  const data = (json as { data?: unknown })?.data as Record<string, unknown> | undefined;
  if (!data || typeof data !== "object") return null;
  const map = ("slots" in data ? data.slots : data) as Record<string, { start?: string; time?: string }[]>;
  const out: Slots = {};
  for (const [, list] of Object.entries(map ?? {})) {
    if (!Array.isArray(list)) continue;
    for (const s of list) {
      const iso = s.start ?? s.time;
      if (!iso) continue;
      const key = ymd(new Date(iso)); // regroup in the visitor's timezone
      (out[key] ??= []).push(iso);
    }
  }
  for (const k of Object.keys(out)) out[k].sort();
  return out;
}

/**
 * Cal.com booking. A compact native picker (day cards + time chips, no inner
 * scrollbars) reads open slots from Cal.com's public API; choosing a time
 * opens Cal.com's own details form with that slot preselected, so the booking
 * still lives in Cal.com. If the slots API can't be reached, it falls back to
 * the full Cal.com embed. Interest/area are passed as booking metadata and a
 * completed booking fires the `demo_booked` KPI.
 */
export function CalEmbed({ url, locale, interest, area, title }: { url: string; locale: Locale; interest?: string; area?: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [slots, setSlots] = useState<Slots | null>(null);
  const [failed, setFailed] = useState(false);
  const [page, setPage] = useState(0);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [h12, setH12] = useState(locale === "en");
  const [period, setPeriod] = useState(0);
  const s = t[locale];
  const tag = locale === "ar" ? "ar-EG" : "en-GB";
  const tz = useMemo(() => (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = calTarget(url);
    if (!target) return setFailed(true);
    const start = new Date();
    const end = new Date(start.getTime() + DAYS * 864e5);
    const q = new URLSearchParams({ ...target, start: ymd(start), end: ymd(end), timeZone: tz });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    fetch(`https://api.cal.com/v2/slots?${q}`, { headers: { "cal-api-version": "2024-09-04" }, signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const parsed = parseSlots(json);
        if (!parsed) throw new Error("shape");
        setSlots(parsed);
        const first = Object.keys(parsed).sort()[0];
        if (first) {
          setDay(first);
          const idx = Math.round((new Date(first + "T12:00").getTime() - new Date(ymd(start) + "T12:00").getTime()) / 864e5);
          setPage(Math.max(0, Math.floor(idx / PAGE)));
        }
      })
      .catch(() => setFailed(true))
      .finally(() => clearTimeout(timer));
    return () => ctrl.abort();
  }, [visible, url, tz]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!CAL_ORIGINS.includes(e.origin)) return;
      const data = e.data as { type?: string };
      if (data?.type === "bookingSuccessful" || data?.type === "bookingSuccessfulV2") track("demo_booked", { source: "cal", interest, area });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [interest, area]);

  const days = useMemo(() => {
    const base = new Date();
    base.setHours(12, 0, 0, 0);
    return Array.from({ length: DAYS }, (_, i) => new Date(base.getTime() + i * 864e5));
  }, []);

  const iframeSrc = (pick?: string) => {
    const q = new URLSearchParams({ embed: "true", layout: "month_view", theme: "light", locale });
    if (interest) q.set("metadata[interest]", interest);
    if (area) q.set("metadata[area]", area);
    if (pick) {
      const d = new Date(pick);
      q.set("month", ymd(d).slice(0, 7));
      q.set("date", ymd(d));
      q.set("slot", d.toISOString());
    }
    return `${url}${url.includes("?") ? "&" : "?"}${q.toString()}`;
  };

  // Fallback and details step both use Cal.com's own page.
  if (failed || confirmed) {
    return (
      <div ref={ref} className="overflow-hidden rounded-2xl border bg-background">
        {confirmed ? (
          <div className="flex items-center justify-between gap-3 border-b px-4 py-3 text-sm">
            <span className="font-semibold text-brand-navy">{slot ? fmtLong(slot, tag, h12) : null}</span>
            <button type="button" className="font-semibold text-brand-teal-dark hover:underline" onClick={() => setConfirmed(false)}>
              {s.change}
            </button>
          </div>
        ) : null}
        <iframe src={iframeSrc(confirmed ? slot ?? undefined : undefined)} title={title} className="h-[640px] w-full" loading="lazy" allow="payment" />
      </div>
    );
  }

  const shown = days.slice(page * PAGE, page * PAGE + PAGE);
  const monthLabel = rangeLabel(shown[0], shown[shown.length - 1], tag);
  const times = day && slots ? slots[day] ?? [] : [];
  const groups = [
    { label: s.morning, items: times.filter((x) => new Date(x).getHours() < 12) },
    { label: s.afternoon, items: times.filter((x) => { const h = new Date(x).getHours(); return h >= 12 && h < 17; }) },
    { label: s.evening, items: times.filter((x) => new Date(x).getHours() >= 17) },
  ].filter((g) => g.items.length);
  const PrevIcon = locale === "ar" ? ChevronRight : ChevronLeft;
  const NextIcon = locale === "ar" ? ChevronLeft : ChevronRight;
  const active = groups[Math.min(period, groups.length - 1)];

  return (
    <div ref={ref} className="rounded-2xl border bg-card p-4 shadow-sm md:p-6" aria-busy={!slots}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-brand-teal-dark" aria-hidden />
          <h2 className="text-lg font-bold text-brand-navy">{title}</h2>
        </div>
        <div className="inline-flex rounded-lg border bg-surface-subtle p-0.5 text-xs font-semibold" role="group" aria-label="12h / 24h">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              aria-pressed={h12 === v}
              onClick={() => setH12(v)}
              className={`rounded-md px-2.5 py-1 transition-colors ${h12 === v ? "bg-background text-brand-navy shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {v ? "12h" : "24h"}
            </button>
          ))}
        </div>
      </div>

      {!slots ? (
        <div className="mt-5 grid gap-3" role="status">
          <span className="sr-only">{s.loading}</span>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }, (_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-surface-muted" />)}
          </div>
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {Array.from({ length: 12 }, (_, i) => <div key={i} className="h-9 animate-pulse rounded-lg bg-surface-muted" />)}
          </div>
        </div>
      ) : Object.keys(slots).length === 0 ? (
        <p className="mt-5 rounded-xl bg-surface-subtle p-4 text-sm text-muted-foreground">{s.empty}</p>
      ) : (
        <>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              {s.pick} <span className="font-normal text-muted-foreground">· {monthLabel}</span>
            </p>
            <div className="flex gap-1">
              <button type="button" onClick={() => setPage((p) => p - 1)} disabled={page === 0} aria-label={s.prev} className="rounded-lg border p-1.5 text-brand-navy transition-colors hover:bg-surface-subtle disabled:opacity-40">
                <PrevIcon className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setPage((p) => p + 1)} disabled={(page + 1) * PAGE >= DAYS} aria-label={s.next} className="rounded-lg border p-1.5 text-brand-navy transition-colors hover:bg-surface-subtle disabled:opacity-40">
                <NextIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {shown.map((d) => {
              const key = ymd(d);
              const open = !!slots[key]?.length;
              const sel = key === day;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!open}
                  aria-pressed={sel}
                  aria-label={new Intl.DateTimeFormat(tag, { weekday: "long", day: "numeric", month: "long" }).format(d)}
                  onClick={() => { setDay(key); setSlot(null); setPeriod(0); }}
                  className={`flex flex-col items-center rounded-xl border py-2 transition-colors ${
                    sel
                      ? "border-brand-navy bg-brand-navy text-white shadow-md"
                      : open
                        ? "bg-background text-brand-navy hover:border-brand-teal hover:bg-brand-teal/5"
                        : "border-transparent bg-surface-subtle text-muted-foreground/70"
                  }`}
                >
                  <span className={`text-[11px] font-medium ${sel ? "text-white/80" : ""}`}>{new Intl.DateTimeFormat(tag, { weekday: "short" }).format(d)}</span>
                  <span className="text-base font-bold leading-6">{new Intl.DateTimeFormat(tag, { day: "numeric" }).format(d)}</span>
                  <span className={`h-1 w-1 rounded-full ${open ? (sel ? "bg-white" : "bg-brand-teal") : "bg-transparent"}`} aria-hidden />
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            {groups.length > 1 ? (
              <div className="inline-flex rounded-lg border bg-surface-subtle p-0.5 text-xs font-semibold" role="group" aria-label={s.times}>
                {groups.map((g, i) => (
                  <button
                    key={g.label}
                    type="button"
                    aria-pressed={g === active}
                    onClick={() => setPeriod(i)}
                    className={`rounded-md px-3 py-1.5 transition-colors ${g === active ? "bg-background text-brand-navy shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {g.label} <span className="ms-0.5 font-normal">{new Intl.NumberFormat(tag).format(g.items.length)}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-semibold text-foreground">{s.times}</p>
            )}
            <p className="flex items-center gap-1 text-xs text-muted-foreground" dir="ltr">
              <Globe className="h-3.5 w-3.5" aria-hidden />
              {tz.replace(/_/g, " ")}
            </p>
          </div>
          {active ? (
            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
              {active.items.map((iso) => (
                <button
                  key={iso}
                  type="button"
                  aria-pressed={slot === iso}
                  onClick={() => setSlot(iso)}
                  className={`rounded-lg border px-1 py-1.5 text-sm font-semibold tabular-nums transition-colors ${
                    slot === iso ? "border-brand-teal-dark bg-brand-teal-dark text-white shadow-sm" : "bg-background text-brand-navy hover:border-brand-teal hover:bg-brand-teal/5"
                  }`}
                >
                  {fmtTime(iso, tag, h12)}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">{s.none}</p>
          )}

          <div className="mt-5 flex flex-col items-stretch gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {slot ? <span className="font-semibold text-brand-navy">{fmtLong(slot, tag, h12)}</span> : null}
            </p>
            <Button type="button" disabled={!slot} onClick={() => setConfirmed(true)} className="w-full sm:w-auto">
              {s.continue}
              <ArrowRight className="btn-icon" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function fmtTime(iso: string, tag: string, h12: boolean) {
  return new Intl.DateTimeFormat(tag, { hour: h12 ? "numeric" : "2-digit", minute: "2-digit", hour12: h12 }).format(new Date(iso));
}

function fmtLong(iso: string, tag: string, h12: boolean) {
  return new Intl.DateTimeFormat(tag, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: h12 }).format(new Date(iso));
}

function rangeLabel(a: Date, b: Date, tag: string) {
  const m = (d: Date) => new Intl.DateTimeFormat(tag, { month: "long", year: "numeric" }).format(d);
  return m(a) === m(b) ? m(a) : `${new Intl.DateTimeFormat(tag, { month: "short" }).format(a)} – ${m(b)}`;
}
