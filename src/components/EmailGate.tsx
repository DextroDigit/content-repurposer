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
    <div className="mx-auto mt-8 max-w-md rounded-lg border border-emerald-500/20 bg-zinc-800/30 p-6 text-center">
      <p className="text-sm text-zinc-300 mb-1 font-medium">
        One last step
      </p>
      <p className="text-xs text-zinc-400 mb-4">
        Enter your email to generate posts. I&apos;ll send you a copy so you
        don&apos;t lose them, and let you know when new features launch. No spam.
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
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2
            text-sm text-white placeholder-zinc-500 outline-none
            focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
            transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={!email.trim() || loading}
          className="rounded-lg px-4 py-2 text-sm font-semibold
            bg-gradient-to-r from-emerald-500 to-green-500 text-black
            hover:from-emerald-400 hover:to-green-400
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 whitespace-nowrap"
        >
          {loading ? "..." : "Get Posts"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
