import React from 'react';

/**
 * Botanical & Floral watercolor ornaments in Pastel Blue (#8FA9C4 / #7B9CB9),
 * Deep Navy (#000080), Dusty Rose (#D4A5A5), and Fine Gold (#C5A059).
 * Completely free of green/sage tones.
 */

export const FloralBranchTop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-3 ${className}`} aria-hidden="true">
    <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60" />
    <div className="w-7 h-7 sm:w-8 sm:h-8 pointer-events-none select-none opacity-85 drop-shadow-2xs">
      <img
        src="/assets/bunga-cluster.png"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
    <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/60" />
  </div>
);

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-2.5 my-3 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
    <div className="w-5 h-5 pointer-events-none select-none opacity-80">
      <img
        src="/assets/bunga-cluster.png"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
    <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
  </div>
);

export const BotanicalCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const transformClass = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <div
      className={`w-7 h-9 sm:w-9 sm:h-11 pointer-events-none select-none opacity-80 drop-shadow-2xs ${transformClass} ${className}`}
      aria-hidden="true"
    >
      <img
        src="/assets/bunga-cluster.png"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  );
};
