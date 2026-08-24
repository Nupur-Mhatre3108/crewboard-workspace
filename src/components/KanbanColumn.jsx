import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

/**
 * Solid Paper Kanban Column Component
 */
export default function KanbanColumn({
  columnId,
  title,
  tasks = [],
  onAddTask,
  onTaskClick,
  onMoveTask,
  onDeleteTask,
}) {
  return (
    <div className="flex flex-col flex-1 min-w-[300px] max-w-full bg-[#F3F7F0] rounded-3xl p-5 border border-[#E0E8DC] font-sans">
      {/* Column Header */}
      <div className="flex items-center justify-between px-1 py-1 mb-4">
        <div className="flex items-center gap-2.5">
          <h3 className="font-serif text-lg font-bold text-[#1E2B24] tracking-tight">{title}</h3>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#DCE8D7] text-[#2D5A45]">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddTask && onAddTask(columnId)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52665B] hover:text-[#1E2B24] hover:bg-[#DCE8D7] transition-colors"
          title={`Add task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List / Clean Empty State */}
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={onTaskClick}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}

        {tasks.length === 0 && (
          <div className="border border-dashed border-[#C6D6C0] rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-2">
            <p className="text-xs font-bold text-[#52665B]">No tasks in {title}</p>
            <p className="text-[11px] text-[#52665B]/70 font-medium">Click below to add a note</p>
          </div>
        )}

        {/* Add Task Button */}
        <button
          type="button"
          onClick={() => onAddTask && onAddTask(columnId)}
          className="w-full py-3 rounded-2xl border border-dashed border-[#C6D6C0] hover:border-[#2D5A45] hover:bg-[#DCE8D7]/40 text-xs font-bold text-[#52665B] hover:text-[#2D5A45] flex items-center justify-center gap-2 transition-all mt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
