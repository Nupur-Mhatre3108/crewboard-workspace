import React, { useState, useEffect } from 'react';
import { Clock, Activity } from 'lucide-react';

/**
 * Standalone useEffect Demonstration Component
 * Displays live workspace time, date, and active status with interval cleanup.
 */
export default function WorkspaceClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Start interval on mount
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Return cleanup function to clear interval on unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-[#F3F7F0] rounded-2xl p-4 sm:p-5 border border-[#E0E8DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-left">
      {/* Left: Active Indicator & Date */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#DCE8D7] text-[#2D5A45] flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2D5A45]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
              Workspace Active
            </span>
          </div>
          <p className="text-xs text-[#52665B] font-semibold mt-0.5">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Right: Live Clock Display */}
      <div className="flex items-center gap-2 self-start sm:self-auto bg-[#FFFDF8] px-3.5 py-1.5 rounded-xl border border-[#E0E8DC] shadow-xs">
        <Clock className="w-3.5 h-3.5 text-[#52665B]" />
        <span className="font-mono text-sm font-bold text-[#1E2B24] tracking-tight">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
