import React from 'react';

/**
 * Editorial Metric Block
 * 
 * @param {Object} props
 * @param {string} props.label - e.g. "Projects"
 * @param {string|number} props.value - e.g. "0"
 * @param {string} [props.hint]
 */
export default function StatsCard({
  label,
  value,
  hint,
  className = '',
}) {
  return (
    <div className={`bg-[#F3F7F0] rounded-2xl p-5 border border-[#E0E8DC] flex flex-col justify-between min-h-[105px] transition-transform hover:-translate-y-0.5 duration-150 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#52665B] uppercase tracking-wider font-sans">
          {label}
        </span>
        {hint && (
          <span className="text-[10px] font-semibold text-[#2D5A45] bg-[#DCE8D7] px-2 py-0.5 rounded-md">
            {hint}
          </span>
        )}
      </div>

      <div className="mt-2">
        <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1E2B24]">
          {value}
        </span>
      </div>
    </div>
  );
}
