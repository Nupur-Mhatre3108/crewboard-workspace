import React from 'react';

/**
 * Solid Editorial Button Component
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...rest
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#2D5A45] text-white hover:bg-[#234736] shadow-sm',
    secondary: 'bg-[#FFFDF8] text-[#1E2B24] border border-[#1E2B24] hover:bg-[#2D5A45] hover:text-white hover:border-[#2D5A45]',
    outline: 'bg-transparent text-[#1E2B24] border border-[#E0E8DC] hover:bg-[#DCE8D7]/40 hover:border-[#2D5A45]',
    ghost: 'text-[#1E2B24] hover:bg-[#DCE8D7]/50',
    danger: 'bg-[#F4B89B] text-[#1E2B24] hover:bg-[#EAA787]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {leftIcon && <span className="inline-flex items-center shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex items-center shrink-0">{rightIcon}</span>}
    </button>
  );
}
