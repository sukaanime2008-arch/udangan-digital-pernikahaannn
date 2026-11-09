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
  const [bloomed, setBloomed] = React.useState(false);
  const cornerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = cornerRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setBloomed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBloomed(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const transformClass = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <div
      ref={cornerRef}
      className={`w-12 h-16 sm:w-16 sm:h-22 md:w-20 md:h-26 pointer-events-none select-none drop-shadow-xs ${transformClass} ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-full origin-center"
        style={{
          transform: bloomed ? 'scale(1)' : 'scale(0.3)',
          opacity: bloomed ? 0.8 : 0,
          transition: 'transform 0.85s cubic-bezier(0.34, 1.45, 0.64, 1), opacity 0.65s ease-out',
        }}
      >
        <img
          src="/assets/bunga-cluster.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
