import React from 'react';

/**
 * Editorial Input Component
 */
export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left font-sans">
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]"
        >
          <span>{label} {required && <span className="text-[#F4B89B]">*</span>}</span>
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#52665B] pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full bg-[#FFFDF8] text-[#1E2B24] placeholder:text-[#52665B]/60 text-sm rounded-[14px] border
            ${error ? 'border-[#F4B89B] focus:border-[#F4B89B]' : 'border-[#1E2B24]/20 focus:border-[#2D5A45]'}
            ${leftIcon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            py-2.5 outline-none transition-colors duration-150
            disabled:bg-[#DCE8D7]/30 disabled:text-[#52665B] disabled:cursor-not-allowed
            ${className}
          `}
          {...rest}
        />

        {rightIcon && (
          <div className="absolute right-3.5 text-[#52665B] flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-[#F4B89B] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#52665B]">{helperText}</p>
      ) : null}
    </div>
  );
}
