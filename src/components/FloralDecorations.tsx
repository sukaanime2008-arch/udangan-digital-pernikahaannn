import React from 'react';

/**
 * Refined Minimalist Gold Dividers and Botanical Ornaments
 * Blue floral ornaments removed as requested.
 */

export const FloralBranchTop: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2.5 my-4 sm:my-6 px-4 text-[#C5A059] ${className}`} aria-hidden="true">
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]/70" />
      <div className="w-2 h-2 rotate-45 border border-[#C5A059] bg-[#FFF2D6] shadow-2xs" />
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]/70" />
    </div>
  );
};

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2.5 my-6 sm:my-8 px-6 text-[#C5A059] ${className}`} aria-hidden="true">
      <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A059]/80" />
      <div className="w-2 h-2 rotate-45 border border-[#C5A059] bg-[#FFF2D6] shadow-2xs" />
      <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A059]/80" />
    </div>
  );
};

export const BotanicalCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = () => {
  // Blue floral corner ornaments removed
  return null;
};
