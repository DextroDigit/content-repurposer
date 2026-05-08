interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-xl bg-red-500/5 ring-1 ring-red-500/20 p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10">
          <svg className="h-3.5 w-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm text-red-400 pt-1">{message}</p>
      </div>
    </div>
  );
}
