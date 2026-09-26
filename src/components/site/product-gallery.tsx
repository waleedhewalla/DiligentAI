"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Offering } from "@/content/catalog/types";
import { asset, cn } from "@/lib/utils";

type Media = NonNullable<Offering["media"]>[number];

/**
 * Real product screenshots with thumbnails. Images are plain <img> (static
 * export friendly), lazy below the fold, with explicit size to avoid layout shift.
 */
export function ProductGallery({ media, locale, note, eager = false }: { media: Media[]; locale: Locale; note: string; eager?: boolean }) {
  const [i, setI] = useState(0);
  const m = media[i];
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border bg-surface-subtle shadow-xl ring-1 ring-black/5">
        {/* Browser chrome makes it read as a real app, not an illustration. */}
        <div className="flex items-center gap-1.5 border-b bg-background px-3 py-2" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={m.src}
          src={asset(m.src)}
          width={m.width}
          height={m.height}
          alt={m.alt[locale]}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
          dir="ltr"
        />
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        {m.caption ? <span className="font-medium text-foreground">{m.caption[locale]} · </span> : null}
        {note}
      </figcaption>
      {media.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {media.map((x, n) => (
            <button
              key={x.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={x.caption?.[locale] ?? x.alt[locale]}
              aria-pressed={n === i}
              className={cn("w-28 overflow-hidden rounded-lg border-2 transition", n === i ? "border-brand-orange-dark" : "border-transparent opacity-70 hover:opacity-100")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(x.src)} width={x.width} height={x.height} alt="" loading="lazy" className="block h-auto w-full" />
            </button>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
