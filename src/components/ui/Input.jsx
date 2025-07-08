import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ 
  className,
  type = 'text',
  variant = 'default',
  size = 'default',
  error,
  success,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onLeftIconClick,
  onRightIconClick,
  helper,
  label,
  fullWidth = true,
  ...props 
}, ref) => {
  
  // Apple-inspired input variants
  const variants = {
    default: 'bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500',
    filled: 'bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500',
    underlined: 'bg-transparent border-0 border-b-2 border-gray-200 rounded-none focus:border-blue-500 focus:bg-transparent',
    ghost: 'bg-transparent border-gray-200 focus:bg-gray-50 focus:border-blue-500'
  };
  
  // Apple-inspired input sizes (Mobile Responsive)
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-apple-sm',
    default: 'px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-apple',
    lg: 'px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg rounded-apple-lg'
  };
  
  // Error and success states
  const validationStates = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  };
  
  const inputClasses = cn(
    // Base styles - Apple design principles
    'w-full transition-all duration-200 placeholder-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    
    // Variant styles
    variants[variant],
    
    // Size styles
    sizes[size],
    
    // Validation states
    error && validationStates.error,
    success && validationStates.success,
    
    // Icon padding adjustments
    LeftIcon && 'pl-11',
    RightIcon && 'pr-11',
    
    // Full width
    !fullWidth && 'w-auto',
    
    // Custom className
    className
  );
  
  const Component = (
    <div className={cn('relative', !fullWidth && 'inline-block')}>
      {/* Left Icon */}
      {LeftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {onLeftIconClick ? (
            <button
              type="button"
              onClick={onLeftIconClick}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-blue-500"
            >
              <LeftIcon className="w-5 h-5" />
            </button>
          ) : (
            <LeftIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>
      )}
      
      {/* Input */}
      <input
        className={inputClasses}
        ref={ref}
        type={type}
        {...props}
      />
      
      {/* Right Icon */}
      {RightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {onRightIconClick ? (
            <button
              type="button"
              onClick={onRightIconClick}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-blue-500"
            >
              <RightIcon className="w-5 h-5" />
            </button>
          ) : (
            <RightIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>
      )}
    </div>
  );
  
  // If no label or helper text, return just the input
  if (!label && !helper && !error && !success) {
    return Component;
  }
  
  // Return wrapped component with label and helper text
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      
      {Component}
      
      {/* Helper text */}
      {helper && !error && !success && (
        <p className="form-help">{helper}</p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="form-error" role="alert">
          {typeof error === 'string' ? error : 'Please check this field'}
        </p>
      )}
      
      {/* Success message */}
      {success && (
        <p className="form-success">
          {typeof success === 'string' ? success : 'Looks good!'}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Textarea Component
const Textarea = React.forwardRef(({ 
  className,
  variant = 'default',
  size = 'default',
  error,
  success,
  helper,
  label,
  rows = 4,
  fullWidth = true,
  ...props 
}, ref) => {
  
  // Apple-inspired textarea variants
  const variants = {
    default: 'bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500',
    filled: 'bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500',
    ghost: 'bg-transparent border-gray-200 focus:bg-gray-50 focus:border-blue-500'
  };
  
  // Apple-inspired textarea sizes
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-apple-sm',
    default: 'px-4 py-3 text-base rounded-apple',
    lg: 'px-5 py-4 text-lg rounded-apple-lg'
  };
  
  // Error and success states
  const validationStates = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  };
  
  const textareaClasses = cn(
    // Base styles - Apple design principles
    'w-full transition-all duration-200 placeholder-gray-500 resize-y',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    
    // Variant styles
    variants[variant],
    
    // Size styles
    sizes[size],
    
    // Validation states
    error && validationStates.error,
    success && validationStates.success,
    
    // Full width
    !fullWidth && 'w-auto',
    
    // Custom className
    className
  );
  
  const Component = (
    <textarea
      className={textareaClasses}
      ref={ref}
      rows={rows}
      {...props}
    />
  );
  
  // If no label or helper text, return just the textarea
  if (!label && !helper && !error && !success) {
    return Component;
  }
  
  // Return wrapped component with label and helper text
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      
      {Component}
      
      {/* Helper text */}
      {helper && !error && !success && (
        <p className="form-help">{helper}</p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="form-error" role="alert">
          {typeof error === 'string' ? error : 'Please check this field'}
        </p>
      )}
      
      {/* Success message */}
      {success && (
        <p className="form-success">
          {typeof success === 'string' ? success : 'Looks good!'}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Select Component
const Select = React.forwardRef(({ 
  className,
  variant = 'default',
  size = 'default',
  error,
  success,
  helper,
  label,
  placeholder,
  children,
  fullWidth = true,
  ...props 
}, ref) => {
  
  // Apple-inspired select variants
  const variants = {
    default: 'bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500',
    filled: 'bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500',
    ghost: 'bg-transparent border-gray-200 focus:bg-gray-50 focus:border-blue-500'
  };
  
  // Apple-inspired select sizes
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-apple-sm',
    default: 'px-4 py-3 text-base rounded-apple',
    lg: 'px-5 py-4 text-lg rounded-apple-lg'
  };
  
  // Error and success states
  const validationStates = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  };
  
  const selectClasses = cn(
    // Base styles - Apple design principles
    'w-full transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'appearance-none bg-no-repeat bg-right bg-[length:16px]',
    'pr-10', // Space for dropdown arrow
    
    // Variant styles
    variants[variant],
    
    // Size styles
    sizes[size],
    
    // Validation states
    error && validationStates.error,
    success && validationStates.success,
    
    // Full width
    !fullWidth && 'w-auto',
    
    // Custom className
    className
  );
  
  const Component = (
    <div className={cn('relative', !fullWidth && 'inline-block')}>
      <select
        className={selectClasses}
        ref={ref}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
  
  // If no label or helper text, return just the select
  if (!label && !helper && !error && !success) {
    return Component;
  }
  
  // Return wrapped component with label and helper text
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      
      {Component}
      
      {/* Helper text */}
      {helper && !error && !success && (
        <p className="form-help">{helper}</p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="form-error" role="alert">
          {typeof error === 'string' ? error : 'Please check this field'}
        </p>
      )}
      
      {/* Success message */}
      {success && (
        <p className="form-success">
          {typeof success === 'string' ? success : 'Looks good!'}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// Export all components
export { Input, Textarea, Select };
export default Input; 