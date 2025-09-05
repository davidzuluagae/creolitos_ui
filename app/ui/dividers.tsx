import React from "react";

// Props to customize divider
type DividerProps = {
  color?: string; // Tailwind or hex (e.g., "fill-[#FFD95E]")
  flip?: boolean; // flip vertically
  className?: string;
};

/**
 * Wavy Divider
 */
export const WavyDivider: React.FC<DividerProps> = ({ color = "fill-[#9B6BFF]", flip = false, className }) => (
  <div className={`relative w-full overflow-hidden leading-none ${className}`}>
    <svg
      className={`block w-full h-16 ${flip ? "transform rotate-180" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <path
        d="M321.39 56.44c58-10.79 114.16-30.14 172-41.77 
           82.39-16.69 168.19-17.86 250.57-2.12 
           86.08 16.53 168.75 51.54 254.81 66.6 
           82.79 14.52 168.92 8.69 251.23-13.15V120H0V16.48
           c89.26 23.36 181.73 42.72 273.82 39.96z"
        className={color}
      />
    </svg>
  </div>
);

/**
 * Slanted Divider
 */
export const SlantedDivider: React.FC<DividerProps> = ({ color = "fill-[#FFD95E]", flip = false, className }) => (
  <div className={`relative w-full overflow-hidden leading-none ${className}`}>
    <svg
      className={`block w-full h-12 ${flip ? "transform rotate-180" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <polygon points="0,0 1200,0 0,120" className={color} />
    </svg>
  </div>
);

/**
 * Blob / Organic Divider
 */
export const BlobDivider: React.FC<DividerProps> = ({ color = "fill-[#A6E3B5]", flip = false, className }) => (
  <div className={`relative w-full overflow-hidden leading-none ${className}`}>
    <svg
      className={`block w-full h-24 ${flip ? "transform rotate-180" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        d="M0,224L60,192C120,160,240,96,360,112C480,128,
           600,224,720,250.7C840,277,960,235,1080,197.3C1200,160,
           1320,128,1380,112L1440,96V320H0Z"
        className={color}
      />
    </svg>
  </div>
);
