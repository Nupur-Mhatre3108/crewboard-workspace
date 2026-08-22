import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Editorial Modal Component
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1E2B24]/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Body */}
      <div 
        className={`
          relative w-full ${sizeClasses[size]} bg-[#FFFDF8] rounded-3xl p-7 sm:p-8
          border border-[#E0E8DC] shadow-modal z-10 overflow-hidden
          transition-all text-left
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E0E8DC]">
          <div>
            {title && (
              <h2 className="font-serif text-xl font-bold text-[#1E2B24] leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-[#52665B] mt-1 font-medium">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#52665B] hover:text-[#1E2B24] hover:bg-[#DCE8D7] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="py-5 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="pt-4 border-t border-[#E0E8DC] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
