import React, { useEffect, useRef, useState } from 'react';

export type ScrollRevealDirection = 'up' | 'fade-right' | 'fade-left' | 'zoom-in' | 'bloom' | 'none';

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
    if (isVisible) return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    switch (direction) {
      case 'fade-right':
        return 'translate3d(-45px, 0, 0)';
      case 'fade-left':
        return 'translate3d(45px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.85)';
      case 'bloom':
        return 'scale(0.35) rotate(-6deg)';
      case 'up':
        return 'translate3d(0, 32px, 0) scale(0.98)';
      case 'none':
      default:
        return 'none';
    }
  };

  const getTransitionTimingFunction = () => {
    if (direction === 'bloom') {
      return 'cubic-bezier(0.34, 1.45, 0.64, 1)';
    }
    return 'cubic-bezier(0.16, 1, 0.3, 1)';
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
        transitionTimingFunction: getTransitionTimingFunction(),
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};
