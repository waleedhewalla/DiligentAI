import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sampleOutput } from "@/content/nexus-samples";

export const runtime = "nodejs";

const bodySchema = z.object({
  type: z.enum(["linkedin", "email", "proposal"]),
  register: z.enum(["msa", "egyptian", "gulf"]).default("msa"),
  brief: z.string().trim().min(10).max(500),
});

const TYPE_LABEL = {
  linkedin: "a LinkedIn post (120–180 words, 3–5 relevant Arabic hashtags at the end)",
  email: "a short B2B outreach email with a subject line (under 150 words)",
  proposal: "the executive-summary section of a sales proposal (150–220 words, with 3 bullet points)",
} as const;

const REGISTER_LABEL = {
  msa: "Modern Standard Arabic suitable for business audiences across MENA",
  egyptian: "professional Egyptian Arabic (light colloquial, still business-appropriate)",
  gulf: "professional Gulf Arabic (Saudi/Emirati business tone)",
} as const;

const SYSTEM = `You are Nexus AI, an Arabic-first B2B marketing writer for companies in Egypt and the Gulf.
Write directly in Arabic — compose it natively, never translate from English.
Be specific and concrete; use numbers and timeframes when the brief provides them. Do not invent statistics, customer names or awards.
Return only the finished content in Arabic, with no preamble, notes or English.`;

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limited = rateLimit(`nexus:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(limited.retryAfter) } });
  }

  let parsed;
  try {
    parsed = bodySchema.safeParse(await request.json());
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { type, register, brief } = parsed.data;

  // Without an API key the widget still demonstrates the output format.
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ text: sampleOutput(type), live: false });
  }

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: process.env.NEXUS_MODEL ?? "claude-opus-5",
      max_tokens: 2000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Write ${TYPE_LABEL[type]} in ${REGISTER_LABEL[register]}.\n\n<brief>\n${brief}\n</brief>`,
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ error: "refused" }, { status: 422 });
    }
    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ text, live: true });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "busy" }, { status: 503 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Nexus generate failed", error.status, error.message);
    } else {
      console.error("Nexus generate failed", error);
    }
    return NextResponse.json({ text: sampleOutput(type), live: false });
  }
}
