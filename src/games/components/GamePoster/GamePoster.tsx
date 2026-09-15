import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function GamePoster({ src, alt }: Props) {
  const [source, setSource] = useState<string>(src);

  return (
    <img
      src={source}
      onError={() => setSource("/posters/placeholder.png")}
      alt={alt}
      loading="lazy"
      className="
        h-full
        w-full
        object-cover
        bg-zinc-800
        transition-transform
        duration-150
        group-hover:scale-[1.02]
      "
    />
  );
}