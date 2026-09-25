"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const ar = params?.locale !== "en";
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main id="main" className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-brand-orange">500</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-navy">{ar ? "حدث خطأ غير متوقع" : "Something went wrong"}</h1>
      <Button className="mt-8" onClick={reset}>
        {ar ? "حاول مرة أخرى" : "Try again"}
      </Button>
    </main>
  );
}
