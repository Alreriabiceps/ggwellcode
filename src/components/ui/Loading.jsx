import React from 'react';
import { cn } from '../../lib/utils';

// Apple-style spinner component
const Spinner = ({ className, size = 'default', color = 'default' }) => {
  const sizes = {
    xs: 'w-3 h-3 border',
    sm: 'w-4 h-4 border',
    default: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-2',
    xl: 'w-12 h-12 border-2'
  };

  const colors = {
    default: 'border-gray-300 border-t-blue-500',
    primary: 'border-blue-200 border-t-blue-500',
    secondary: 'border-gray-200 border-t-gray-500',
    success: 'border-green-200 border-t-green-500',
    warning: 'border-orange-200 border-t-orange-500',
    error: 'border-red-200 border-t-red-500',
    white: 'border-white/30 border-t-white'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};

// Apple-style dots loading
const Dots = ({ className, size = 'default', color = 'default' }) => {
  const sizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    default: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const colors = {
    default: 'bg-gray-400',
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-orange-500',
    error: 'bg-red-500',
    white: 'bg-white'
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            sizes[size],
            colors[color]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};

// Apple-style bars loading
const Bars = ({ className, size = 'default', color = 'default' }) => {
  const sizes = {
    xs: 'w-0.5 h-3',
    sm: 'w-0.5 h-4',
    default: 'w-1 h-5',
    lg: 'w-1 h-6',
    xl: 'w-1.5 h-8'
  };

  const colors = {
    default: 'bg-gray-400',
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-orange-500',
    error: 'bg-red-500',
    white: 'bg-white'
  };

  return (
    <div className={cn('flex gap-1 items-end', className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            sizes[size],
            colors[color]
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  );
};

// Apple-style pulse loading
const Pulse = ({ className, size = 'default', color = 'default' }) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colors = {
    default: 'bg-gray-400',
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-orange-500',
    error: 'bg-red-500',
    white: 'bg-white'
  };

  return (
    <div
      className={cn(
        'rounded-full animate-pulse',
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};

// Main Loading component
const Loading = ({ 
  type = 'spinner', 
  size = 'default', 
  color = 'default',
  text,
  className,
  center = false,
  overlay = false,
  ...props 
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <Dots size={size} color={color} />;
      case 'bars':
        return <Bars size={size} color={color} />;
      case 'pulse':
        return <Pulse size={size} color={color} />;
      default:
        return <Spinner size={size} color={color} />;
    }
  };

  const content = (
    <div 
      className={cn(
        'flex items-center gap-3',
        center && 'justify-center',
        className
      )}
      {...props}
    >
      {renderLoader()}
      {text && (
        <span className="text-sm text-gray-600 font-medium">
          {text}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-apple-md z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

// Button loading state
const ButtonLoading = ({ className, size = 'default', color = 'white' }) => {
  return (
    <Spinner 
      className={className} 
      size={size === 'default' ? 'sm' : size} 
      color={color} 
    />
  );
};

// Card loading skeleton
const CardSkeleton = ({ className, lines = 3, avatar = false }) => {
  return (
    <div className={cn('bg-white rounded-apple-lg shadow-apple border border-gray-200 p-6', className)}>
      <div className="animate-pulse">
        {avatar && (
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {[...Array(lines)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              {i === lines - 1 && (
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// List loading skeleton
const ListSkeleton = ({ className, items = 5 }) => {
  return (
    <div className={cn('space-y-3', className)}>
      {[...Array(items)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-apple border border-gray-200">
          <div className="animate-pulse flex items-center gap-4 w-full">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Table loading skeleton
const TableSkeleton = ({ className, rows = 5, cols = 4 }) => {
  return (
    <div className={cn('bg-white rounded-apple-lg shadow-apple border border-gray-200 overflow-hidden', className)}>
      <div className="animate-pulse">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex gap-4">
            {[...Array(cols)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded flex-1"></div>
            ))}
          </div>
        </div>
        
        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="flex gap-4">
                {[...Array(cols)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded flex-1"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading page wrapper
const LoadingPage = ({ text = 'Loading...', className }) => {
  return (
    <div className={cn('min-h-screen bg-gray-50 flex items-center justify-center', className)}>
      <div className="text-center">
        <Loading size="lg" text={text} center />
      </div>
    </div>
  );
};

// Loading section wrapper
const LoadingSection = ({ text, className, children }) => {
  return (
    <div className={cn('py-12 flex items-center justify-center', className)}>
      <div className="text-center">
        <Loading size="lg" text={text} center />
        {children}
      </div>
    </div>
  );
};

// Export all components
export {
  Loading,
  Spinner,
  Dots,
  Bars,
  Pulse,
  ButtonLoading,
  CardSkeleton,
  ListSkeleton,
  TableSkeleton,
  LoadingPage,
  LoadingSection
};

export default Loading; 