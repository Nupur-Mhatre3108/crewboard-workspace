import React from 'react';

const STICKY_COLORS = {
  sage: {
    bg: 'bg-[#B5D0AF]',
    text: 'text-[#1E2B24]',
    pillBg: 'bg-white',
    pillText: 'text-[#1E2B24]',
  },
  butter: {
    bg: 'bg-[#F7EBAA]',
    text: 'text-[#1E2B24]',
    pillBg: 'bg-white',
    pillText: 'text-[#1E2B24]',
  },
  peach: {
    bg: 'bg-[#F4B89B]',
    text: 'text-[#1E2B24]',
    pillBg: 'bg-white',
    pillText: 'text-[#1E2B24]',
  },
  lavender: {
    bg: 'bg-[#C7B8DF]',
    text: 'text-[#1E2B24]',
    pillBg: 'bg-white',
    pillText: 'text-[#1E2B24]',
  },
  powderBlue: {
    bg: 'bg-[#A2C0D4]',
    text: 'text-[#1E2B24]',
    pillBg: 'bg-white',
    pillText: 'text-[#1E2B24]',
  },
};

/**
 * Solid Pastel Sticky Note Task Card
 */
export default function TaskCard({ task, onClick }) {
  if (!task) return null;

  const style = STICKY_COLORS[task.colorKey] || STICKY_COLORS.sage;

  return (
    <div
      onClick={() => onClick && onClick(task)}
      className={`
        ${style.bg} rounded-2xl p-4.5 sm:p-5 shadow-sticky cursor-pointer
        flex flex-col justify-between gap-4 select-none min-h-[120px] text-left transition-transform hover:-translate-y-1 font-sans
      `}
    >
      {/* Top: Priority Pill */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${style.pillBg} ${style.pillText}`}>
          {task.priority || 'Normal'}
        </span>
      </div>

      {/* Task Title */}
      <h4 className={`text-base font-bold tracking-tight leading-snug ${style.text}`}>
        {task.title}
      </h4>

      {/* Bottom: Due Date & Initial Avatar */}
      <div className="pt-2 flex items-center justify-between gap-2 text-xs font-semibold text-[#1E2B24]">
        <span>{task.dueDate || 'No due date'}</span>

        {task.assignee && (
          <div
            title={`${task.assignee.name} (${task.assignee.role})`}
            style={{ 
              backgroundColor: task.assignee.color, 
              color: task.assignee.textColor 
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ring-1 ring-black/10 shrink-0 select-none"
          >
            {task.assignee.initials}
          </div>
        )}
      </div>
    </div>
  );
}
