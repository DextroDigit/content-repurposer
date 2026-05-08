"use client";

import { useState } from "react";

interface Props {
  onEmailSubmitted: (email: string) => void;
}

export default function EmailGate({ onEmailSubmitted }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      onEmailSubmitted(email.trim());
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md animate-fade-in">
      <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08] p-6 text-center backdrop-blur-sm">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
          <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <p className="text-sm font-semibold text-white mb-1">
          Enter your email to generate
        </p>
        <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
          Your posts will be ready instantly. I&apos;ll also email you a copy so
          you don&apos;t lose them. No spam, unsubscribe anytime.
        </p>

        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="you@example.com"
            className="flex-1 rounded-xl bg-white/[0.05] px-4 py-3
              text-sm text-white placeholder-zinc-500 outline-none
              ring-1 ring-white/[0.08]
              focus:ring-2 focus:ring-emerald-500/40
              transition-all duration-200"
          />
          <button
            onClick={handleSubmit}
            disabled={!email.trim() || loading}
            className="rounded-xl px-5 py-3 text-sm font-semibold
              bg-gradient-to-r from-emerald-500 to-teal-500 text-black
              hover:from-emerald-400 hover:to-teal-400
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-200 whitespace-nowrap btn-glow"
          >
            {loading ? "..." : "Generate →"}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
