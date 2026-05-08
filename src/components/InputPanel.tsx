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
      <div className="mb-3 flex gap-1 rounded-lg bg-zinc-800/50 p-1 w-fit">
        <button
          onClick={() => onInputTypeChange("url")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            inputType === "url"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Paste URL
        </button>
        <button
          onClick={() => onInputTypeChange("text")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            inputType === "text"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Paste Text
        </button>
      </div>

      {/* Input */}
      {inputType === "url" ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="https://yourblog.com/post"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3
            text-sm text-white placeholder-zinc-500 outline-none
            focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
            transition-colors"
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Paste your blog post or article text here..."
          rows={8}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3
            text-sm text-white placeholder-zinc-500 outline-none
            focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
            transition-colors resize-y"
        />
      )}
    </div>
  );
}
