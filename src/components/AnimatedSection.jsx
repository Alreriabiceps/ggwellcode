import React, { useState, useEffect, useRef } from 'react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting];
};

// Animated section component
const AnimatedSection = ({ children, className = '', delay = 0, animation = 'fade-in-up' }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting 
          ? `opacity-100 ${animation === 'slide-in-left' ? 'translate-x-0' : 
             animation === 'slide-in-right' ? 'translate-x-0' : 
             animation === 'scale-in' ? 'scale-100' : 'translate-y-0'}`
          : `opacity-0 ${animation === 'slide-in-left' ? '-translate-x-20' : 
             animation === 'slide-in-right' ? 'translate-x-20' : 
             animation === 'scale-in' ? 'scale-95' : 'translate-y-10'}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 