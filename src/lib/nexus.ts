/**
 * Nexus AI demo – prompt and OpenRouter client shared by the server route
 * (production, key in OPENROUTER_API_KEY) and the preview tester (key kept
 * in the tester's own browser, never in the bundle).
 */

export type NexusType = "linkedin" | "email" | "proposal";
export type NexusRegister = "msa" | "egyptian" | "gulf";

const TYPE_LABEL: Record<NexusType, string> = {
  linkedin: "a LinkedIn post (120–180 words, 3–5 relevant Arabic hashtags at the end)",
  email: "a short B2B outreach email with a subject line (under 150 words)",
  proposal: "the executive-summary section of a sales proposal (150–220 words, with 3 bullet points)",
};

const REGISTER_LABEL: Record<NexusRegister, string> = {
  msa: "Modern Standard Arabic suitable for business audiences across MENA",
  egyptian: "professional Egyptian Arabic (light colloquial, still business-appropriate)",
  gulf: "professional Gulf Arabic (Saudi/Emirati business tone)",
};

export const NEXUS_SYSTEM = `You are Nexus AI, an Arabic-first B2B marketing writer for companies in Egypt and the Gulf.
Write directly in Arabic – compose it natively, never translate from English.
Be specific and concrete; use numbers and timeframes when the brief provides them. Do not invent statistics, customer names or awards.
If the brief is too vague or meaningless to write from, write a short, generic but professional piece for a manufacturing company and keep it honest.
Return only the finished content in Arabic, with no preamble, notes, reasoning or English.`;

export function nexusUserPrompt(type: NexusType, register: NexusRegister, brief: string) {
  return `Write ${TYPE_LABEL[type]} in ${REGISTER_LABEL[register]}.\n\n<brief>\n${brief}\n</brief>`;
}

// ─── OpenRouter ─────────────────────────────────────────────────────────
const OPENROUTER = "https://openrouter.ai/api/v1";

/** Preferred free Nemotron models, best first. The live model list decides the final id. */
const PREFERRED = ["nemotron-3-nano-omni", "nemotron-3-nano", "nemotron-nano"];

let resolved: string | null = null;

/**
 * Resolves the model id: an explicit id wins; otherwise the first free
 * Nemotron model on OpenRouter matching PREFERRED (ids change as NVIDIA ships
 * new versions, so we look it up instead of hard-coding it).
 */
export async function resolveNexusModel(explicit?: string | null): Promise<string> {
  if (explicit) return explicit;
  if (resolved) return resolved;
  try {
    const res = await fetch(`${OPENROUTER}/models`);
    const { data } = (await res.json()) as { data: { id: string }[] };
    const free = data.map((m) => m.id).filter((id) => id.includes("nemotron") && id.endsWith(":free"));
    for (const p of PREFERRED) {
      const hit = free.find((id) => id.includes(p));
      if (hit) return (resolved = hit);
    }
    if (free[0]) return (resolved = free[0]);
  } catch {}
  return (resolved = "nvidia/nemotron-3-nano-omni:free");
}

/** Removes reasoning the model may leave inline (e.g. <think>…</think>). */
function clean(text: string) {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

export class NexusError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export async function generateWithOpenRouter(opts: {
  apiKey: string;
  type: NexusType;
  register: NexusRegister;
  brief: string;
  model?: string | null;
  referer?: string;
  signal?: AbortSignal;
}): Promise<{ text: string; model: string }> {
  const model = await resolveNexusModel(opts.model);
  const res = await fetch(`${OPENROUTER}/chat/completions`, {
    method: "POST",
    signal: opts.signal,
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "VELIXI - Nexus demo",
      ...(opts.referer ? { "HTTP-Referer": opts.referer } : {}),
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: NEXUS_SYSTEM },
        { role: "user", content: nexusUserPrompt(opts.type, opts.register, opts.brief) },
      ],
      max_tokens: 1500,
      temperature: 0.6,
      // Keep any reasoning out of the visible answer.
      reasoning: { exclude: true },
    }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string; code?: number };
    model?: string;
  };
  if (!res.ok || json.error) throw new NexusError(json.error?.message ?? `OpenRouter ${res.status}`, json.error?.code ?? res.status);
  const text = clean(json.choices?.[0]?.message?.content ?? "");
  if (!text) throw new NexusError("empty", 502);
  return { text, model: json.model ?? model };
}
