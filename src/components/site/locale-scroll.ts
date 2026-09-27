/**
 * Keeps the visitor's place when switching language. Arabic and English pages
 * have the same sections but different heights, so the position is saved as
 * "section N, X% through it" rather than as pixels.
 */
const KEY = "locale-scroll";
const norm = (p: string) => p.replace(/\/+$/, "") || "/";

function sections() {
  return Array.from(document.querySelectorAll<HTMLElement>("main section"));
}

export function saveLocaleScroll(target: string) {
  try {
    const list = sections();
    const i = list.findIndex((s) => s.getBoundingClientRect().bottom > 0);
    let frac = 0;
    if (i >= 0) {
      const r = list[i].getBoundingClientRect();
      frac = r.height ? Math.min(1, Math.max(0, -r.top / r.height)) : 0;
    }
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sessionStorage.setItem(KEY, JSON.stringify({ to: norm(target), i, frac, ratio: max > 0 ? window.scrollY / max : 0, y: window.scrollY }));
  } catch {}
}

export function restoreLocaleScroll(pathname: string) {
  let saved: { to: string; i: number; frac: number; ratio: number; y: number } | null = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
    sessionStorage.removeItem(KEY);
  } catch {}
  if (!saved || saved.to !== norm(pathname) || saved.y <= 0) return;
  const s = saved;
  const apply = () => {
    const list = sections();
    let top: number;
    if (s.i >= 0 && list[s.i]) {
      const r = list[s.i].getBoundingClientRect();
      top = r.top + window.scrollY + r.height * s.frac;
    } else {
      top = s.ratio * (document.documentElement.scrollHeight - window.innerHeight);
    }
    window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
  };
  apply();
  // Once more after fonts and late layout settle.
  requestAnimationFrame(() => requestAnimationFrame(apply));
  document.fonts?.ready.then(apply).catch(() => {});
}
