"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { track } from "@/lib/analytics";
import { LinkedInIcon, WhatsAppIcon, XIcon } from "./icons";

/**
 * Share row for articles and case studies. Uses plain share URLs (no third-party
 * scripts, so no consent or CSP changes). WhatsApp matters most in Egypt and the Gulf.
 */
export function ShareButtons({ url, title, label, copyLabel, copiedLabel }: { url: string; title: string; label: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { id: "linkedin", name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <LinkedInIcon className="h-4 w-4" /> },
    { id: "whatsapp", name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: <WhatsAppIcon className="h-4 w-4" /> },
    { id: "x", name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: <XIcon className="h-4 w-4" /> },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share", { network: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the visible URL bar still works.
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-brand-navy">{label}</span>
      {links.map((l) => (
        <a
          key={l.id}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}: ${l.name}`}
          onClick={() => track("share", { network: l.id })}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-brand-navy hover:bg-muted"
        >
          {l.icon}
        </a>
      ))}
      <button type="button" onClick={copy} className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-medium text-brand-navy hover:bg-muted">
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
