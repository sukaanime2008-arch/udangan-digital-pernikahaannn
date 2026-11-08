import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  threshold?: number;
  direction?: 'up' | 'none';
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

  const transformStyle =
    direction === 'up'
      ? isVisible
        ? 'translateY(0px) scale(1)'
        : 'translateY(36px) scale(0.97)'
      : 'none';

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-800 ${className}`}
      style={{
        transform: transformStyle,
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
