import React from "react";
import clsx from "clsx";

// Props to customize divider
type DividerProps = {
  color?: string; // Tailwind or hex (e.g., "fill-[#FFD95E]")
  className?: string;
};

/**
 * Wavy Divider
 */
export const WavyDivider: React.FC<DividerProps & { colorBottom: string }> = ({
  color = "fill-[#9B6BFF]",
  colorBottom = "fill-white",
  className,
}) => (
  <div className={clsx("relative w-full overflow-hidden leading-none", className)}>
    <svg
      className="block w-full h-16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <rect
        width="1200"
        height="120"
        className={clsx(colorBottom)}
      />
      <g transform="scale(1, -1) translate(0, -120)">
        <path
          d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1350,60 L1200,120 L0,120 Z"
          className={clsx(color)}
        />
      </g>
    </svg>
  </div>
);

export const ZigZagDivider: React.FC<DividerProps & { colorBottom: string }> = ({
  color = "fill-[#FFD95E]",
  colorBottom = "fill-white",
  className,
}) => (
  <div className={clsx("relative w-full overflow-hidden leading-none", className)}>
    <svg
      className="block w-full h-12"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <polygon
        points="0,0 1200,0 1200,60 0,60"
        className={clsx(color)}
      />
      <polygon
        points="0,60 40,100 80,60 120,100 160,60 200,100 240,60 280,100 320,60 360,100 400,60 440,100 480,60 520,100 560,60 600,100 640,60 680,100 720,60 760,100 800,60 840,100 880,60 920,100 960,60 1000,100 1040,60 1080,100 1120,60 1160,100 1200,60 1200,120 0,120"
        className={clsx(colorBottom)}
      />
    </svg>
  </div>
);

export const BlobDivider: React.FC<DividerProps & { colorBottom: string }> = ({
  color = "fill-[#A6E3B5]",
  colorBottom = "fill-white",
  className,
}) => (
  <div className={clsx("relative w-full overflow-hidden leading-none", className)}>
    <svg
      className="block w-full h-24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <rect
        width="1440"
        height="320"
        className={clsx(colorBottom)}
      />
      <g transform="scale(1, -1) translate(0, -320)">
        <path
          d="M0,224L60,192C120,160,240,96,360,112C480,128,
             600,224,720,250.7C840,277,960,235,1080,197.3C1200,160,
             1320,128,1380,112L1440,96V320H0Z"
          className={clsx(color)}
        />
      </g>
    </svg>
  </div>
);

type StickDividerProps = {
  topColor?: string
  bottomColor?: string
  strokeColor?: string
}

export function StickFigureDivider({
  topColor = "#BFA2DB",
  bottomColor = "#A6E3B5",
  strokeColor = "#3E230E",
}: StickDividerProps) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      className="w-full h-32 block"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* top background */}
      <rect x="0" y="0" width="1200" height="70" fill={topColor} />

      {/* bottom background */}
      <rect x="0" y="70" width="1200" height="70" fill={bottomColor} />

      {/* baseline */}
      <line
        x1="0"
        y1="70"
        x2="1200"
        y2="70"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* FIGURE 1 – sitting */}
      <g transform="translate(200 42)" stroke={strokeColor} strokeWidth="1.5" fill="none">
        <circle cx="0" cy="0" r="6" fill={strokeColor} />
        <line x1="0" y1="6" x2="0" y2="24" />
        <line x1="0" y1="24" x2="-10" y2="34" />
        <line x1="0" y1="24" x2="10" y2="34" />
        <line x1="0" y1="14" x2="-8" y2="18" />
        <line x1="0" y1="14" x2="8" y2="18" />
      </g>

      {/* FIGURE 2 – hanging */}
      <g transform="translate(470 30)" stroke={strokeColor} strokeWidth="1.5" fill="none">
        <circle cx="0" cy="0" r="6" fill={strokeColor} />
        <line x1="0" y1="6" x2="0" y2="30" />
        <line x1="0" y1="30" x2="-7" y2="46" />
        <line x1="0" y1="30" x2="7" y2="46" />
        <line x1="-10" y1="-6" x2="10" y2="-6" />
      </g>

      {/* FIGURE 3 – standing / waving */}
      <g transform="translate(720 40)" stroke={strokeColor} strokeWidth="1.5" fill="none">
        <circle cx="0" cy="0" r="6" fill={strokeColor} />
        <line x1="0" y1="6" x2="0" y2="32" />
        <line x1="0" y1="32" x2="-7" y2="46" />
        <line x1="0" y1="32" x2="7" y2="46" />
        <line x1="0" y1="14" x2="12" y2="6" />
      </g>

      {/* FIGURE 4 – lying on line */}
      <g transform="translate(950 70)" stroke={strokeColor} strokeWidth="1.5" fill="none">
        <circle cx="0" cy="0" r="6" fill={strokeColor} />
        <line x1="6" y1="0" x2="32" y2="0" />
        <line x1="32" y1="0" x2="44" y2="-8" />
        <line x1="32" y1="0" x2="44" y2="8" />
        <line x1="16" y1="-8" x2="16" y2="8" />
      </g>
    </svg>
  )
}
