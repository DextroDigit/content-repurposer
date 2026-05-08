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
      className="ml-2 shrink-0 rounded-md px-2 py-1 text-xs font-medium
        bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200
        transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
