import React, { useRef, useEffect, useState } from 'react';

const AnimatedSection = ({ 
  children, 
  delay = 0, 
  animation = 'fade-in-up',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animationClass = isVisible ? 
    `opacity-100 translate-y-0 scale-100` : 
    `opacity-0 ${animation === 'slide-in-left' ? '-translate-x-10' : 
                   animation === 'slide-in-right' ? 'translate-x-10' : 
                   animation === 'scale-in' ? 'scale-95' : 'translate-y-10'}`;

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 