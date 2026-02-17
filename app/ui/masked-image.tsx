import { useId } from "react";
import clsx from "clsx";

export interface MaskedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MaskedImage({
  src,
  alt,
  width = 320,
  height = 320,
  className,
}: MaskedImageProps) {
  const clipId = useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 320"
      className={clsx("block", className)}
      role="img"
      aria-label={alt}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M160 18 C222 8 304 64 302 152 C300 250 224 304 150 302 C72 300 18 242 18 160 C18 76 84 30 160 18 Z" />
        </clipPath>
      </defs>
      <image
        href={src}
        width="320"
        height="320"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
