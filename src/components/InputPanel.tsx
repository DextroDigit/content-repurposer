"use client";

interface Props {
  inputType: "url" | "text";
  onInputTypeChange: (type: "url" | "text") => void;
  value: string;
  onValueChange: (value: string) => void;
}

export default function InputPanel({
  inputType,
  onInputTypeChange,
  value,
  onValueChange,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Tab Selector */}
      <div className="mb-4 flex gap-1 rounded-xl bg-white/[0.04] p-1.5 w-fit ring-1 ring-white/[0.06]">
        <button
          onClick={() => onInputTypeChange("url")}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
            inputType === "url"
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Paste URL
        </button>
        <button
          onClick={() => onInputTypeChange("text")}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
            inputType === "text"
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Paste Text
        </button>
      </div>

      {/* Input */}
      {inputType === "url" ? (
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="Paste any blog or article URL..."
            className="w-full rounded-xl bg-white/[0.04] pl-11 pr-4 py-4
              text-sm text-white placeholder-zinc-500 outline-none
              ring-1 ring-white/[0.06]
              focus:ring-2 focus:ring-emerald-500/40
              transition-all duration-200"
          />
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Paste your blog post or article text here..."
          rows={8}
          className="w-full rounded-xl bg-white/[0.04] px-4 py-4
            text-sm text-white placeholder-zinc-500 outline-none
            ring-1 ring-white/[0.06]
            focus:ring-2 focus:ring-emerald-500/40
            transition-all duration-200 resize-y"
        />
      )}
    </div>
  );
}
