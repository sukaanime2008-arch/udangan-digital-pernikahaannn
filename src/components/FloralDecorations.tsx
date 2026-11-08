import React from 'react';

export const FloralBranchTop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-48 h-12 mx-auto text-[#8F9E8B] ${className}`}
    aria-hidden="true"
  >
    {/* Central soft gold stem */}
    <path
      d="M20 30 C 80 15, 160 45, 220 30"
      stroke="#C5A059"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Sage leaves */}
    <path
      d="M60 26 C 65 14, 80 16, 76 27 C 72 38, 55 35, 60 26 Z"
      fill="#8F9E8B"
      opacity="0.75"
    />
    <path
      d="M100 24 C 105 10, 120 12, 115 25 C 110 38, 95 34, 100 24 Z"
      fill="#8F9E8B"
      opacity="0.65"
    />
    <path
      d="M140 34 C 145 22, 160 24, 155 35 C 150 48, 135 44, 140 34 Z"
      fill="#8F9E8B"
      opacity="0.75"
    />
    <path
      d="M180 32 C 185 20, 200 22, 195 33 C 190 46, 175 42, 180 32 Z"
      fill="#8F9E8B"
      opacity="0.65"
    />
    {/* Dusty rose flower bud accents */}
    <circle cx="120" cy="28" r="4" fill="#D4A5A5" opacity="0.9" />
    <circle cx="80" cy="22" r="3" fill="#D4A5A5" opacity="0.8" />
    <circle cx="160" cy="36" r="3" fill="#D4A5A5" opacity="0.8" />
    <circle cx="120" cy="28" r="1.5" fill="#FAF9F6" />
  </svg>
);

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]/80" />
    <div className="w-2 h-2 rotate-45 border border-[#C5A059] bg-[#FAF9F6]" />
    <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]/80" />
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
      className={`w-16 h-16 pointer-events-none text-[#8F9E8B] ${rotation} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M5 95 C 10 40, 40 10, 95 5"
        stroke="#C5A059"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.4"
      />
      <path
        d="M20 70 C 22 55, 35 50, 32 68 C 28 82, 18 78, 20 70 Z"
        fill="#8F9E8B"
        opacity="0.5"
      />
      <path
        d="M45 45 C 50 30, 65 32, 60 48 C 55 60, 40 55, 45 45 Z"
        fill="#8F9E8B"
        opacity="0.45"
      />
      <path
        d="M70 20 C 72 8, 85 10, 82 22 C 78 32, 68 28, 70 20 Z"
        fill="#8F9E8B"
        opacity="0.5"
      />
      <circle cx="55" cy="40" r="3" fill="#D4A5A5" opacity="0.75" />
    </svg>
  );
};
