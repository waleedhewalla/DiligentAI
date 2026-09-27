import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sampleOutput } from "@/content/nexus-samples";
import { NEXUS_SYSTEM, NexusError, generateWithOpenRouter, nexusUserPrompt } from "@/lib/nexus";

export const runtime = "nodejs";

const bodySchema = z.object({
  type: z.enum(["linkedin", "email", "proposal"]),
  register: z.enum(["msa", "egyptian", "gulf"]).default("msa"),
  brief: z.string().trim().min(10).max(500),
});

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

  // Provider: NEXUS_PROVIDER wins; otherwise OpenRouter when its key is set, then Anthropic.
  // Without any key the widget still demonstrates the output format.
  const provider =
    process.env.NEXUS_PROVIDER ?? (process.env.OPENROUTER_API_KEY ? "openrouter" : process.env.ANTHROPIC_API_KEY ? "anthropic" : "sample");

  if (provider === "openrouter" && process.env.OPENROUTER_API_KEY) {
    try {
      const out = await generateWithOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
        type,
        register,
        brief,
        model: process.env.NEXUS_OPENROUTER_MODEL,
        referer: process.env.NEXT_PUBLIC_SITE_URL,
        signal: AbortSignal.timeout(60_000),
      });
      return NextResponse.json({ text: out.text, live: true, model: out.model });
    } catch (error) {
      console.error("Nexus generate (OpenRouter) failed", error instanceof NexusError ? error.status : "", error);
      if (error instanceof NexusError && error.status === 429) return NextResponse.json({ error: "busy" }, { status: 503 });
      return NextResponse.json({ text: sampleOutput(type), live: false });
    }
  }

  if (provider !== "anthropic" || !process.env.ANTHROPIC_API_KEY) {
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
      system: NEXUS_SYSTEM,
      messages: [{ role: "user", content: nexusUserPrompt(type, register, brief) }],
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
