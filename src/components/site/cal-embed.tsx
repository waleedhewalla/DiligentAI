"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarClock, ChevronDown, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";

const CAL_ORIGINS = ["https://cal.com", "https://app.cal.com"];
const PAGE = 7; // days shown at once
const MAX_YEARS = 3; // how far ahead the month picker goes

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
    weekEmpty: "No open times this week. Try the next week or pick another month – or message us on WhatsApp.",
    loadError: "Couldn't load times for this period. Please try again.",
    month: "Choose a month",
    prevYear: "Previous year",
    nextYear: "Next year",
    thisMonth: "This month",
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
    weekEmpty: "لا توجد مواعيد متاحة هذا الأسبوع. جرّب الأسبوع التالي أو اختر شهراً آخر – أو راسلنا على واتساب.",
    loadError: "تعذّر تحميل المواعيد لهذه الفترة. حاول مرة أخرى.",
    month: "اختر الشهر",
    prevYear: "السنة السابقة",
    nextYear: "السنة التالية",
    thisMonth: "هذا الشهر",
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

const noon = (d: Date) => {
  const x = new Date(d);
  x.setHours(12, 0, 0, 0);
  return x;
};
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 864e5);
const monthKey = (d: Date) => ymd(d).slice(0, 7);

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
  const [slots, setSlots] = useState<Slots>({});
  // Per-month load state ("YYYY-MM"); slots are fetched a month at a time as the visitor navigates.
  const [months, setMonths] = useState<Record<string, "loading" | "done" | "error">>({});
  const [failed, setFailed] = useState(false);
  const today = useMemo(() => noon(new Date()), []);
  const [start, setStart] = useState(today);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [h12, setH12] = useState(locale === "en");
  const [period, setPeriod] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const autoPicked = useRef(false);
  const s = t[locale];
  const tag = locale === "ar" ? "ar-EG" : "en-GB";
  const tz = useMemo(() => (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"), []);
  const maxDate = useMemo(() => new Date(today.getFullYear() + MAX_YEARS, 11, 31, 12), [today]);
  const shown = useMemo(() => Array.from({ length: PAGE }, (_, i) => addDays(start, i)), [start]);

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

  // Load every month the visible week touches (plus next month on first load).
  useEffect(() => {
    if (!visible || failed) return;
    const target = calTarget(url);
    if (!target) return setFailed(true);
    const needed = new Set(shown.map(monthKey));
    if (!autoPicked.current) needed.add(monthKey(new Date(today.getFullYear(), today.getMonth() + 1, 15)));
    for (const key of needed) {
      if (months[key]) continue;
      const [y, m] = key.split("-").map(Number);
      const from = new Date(Math.max(new Date(y, m - 1, 1, 12).getTime(), today.getTime()));
      const to = new Date(y, m, 0, 12); // last day of the month
      if (to < today) continue;
      setMonths((prev) => ({ ...prev, [key]: "loading" }));
      const q = new URLSearchParams({ ...target, start: ymd(from), end: ymd(to), timeZone: tz });
      fetch(`https://api.cal.com/v2/slots?${q}`, { headers: { "cal-api-version": "2024-09-04" }, signal: AbortSignal.timeout(8000) })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((json) => {
          const parsed = parseSlots(json);
          if (!parsed) throw new Error("shape");
          setSlots((prev) => ({ ...prev, ...parsed }));
          setMonths((prev) => ({ ...prev, [key]: "done" }));
        })
        .catch(() => {
          // Nothing loaded yet: fall back to the full Cal.com embed.
          setMonths((prev) => {
            if (!Object.values(prev).includes("done")) setFailed(true);
            return { ...prev, [key]: "error" };
          });
        });
    }
  }, [visible, failed, url, tz, shown, months, today]);

  const ready = Object.values(months).includes("done");
  const weekLoading = shown.some((d) => months[monthKey(d)] === "loading" || !months[monthKey(d)]);

  // First load: jump to the first open day. Later: keep a selected day inside the visible week.
  useEffect(() => {
    if (!ready) return;
    const keys = Object.keys(slots).filter((k) => slots[k].length).sort();
    if (!autoPicked.current) {
      if (Object.values(months).includes("loading")) return;
      autoPicked.current = true;
      if (keys[0]) {
        const first = noon(new Date(keys[0] + "T12:00"));
        if (first > addDays(start, PAGE - 1)) setStart(first);
        setDay(keys[0]);
      }
      return;
    }
    const inWeek = shown.map(ymd);
    if (day && inWeek.includes(day)) return;
    const next = inWeek.find((k) => slots[k]?.length) ?? null;
    setDay(next);
    setSlot(null);
    setPeriod(0);
  }, [ready, slots, months, shown, day, start]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!CAL_ORIGINS.includes(e.origin)) return;
      const data = e.data as { type?: string };
      if (data?.type === "bookingSuccessful" || data?.type === "bookingSuccessfulV2") track("demo_booked", { source: "cal", interest, area });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [interest, area]);

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

  const monthLabel = rangeLabel(shown[0], shown[shown.length - 1], tag);
  const times = day ? slots[day] ?? [] : [];
  const weekHasOpen = shown.some((d) => slots[ymd(d)]?.length);
  const weekError = shown.some((d) => months[monthKey(d)] === "error");
  const canPrev = start > today;
  const canNext = addDays(start, PAGE) <= maxDate;
  const goTo = (d: Date) => setStart(noon(d < today ? today : d > maxDate ? maxDate : d));
  const groups = [
    { label: s.morning, items: times.filter((x) => new Date(x).getHours() < 12) },
    { label: s.afternoon, items: times.filter((x) => { const h = new Date(x).getHours(); return h >= 12 && h < 17; }) },
    { label: s.evening, items: times.filter((x) => new Date(x).getHours() >= 17) },
  ].filter((g) => g.items.length);
  const PrevIcon = locale === "ar" ? ChevronRight : ChevronLeft;
  const NextIcon = locale === "ar" ? ChevronLeft : ChevronRight;
  const active = groups[Math.min(period, groups.length - 1)];

  return (
    <div ref={ref} className="rounded-2xl border bg-card p-4 shadow-sm md:p-6" aria-busy={!ready || weekLoading}>
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

      {!ready ? (
        <div className="mt-5 grid gap-3" role="status">
          <span className="sr-only">{s.loading}</span>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }, (_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-surface-muted" />)}
          </div>
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {Array.from({ length: 12 }, (_, i) => <div key={i} className="h-9 animate-pulse rounded-lg bg-surface-muted" />)}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 flex items-center justify-between">
            <div className="relative flex items-center gap-1.5 text-sm">
              <span className="font-semibold text-foreground">{s.pick}</span>
              <span className="text-muted-foreground" aria-hidden>·</span>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={pickerOpen}
                onClick={() => setPickerOpen((o) => !o)}
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold text-brand-navy transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                {monthLabel}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${pickerOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {pickerOpen ? (
                <MonthPicker
                  locale={locale}
                  tag={tag}
                  labels={s}
                  current={start}
                  min={today}
                  max={maxDate}
                  onPick={(d) => {
                    goTo(d);
                    setPickerOpen(false);
                  }}
                  onClose={() => setPickerOpen(false)}
                />
              ) : null}
            </div>
            <div className="flex gap-1">
              <button type="button" onClick={() => goTo(addDays(start, -PAGE))} disabled={!canPrev} aria-label={s.prev} className="rounded-lg border p-1.5 text-brand-navy transition-colors hover:bg-surface-subtle disabled:opacity-40">
                <PrevIcon className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => goTo(addDays(start, PAGE))} disabled={!canNext} aria-label={s.next} className="rounded-lg border p-1.5 text-brand-navy transition-colors hover:bg-surface-subtle disabled:opacity-40">
                <NextIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {shown.map((d) => {
              const key = ymd(d);
              const open = !!slots[key]?.length;
              const pending = !months[monthKey(d)] || months[monthKey(d)] === "loading";
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
                    pending
                      ? "animate-pulse border-transparent bg-surface-muted text-muted-foreground/70"
                      : sel
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
          ) : weekLoading ? (
            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6" role="status">
              <span className="sr-only">{s.loading}</span>
              {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-9 animate-pulse rounded-lg bg-surface-muted" />)}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">{weekError ? s.loadError : weekHasOpen ? s.none : s.weekEmpty}</p>
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

/**
 * Compact month/year chooser: year stepper + 3×4 month grid. Months before the
 * current one (and past the booking horizon) are disabled. Closes on outside
 * click or Escape and returns focus to the trigger.
 */
function MonthPicker({
  locale,
  tag,
  labels,
  current,
  min,
  max,
  onPick,
  onClose,
}: {
  locale: Locale;
  tag: string;
  labels: (typeof t)["en"];
  current: Date;
  min: Date;
  max: Date;
  onPick: (d: Date) => void;
  onClose: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState(current.getFullYear());
  const PrevIcon = locale === "ar" ? ChevronRight : ChevronLeft;
  const NextIcon = locale === "ar" ? ChevronLeft : ChevronRight;
  const yearFmt = new Intl.DateTimeFormat(tag, { year: "numeric" });
  const monthFmt = new Intl.DateTimeFormat(tag, { month: "short" });

  useEffect(() => {
    const trigger = box.current?.previousElementSibling as HTMLElement | null;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node) && !trigger?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        trigger?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    box.current?.querySelector<HTMLElement>("[aria-current='true'], button:not(:disabled)")?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const minKey = min.getFullYear() * 12 + min.getMonth();
  const maxKey = max.getFullYear() * 12 + max.getMonth();
  const curKey = current.getFullYear() * 12 + current.getMonth();

  return (
    <div
      ref={box}
      role="dialog"
      aria-label={labels.month}
      className="absolute start-0 top-full z-20 mt-2 w-64 rounded-xl border bg-card p-3 shadow-xl animate-fade-up [animation-duration:160ms]"
    >
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setYear((y) => y - 1)} disabled={year <= min.getFullYear()} aria-label={labels.prevYear} className="rounded-md p-1.5 text-brand-navy hover:bg-surface-subtle disabled:opacity-30">
          <PrevIcon className="h-4 w-4" />
        </button>
        <span className="text-sm font-bold text-brand-navy" aria-live="polite">
          {yearFmt.format(new Date(year, 0, 1, 12))}
        </span>
        <button type="button" onClick={() => setYear((y) => y + 1)} disabled={year >= max.getFullYear()} aria-label={labels.nextYear} className="rounded-md p-1.5 text-brand-navy hover:bg-surface-subtle disabled:opacity-30">
          <NextIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {Array.from({ length: 12 }, (_, m) => {
          const key = year * 12 + m;
          const disabled = key < minKey || key > maxKey;
          const selected = key === curKey;
          const isNow = key === minKey;
          return (
            <button
              key={m}
              type="button"
              disabled={disabled}
              aria-current={selected ? "true" : undefined}
              aria-label={new Intl.DateTimeFormat(tag, { month: "long", year: "numeric" }).format(new Date(year, m, 1, 12))}
              onClick={() => onPick(new Date(year, m, 1, 12))}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-brand-navy text-white shadow-sm"
                  : disabled
                    ? "text-muted-foreground/60"
                    : `text-brand-navy hover:bg-brand-teal/10 ${isNow ? "ring-1 ring-inset ring-brand-teal" : ""}`
              }`}
            >
              {monthFmt.format(new Date(year, m, 1, 12))}
            </button>
          );
        })}
      </div>
      <button type="button" onClick={() => onPick(min)} className="mt-2 w-full rounded-lg py-1.5 text-xs font-semibold text-brand-teal-dark hover:bg-surface-subtle">
        {labels.thisMonth}
      </button>
    </div>
  );
}
