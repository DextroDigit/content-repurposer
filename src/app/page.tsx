"use client";

import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import GenerateButton from "@/components/GenerateButton";
import OutputGrid from "@/components/OutputGrid";
import ErrorMessage from "@/components/ErrorMessage";
import type { GenerateResponse } from "@/lib/types";

export default function Home() {
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<GenerateResponse | null>(null);

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    setError(null);
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

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Content <span className="text-emerald-400">Repurposer</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
          Turn one blog post into 15+ scroll-stopping social posts for
          Twitter, LinkedIn, Instagram, Facebook, and TikTok — in one click.
        </p>
      </div>

      {/* Input */}
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

      {/* Generate Button */}
      <GenerateButton
        loading={loading}
        disabled={!inputValue.trim()}
        onClick={handleGenerate}
      />

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Loading Skeleton */}
      {loading && (
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-800/20 p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-4 w-4 rounded skeleton-shimmer" />
                <div className="h-4 w-28 rounded skeleton-shimmer" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="rounded-md bg-zinc-900/40 p-3">
                    <div className="h-3 w-full rounded skeleton-shimmer" />
                    <div className="mt-2 h-3 w-3/4 rounded skeleton-shimmer" />
                    <div className="mt-2 h-3 w-1/2 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !output && (
        <div className="mx-auto mt-12 max-w-lg text-center">
          <div className="text-4xl mb-4 opacity-30">✨</div>
          <p className="text-sm text-zinc-500">
            Paste a blog post URL or article text above and click{" "}
            <span className="text-zinc-400 font-medium">
              Generate Social Posts
            </span>{" "}
            to get started.
          </p>
        </div>
      )}

      {/* Output */}
      {output && !loading && <OutputGrid data={output} />}
    </main>
  );
}
