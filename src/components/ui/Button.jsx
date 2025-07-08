import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  disabled,
  loading,
  leftIcon,
  rightIcon,
  fullWidth,
  type = 'button',
  ...props 
}, ref) => {
  
  // Apple-inspired variant styles
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-apple hover:shadow-apple-md',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-150 active:bg-gray-200 border border-gray-200',
    outline: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-50 active:bg-blue-100',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-150',
    link: 'bg-transparent text-blue-500 hover:text-blue-600 active:text-blue-700 underline-offset-4 hover:underline',
    success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-apple hover:shadow-apple-md',
    warning: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-apple hover:shadow-apple-md',
    error: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-apple hover:shadow-apple-md',
    glass: 'bg-white/80 backdrop-blur-apple text-gray-900 border border-gray-200/50 hover:bg-white/90'
  };
  
  // Apple-inspired size styles (More Compact)
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-apple-sm',
    sm: 'px-3 py-1.5 text-sm rounded-apple-sm',
    default: 'px-4 py-2 text-sm rounded-apple',
    lg: 'px-6 py-3 text-base rounded-apple-lg',
    xl: 'px-8 py-4 text-lg rounded-apple-xl',
    icon: 'p-2 rounded-apple'
  };
  
  return (
    <button
      className={cn(
        // Base styles - Apple design principles
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95 active:transition-transform active:duration-75',
        'select-none whitespace-nowrap',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Full width
        fullWidth && 'w-full',
        
        // Custom className
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      type={type}
      {...props}
    >
      {loading && (
        <div className="loading-spinner w-4 h-4 border-current border-t-transparent" />
      )}
      
      {leftIcon && !loading && (
        <span className="shrink-0">{leftIcon}</span>
      )}
      
      {children && (
        <span className="truncate">{children}</span>
      )}
      
      {rightIcon && !loading && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 