import React from 'react';

/**
 * Botanical & Floral watercolor ornaments in Pastel Blue (#8FA9C4 / #7B9CB9),
 * Deep Navy (#000080), Dusty Rose (#D4A5A5), and Fine Gold (#C5A059).
 * Completely free of green/sage tones.
 */

export const FloralBranchTop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-52 h-14 mx-auto ${className}`}
    aria-hidden="true"
  >
    {/* Central soft gold branch */}
    <path
      d="M20 30 C 80 15, 160 45, 220 30"
      stroke="#C5A059"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.65"
    />
    {/* Soft Pastel Blue Watercolor Leaves */}
    <path
      d="M60 26 C 65 14, 80 16, 76 27 C 72 38, 55 35, 60 26 Z"
      fill="#8FA9C4"
      opacity="0.85"
    />
    <path
      d="M100 24 C 105 10, 120 12, 115 25 C 110 38, 95 34, 100 24 Z"
      fill="#7B9CB9"
      opacity="0.8"
    />
    <path
      d="M140 34 C 145 22, 160 24, 155 35 C 150 48, 135 44, 140 34 Z"
      fill="#8FA9C4"
      opacity="0.85"
    />
    <path
      d="M180 32 C 185 20, 200 22, 195 33 C 190 46, 175 42, 180 32 Z"
      fill="#7B9CB9"
      opacity="0.8"
    />
    {/* Deep Navy Floral Accent Buds */}
    <path
      d="M84 20 C 88 15, 96 17, 94 23 C 92 28, 82 25, 84 20 Z"
      fill="#000080"
      opacity="0.75"
    />
    <path
      d="M156 38 C 160 32, 168 34, 166 40 C 164 45, 154 43, 156 38 Z"
      fill="#000080"
      opacity="0.7"
    />
    {/* Gold tendril sprigs */}
    <path
      d="M120 28 Q 130 18 138 20"
      stroke="#C5A059"
      strokeWidth="0.9"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Dusty Rose gentle flower petal accents */}
    <circle cx="120" cy="28" r="4.5" fill="#D4A5A5" opacity="0.9" />
    <circle cx="120" cy="28" r="2" fill="#FAF9F6" />
    <circle cx="45" cy="28" r="2.5" fill="#000080" opacity="0.65" />
    <circle cx="198" cy="33" r="2.5" fill="#8FA9C4" opacity="0.9" />
  </svg>
);

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]/80" />
    <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8FA9C4]" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A059] bg-[#FAF9F6] shadow-2xs" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#000080]/60" />
    </div>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]/80" />
  </div>
);

export const BotanicalCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 pointer-events-none ${rotation} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M5 95 C 10 40, 40 10, 95 5"
        stroke="#C5A059"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        opacity="0.5"
      />
      {/* Soft Pastel Blue leaves */}
      <path
        d="M20 70 C 22 55, 35 50, 32 68 C 28 82, 18 78, 20 70 Z"
        fill="#8FA9C4"
        opacity="0.75"
      />
      {/* Deep Navy leaves */}
      <path
        d="M45 45 C 50 30, 65 32, 60 48 C 55 60, 40 55, 45 45 Z"
        fill="#000080"
        opacity="0.65"
      />
      {/* Gold & Blue sprig */}
      <path
        d="M70 20 C 72 8, 85 10, 82 22 C 78 32, 68 28, 70 20 Z"
        fill="#7B9CB9"
        opacity="0.8"
      />
      <circle cx="55" cy="40" r="3.5" fill="#D4A5A5" opacity="0.85" />
      <circle cx="28" cy="74" r="2" fill="#000080" opacity="0.6" />
    </svg>
  );
};

/**
 * Watercolor Floral Wreath for circular photo frames (Envelope & Main Frame)
 */
export const FloralWreathRound: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full pointer-events-none absolute inset-0 ${className}`}
    aria-hidden="true"
  >
    {/* Delicate gold circle vines */}
    <circle cx="100" cy="100" r="92" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
    <circle cx="100" cy="100" r="88" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" />

    {/* Top-Right pastel blue floral spray */}
    <path d="M145 35 C155 25, 175 32, 170 45 C162 55, 142 45, 145 35 Z" fill="#8FA9C4" opacity="0.85" />
    <path d="M165 48 C175 42, 188 52, 180 62 C172 70, 158 58, 165 48 Z" fill="#000080" opacity="0.75" />
    <circle cx="152" cy="42" r="3.5" fill="#D4A5A5" opacity="0.9" />

    {/* Bottom-Left navy & pastel blue floral spray */}
    <path d="M55 165 C45 175, 25 168, 30 155 C38 145, 58 155, 55 165 Z" fill="#8FA9C4" opacity="0.85" />
    <path d="M35 152 C25 158, 12 148, 20 138 C28 130, 42 142, 35 152 Z" fill="#000080" opacity="0.75" />
    <circle cx="48" cy="158" r="3.5" fill="#D4A5A5" opacity="0.9" />

    {/* Top-Left gold and soft blue sprigs */}
    <path d="M40 55 C32 45, 45 32, 55 42 C62 50, 48 62, 40 55 Z" fill="#7B9CB9" opacity="0.8" />
    <circle cx="38" cy="46" r="2.5" fill="#C5A059" opacity="0.8" />

    {/* Bottom-Right accents */}
    <path d="M160 145 C168 155, 155 168, 145 158 C138 150, 152 138, 160 145 Z" fill="#7B9CB9" opacity="0.8" />
    <circle cx="162" cy="154" r="2.5" fill="#000080" opacity="0.7" />
  </svg>
);
