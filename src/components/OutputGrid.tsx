import OutputCard from "./OutputCard";
import type { GenerateResponse } from "@/lib/types";

interface Props {
  data: GenerateResponse;
}

export default function OutputGrid({ data }: Props) {
  return (
    <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      <OutputCard platform="twitter" data={data.twitter} />
      <OutputCard platform="linkedin" data={data.linkedin} />
      <OutputCard platform="instagram" data={data.instagram} />
      <OutputCard platform="facebook" data={data.facebook} />
      <OutputCard platform="tiktok" data={data.tiktok} />
    </div>
  );
}
