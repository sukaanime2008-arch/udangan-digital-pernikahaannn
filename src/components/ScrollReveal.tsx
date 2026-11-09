import React, { useEffect, useRef, useState } from 'react';

export type ScrollRevealDirection = 'up' | 'fade-right' | 'fade-left' | 'zoom-in' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  threshold?: number;
  direction?: ScrollRevealDirection;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'fade-right':
        return 'translate3d(-48px, 0, 0)';
      case 'fade-left':
        return 'translate3d(48px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.82)';
      case 'up':
        return 'translate3d(0, 36px, 0) scale(0.98)';
      case 'none':
      default:
        return 'none';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-800 ${className}`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionProperty: 'transform, opacity',
        transitionDuration: '850ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};
