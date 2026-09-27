"use client";

import { useEffect, useState } from "react";
import { Copy, KeyRound, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { track } from "@/lib/analytics";
import { sampleOutput } from "@/content/nexus-samples";
import { NexusError, generateWithOpenRouter, type NexusRegister, type NexusType } from "@/lib/nexus";

// Static previews (GitHub Pages) have no API. They show the curated sample, or –
// for testers – call OpenRouter directly with a key kept in this browser only.
const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";
const TEST_KEY = "nexus-test-key";
import { Button } from "@/components/ui/button";
import { NativeSelect, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const copy = {
  en: {
    title: "Try it now",
    type: "Content type",
    types: { linkedin: "LinkedIn post", email: "Email", proposal: "Proposal summary" },
    register: "Arabic register",
    registers: { msa: "Modern Standard", egyptian: "Egyptian", gulf: "Gulf" },
    brief: "Describe your product or service",
    placeholder: "e.g. We manufacture industrial packaging in 6th of October City and want to reach FMCG procurement managers…",
    generate: "Generate Arabic content",
    generating: "Writing in Arabic…",
    output: "Generated content",
    sample: "Sample output – live generation is available in your free trial.",
    copy: "Copy",
    copied: "Copied",
    error: "Couldn't generate right now. Please try again in a minute.",
    limited: "You've reached the demo limit. Start a free trial for unlimited generation.",
    preview: "Preview site: this shows a fixed sample. Live Arabic generation runs on the production site.",
    live: "Live output",
    busy: "The free model is busy right now. Please try again in a minute.",
    badKey: "The test key was rejected. Check it and save it again.",
    tester: "Test mode",
    testerBody: "Preview only: paste an OpenRouter API key to generate live. It stays in this browser and is sent only to OpenRouter.",
    save: "Save key",
    remove: "Remove key",
    connected: "Live test mode is on (key saved in this browser).",
  },
  ar: {
    title: "جرّبه الآن",
    type: "نوع المحتوى",
    types: { linkedin: "منشور لينكدإن", email: "بريد إلكتروني", proposal: "ملخص عرض" },
    register: "مستوى اللغة",
    registers: { msa: "فصحى معاصرة", egyptian: "مصري", gulf: "خليجي" },
    brief: "صف منتجك أو خدمتك",
    placeholder: "مثال: نصنع عبوات صناعية في مدينة 6 أكتوبر ونريد الوصول إلى مديري المشتريات في شركات السلع الاستهلاكية…",
    generate: "ولّد المحتوى العربي",
    generating: "جارٍ الكتابة بالعربية…",
    output: "المحتوى المولّد",
    sample: "مثال توضيحي – التوليد المباشر متاح في التجربة المجانية.",
    copy: "نسخ",
    copied: "تم النسخ",
    error: "تعذّر التوليد الآن. حاول مرة أخرى بعد دقيقة.",
    limited: "وصلت إلى حد التجربة. ابدأ التجربة المجانية للتوليد غير المحدود.",
    preview: "نسخة المعاينة: يظهر هنا مثال ثابت. التوليد العربي المباشر يعمل على الموقع الرسمي.",
    live: "مخرجات مباشرة",
    busy: "النموذج المجاني مشغول الآن. حاول مرة أخرى بعد دقيقة.",
    badKey: "تم رفض مفتاح الاختبار. تحقق منه واحفظه مرة أخرى.",
    tester: "وضع الاختبار",
    testerBody: "للمعاينة فقط: الصق مفتاح OpenRouter للتوليد المباشر. يبقى المفتاح في هذا المتصفح ويُرسل إلى OpenRouter فقط.",
    save: "حفظ المفتاح",
    remove: "حذف المفتاح",
    connected: "وضع الاختبار المباشر مفعّل (المفتاح محفوظ في هذا المتصفح).",
  },
};

export function NexusWidget({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; live: boolean; model?: string } | null>(null);
  const [testKey, setTestKey] = useState<string | null>(null);
  const [draftKey, setDraftKey] = useState("");

  useEffect(() => {
    if (!isPreview) return;
    try {
      setTestKey(localStorage.getItem(TEST_KEY));
    } catch {}
  }, []);

  function saveKey(value: string | null) {
    try {
      if (value) localStorage.setItem(TEST_KEY, value);
      else localStorage.removeItem(TEST_KEY);
    } catch {}
    setTestKey(value);
    setDraftKey("");
  }
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = { type: fd.get("type"), register: fd.get("register"), brief: String(fd.get("brief") ?? "") };
    setLoading(true);
    setError(null);
    setCopied(false);
    track("nexus_generate", { content_type: String(body.type) });
    if (isPreview && testKey) {
      try {
        const out = await generateWithOpenRouter({
          apiKey: testKey,
          type: body.type as NexusType,
          register: body.register as NexusRegister,
          brief: body.brief,
          referer: window.location.origin,
        });
        setResult({ text: out.text, live: true, model: out.model });
      } catch (err) {
        const status = err instanceof NexusError ? err.status : 0;
        setError(status === 401 || status === 403 ? c.badKey : status === 429 ? c.busy : c.error);
      } finally {
        setLoading(false);
      }
      return;
    }
    if (isPreview) {
      setResult({ text: sampleOutput(body.type as NexusType), live: false });
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/v1/nexus/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { text?: string; live?: boolean; error?: string };
      if (!res.ok || !json.text) {
        setError(res.status === 429 ? c.limited : c.error);
      } else {
        setResult({ text: json.text, live: Boolean(json.live) });
      }
    } catch {
      setError(c.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 rounded-3xl border bg-card p-6 shadow-sm md:p-8 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="grid content-start gap-4">
        <h3 className="flex items-center gap-2 text-xl font-bold text-brand-navy">
          <Sparkles className="h-5 w-5 text-brand-teal-dark" aria-hidden />
          {c.title}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="nx-type">{c.type}</Label>
            <NativeSelect id="nx-type" name="type" defaultValue="linkedin">
              {Object.entries(c.types).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nx-register">{c.register}</Label>
            <NativeSelect id="nx-register" name="register" defaultValue="msa">
              {Object.entries(c.registers).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nx-brief">{c.brief}</Label>
          <Textarea id="nx-brief" name="brief" required minLength={10} maxLength={500} placeholder={c.placeholder} />
        </div>
        <Button type="submit" variant="teal" disabled={loading}>
          <Sparkles />
          {loading ? c.generating : c.generate}
        </Button>
        {error ? (
          <p role="alert" className="text-sm text-brand-red">
            {error}
          </p>
        ) : null}
      </form>
      <div className="flex min-h-[280px] flex-col rounded-2xl bg-surface-subtle p-5" aria-live="polite">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">{c.output}</p>
          {result ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-brand-teal-dark hover:underline"
              onClick={() => {
                navigator.clipboard?.writeText(result.text).then(() => setCopied(true));
              }}
            >
              <Copy className="h-3.5 w-3.5" aria-hidden />
              {copied ? c.copied : c.copy}
            </button>
          ) : null}
        </div>
        {loading ? (
          <div className="mt-4 space-y-3" aria-hidden>
            {[90, 75, 85, 60].map((w) => (
              <div key={w} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : result ? (
          <>
            <p dir="rtl" lang="ar" className="mt-4 flex-1 whitespace-pre-line font-arabic text-base leading-loose text-foreground">
              {result.text}
            </p>
            {result.live ? (
              result.model ? (
                <p className="mt-4 text-xs text-muted-foreground">
                  {c.live} · <span dir="ltr">{result.model}</span>
                </p>
              ) : null
            ) : (
              <p className="mt-4 text-xs text-muted-foreground">{isPreview ? c.preview : c.sample}</p>
            )}
          </>
        ) : null}
      </div>
      {isPreview ? (
        <details className="rounded-xl border border-dashed bg-surface-subtle/60 p-4 text-sm lg:col-span-2">
          <summary className="flex cursor-pointer items-center gap-2 font-semibold text-brand-navy">
            <KeyRound className="h-4 w-4 text-brand-teal-dark" aria-hidden />
            {c.tester}
            {testKey ? <span className="rounded-md bg-brand-green/10 px-1.5 py-0.5 text-[11px] font-bold text-brand-green">ON</span> : null}
          </summary>
          <p className="mt-2 text-muted-foreground">{testKey ? c.connected : c.testerBody}</p>
          {testKey ? (
            <button type="button" onClick={() => saveKey(null)} className="mt-3 text-sm font-semibold text-brand-red hover:underline">
              {c.remove}
            </button>
          ) : (
            <form
              className="mt-3 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (draftKey.trim()) saveKey(draftKey.trim());
              }}
            >
              <label htmlFor="nx-key" className="sr-only">
                OpenRouter API key
              </label>
              <input
                id="nx-key"
                type="password"
                autoComplete="off"
                dir="ltr"
                value={draftKey}
                onChange={(e) => setDraftKey(e.target.value)}
                placeholder="sk-or-v1-…"
                className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
              />
              <Button type="submit" variant="secondary" size="sm" className="h-10">
                {c.save}
              </Button>
            </form>
          )}
        </details>
      ) : null}
    </div>
  );
}
