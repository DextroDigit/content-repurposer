import OutputCard from "./OutputCard";
import type { GenerateResponse } from "@/lib/types";

interface Props {
  data: GenerateResponse;
}

const PLATFORMS: Array<{
  key: "twitter" | "linkedin" | "instagram" | "facebook" | "tiktok";
  dataKey: keyof GenerateResponse;
}> = [
  { key: "twitter", dataKey: "twitter" },
  { key: "linkedin", dataKey: "linkedin" },
  { key: "instagram", dataKey: "instagram" },
  { key: "facebook", dataKey: "facebook" },
  { key: "tiktok", dataKey: "tiktok" },
];

export default function OutputGrid({ data }: Props) {
  return (
    <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
      {PLATFORMS.map(({ key, dataKey }, i) => (
        <OutputCard
          key={key}
          platform={key}
          data={data[dataKey]}
          index={i}
        />
      ))}
    </div>
  );
}
