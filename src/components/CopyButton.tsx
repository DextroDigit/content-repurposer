"use client";

import { useState } from "react";

interface Props {
  text: string;
}

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 ${
        copied
          ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
          : "bg-white/[0.04] text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08] ring-1 ring-white/[0.04]"
      }`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
