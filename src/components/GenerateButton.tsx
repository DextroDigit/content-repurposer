"use client";

interface Props {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function GenerateButton({
  loading,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="mx-auto mt-6 block rounded-lg px-8 py-3 text-sm font-semibold
        bg-gradient-to-r from-emerald-500 to-green-500 text-black
        hover:from-emerald-400 hover:to-green-400
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-200
        flex items-center gap-3"
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {loading ? "Generating..." : "Generate Social Posts"}
    </button>
  );
}
