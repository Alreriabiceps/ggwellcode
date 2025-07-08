import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

const Modal = ({ 
  open = false, 
  onClose, 
  children, 
  className,
  size = 'default',
  variant = 'default',
  centered = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  ...props 
}) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);

  // Apple-inspired modal sizes
  const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    default: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full'
  };

  // Apple-inspired modal variants
  const variants = {
    default: 'bg-white border border-gray-200',
    filled: 'bg-gray-50 border border-gray-200',
    glass: 'bg-white/90 backdrop-blur-apple-lg border border-gray-200/50'
  };

  // Focus management
  useEffect(() => {
    if (open) {
      // Store the current focus
      previousFocus.current = document.activeElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (closeOnEscape && event.key === 'Escape' && open) {
        onClose?.();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  // Handle focus trap
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-apple-md transition-opacity duration-300"
        onClick={handleOverlayClick}
      />

      {/* Modal Container */}
      <div
        className={cn(
          'relative min-h-screen flex items-center justify-center p-4',
          !centered && 'items-start pt-16'
        )}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          className={cn(
            'relative w-full transform transition-all duration-300',
            'rounded-apple-xl shadow-apple-xl',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            sizes[size],
            variants[variant],
            className
          )}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-apple z-10"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Modal Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

// Modal Header Component
const ModalHeader = ({ className, children, ...props }) => (
  <div
    className={cn('p-6 border-b border-gray-200', className)}
    {...props}
  >
    {children}
  </div>
);

// Modal Body Component
const ModalBody = ({ className, children, ...props }) => (
  <div
    className={cn('p-6', className)}
    {...props}
  >
    {children}
  </div>
);

// Modal Footer Component
const ModalFooter = ({ className, children, ...props }) => (
  <div
    className={cn('p-6 border-t border-gray-200 bg-gray-50 rounded-b-apple-xl', className)}
    {...props}
  >
    {children}
  </div>
);

// Modal Title Component
const ModalTitle = ({ className, children, ...props }) => (
  <h2
    className={cn('text-title pr-8', className)}
    id="modal-title"
    {...props}
  >
    {children}
  </h2>
);

// Modal Description Component
const ModalDescription = ({ className, children, ...props }) => (
  <p
    className={cn('text-body mt-2', className)}
    {...props}
  >
    {children}
  </p>
);

// Confirmation Modal Component
const ConfirmationModal = ({ 
  open = false,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  className,
  ...props 
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const buttonVariants = {
    default: 'btn-primary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error'
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      className={className}
      {...props}
    >
      <ModalBody className="text-center">
        <div className="stack-apple">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <ModalTitle className="text-center">{title}</ModalTitle>
          
          <ModalDescription className="text-center mt-0">
            {description}
          </ModalDescription>
          
          <div className="flex gap-3 justify-center mt-6">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={cn('btn', buttonVariants[variant])}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

// Alert Modal Component
const AlertModal = ({ 
  open = false,
  onClose,
  title = 'Alert',
  description,
  buttonText = 'OK',
  variant = 'default',
  className,
  ...props 
}) => {
  const iconVariants = {
    default: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )
    },
    warning: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
        />
      )
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )
    }
  };

  const currentVariant = iconVariants[variant];

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      className={className}
      {...props}
    >
      <ModalBody className="text-center">
        <div className="stack-apple">
          <div className={cn(
            'mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4',
            currentVariant.bg
          )}>
            <svg
              className={cn('w-8 h-8', currentVariant.text)}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {currentVariant.icon}
            </svg>
          </div>
          
          <ModalTitle className="text-center">{title}</ModalTitle>
          
          {description && (
            <ModalDescription className="text-center mt-0">
              {description}
            </ModalDescription>
          )}
          
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

// Form Modal Component
const FormModal = ({ 
  open = false,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  submitVariant = 'primary',
  loading = false,
  className,
  ...props 
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  const buttonVariants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error'
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={className}
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        
        <ModalBody>
          {children}
        </ModalBody>
        
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className={cn('btn', buttonVariants[submitVariant])}
              disabled={loading}
            >
              {loading ? 'Loading...' : submitText}
            </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

// Export all components
export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ConfirmationModal,
  AlertModal,
  FormModal
};

export default Modal; 