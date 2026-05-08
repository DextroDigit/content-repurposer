"use client";

import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import OutputGrid from "@/components/OutputGrid";
import ErrorMessage from "@/components/ErrorMessage";
import EmailGate from "@/components/EmailGate";
import type { GenerateResponse } from "@/lib/types";

export default function Home() {
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<GenerateResponse | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleEmailSubmitted = async (email: string) => {
    setUserEmail(email);
    setError(null);
    setLoading(true);
    setOutput(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: inputType,
          content: inputValue.trim(),
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }

      const data: GenerateResponse = await res.json();
      setOutput(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOutput(null);
    setUserEmail(null);
    setInputValue("");
    setError(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Subtle dot grid background */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none" />

      <main className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 ring-1 ring-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-400">Free to use</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            One post,{" "}
            <span className="text-gradient">every platform</span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-zinc-400 leading-relaxed sm:text-lg">
            Paste a blog post or article. Get 15+ ready-to-post social content
            for Twitter, LinkedIn, Instagram, Facebook, and TikTok — in seconds.
          </p>

          {/* Platform badges */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {[
              { name: "Twitter/X", color: "text-sky-400 bg-sky-500/10 ring-sky-500/20" },
              { name: "LinkedIn", color: "text-blue-400 bg-blue-500/10 ring-blue-500/20" },
              { name: "Instagram", color: "text-pink-400 bg-pink-500/10 ring-pink-500/20" },
              { name: "Facebook", color: "text-indigo-400 bg-indigo-500/10 ring-indigo-500/20" },
              { name: "TikTok", color: "text-rose-400 bg-rose-500/10 ring-rose-500/20" },
            ].map((p) => (
              <span
                key={p.name}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ring-1 ${p.color}`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Input */}
        {!output && (
          <InputPanel
            inputType={inputType}
            onInputTypeChange={(type) => {
              setInputType(type);
              setError(null);
            }}
            value={inputValue}
            onValueChange={(val) => {
              setInputValue(val);
              setError(null);
            }}
          />
        )}

        {/* Email Gate */}
        {!userEmail && inputValue.trim() && !loading && !output && (
          <EmailGate onEmailSubmitted={handleEmailSubmitted} />
        )}

        {/* Error */}
        {error && <ErrorMessage message={error} />}

        {/* Loading Skeleton */}
        {loading && (
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.06] p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg skeleton-shimmer" />
                  <div>
                    <div className="h-3 w-20 rounded skeleton-shimmer" />
                    <div className="mt-1.5 h-2 w-28 rounded skeleton-shimmer" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="rounded-xl bg-white/[0.02] p-3.5">
                      <div className="h-3 w-full rounded skeleton-shimmer" />
                      <div className="mt-2 h-3 w-2/3 rounded skeleton-shimmer" />
                      <div className="mt-2 h-3 w-1/2 rounded skeleton-shimmer" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !output && !inputValue.trim() && (
          <div className="mx-auto mt-16 max-w-lg text-center animate-fade-in">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
              <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-sm text-zinc-500">
              Paste a blog URL or article text above to get started.
              <br />
              <span className="text-zinc-600">It&apos;s free and takes seconds.</span>
            </p>
          </div>
        )}

        {/* Output */}
        {output && !loading && (
          <>
            <div className="mx-auto mt-10 mb-8 max-w-5xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-400">
                  <span className="text-white font-medium">15 posts</span> generated for{" "}
                  <span className="text-emerald-400">{userEmail}</span>
                </p>
              </div>
              <button
                onClick={handleReset}
                className="rounded-xl bg-white/[0.04] px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.08] ring-1 ring-white/[0.06] transition-all duration-200"
              >
                Repurpose another
              </button>
            </div>
            <OutputGrid data={output} />
          </>
        )}
      </main>

      {/* Footer */}
      {!output && (
        <footer className="relative pb-8 text-center">
          <p className="text-xs text-zinc-700">
            No credit card required. Your content stays private.
          </p>
        </footer>
      )}
    </div>
  );
}
