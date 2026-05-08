interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-red-500/30 bg-red-500/10 p-4">
      <p className="text-sm text-red-400">{message}</p>
    </div>
  );
}
