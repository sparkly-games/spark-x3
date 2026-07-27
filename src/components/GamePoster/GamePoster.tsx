import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function GamePoster({ src, alt }: Props) {
  const [source, setSource] = useState<string>(src);
  return (
    <>
      {/* Blurred background fill */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          h-full
          w-full
          scale-110
          object-cover
          blur-xl
          opacity-20
          pointer-events-none
        "
      />

      {/* Main poster */}
      <img
        src={source}
        onError={() => setSource("/posters/placeholder.png")}
        alt={alt}
        loading="lazy"
        className="
          relative
          z-0
          h-full
          w-full
          object-contain
          pointer-events-none
        "
      />

      {/* Edge fade */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(9,9,11,0.55)_100%)]
        "
      />
    </>
  );
}