import React from 'react';
import { Trash2 } from 'lucide-react';

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
 * Solid Pastel Sticky Note Task Card with Status Dropdown and Hover Delete Action
 */
export default function TaskCard({ task, onClick, onMoveTask, onDeleteTask }) {
  if (!task) return null;

  const style = STICKY_COLORS[task.colorKey] || STICKY_COLORS.sage;

  return (
    <div
      onClick={() => onClick && onClick(task)}
      className={`
        group relative ${style.bg} rounded-2xl p-4.5 sm:p-5 shadow-sticky cursor-pointer
        flex flex-col justify-between gap-4 select-none min-h-[120px] text-left transition-transform hover:-translate-y-1 font-sans
      `}
    >
      {/* Top: Priority Pill, Status Dropdown, and Hover Delete Action */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${style.pillBg} ${style.pillText}`}>
          {task.priority || 'Normal'}
        </span>

        <div className="flex items-center gap-1.5">
          {/* Status Movement Dropdown */}
          <select
            value={task.columnId || 'todo'}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              if (onMoveTask) onMoveTask(task.id, e.target.value);
            }}
            className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white text-[#1E2B24] border border-black/10 outline-none cursor-pointer hover:bg-white/80 transition-colors shadow-xs"
            title="Move task to another column"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          {/* Delete Icon Button (visible on hover) */}
          {onDeleteTask && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="w-5 h-5 rounded-md bg-white/80 hover:bg-red-500 hover:text-white text-[#1E2B24]/70 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xs"
              title="Delete task"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
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
            title={`${task.assignee.name} (${task.assignee.role || 'Member'})`}
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
