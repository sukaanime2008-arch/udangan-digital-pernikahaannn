import React from 'react';

interface CoupleSilhouetteIconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Minimalist fine line-art silhouette icon of the bride and groom.
 * Designed with elegant, delicate lines harmonious with luxury wedding stationery.
 */
export const CoupleSilhouetteIcon: React.FC<CoupleSilhouetteIconProps> = ({
  className = 'w-6 h-6',
  strokeWidth = 1.6,
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Groom Silhouette (Left) */}
      {/* Groom Head Profile & Gentle Hairline */}
      <circle
        cx="18"
        cy="13"
        r="5.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Groom Collar & Shoulder Outline */}
      <path
        d="M9 36C9 28.5 14 24 20 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Groom Formal Tuxedo/Suit Collar V-neck */}
      <path
        d="M17.5 24.5L19.5 29L16 32"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bride Silhouette with Graceful Flowing Hijab / Veil (Right) */}
      {/* Bride Head & Gentle Curve */}
      <circle
        cx="30"
        cy="14.5"
        r="5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Flowing Veil Arc draping backwards */}
      <path
        d="M26 14C26 9.5 29.5 6.5 33 8C36 9.5 37.5 13 37 18C36.5 23 37.5 30 39 36"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
      {/* Bride Graceful Shoulder / Gown */}
      <path
        d="M24 25C27 25 31 27 34 31C35.5 33 36 34.5 36.5 36"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Tender Interlocking Heart at Center between Groom & Bride */}
      <path
        d="M24 20.8C25 19.5 27 19.8 27.8 21.2C28.5 22.8 27 24.5 24 26C21 24.5 19.5 22.8 20.2 21.2C21 19.8 23 19.5 24 20.8Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinejoin="round"
      />
    </svg>
  );
};
