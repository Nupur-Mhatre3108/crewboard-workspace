import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import KanbanColumn from '../components/KanbanColumn';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { mockMembers, mockWorkspace, stickyNoteColors } from '../data/mockData';

export default function KanbanBoardPage() {
  const context = useOutletContext();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');

  // Task form state (UI only for Experiment 1)
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Normal');
  const [taskColor, setTaskColor] = useState('sage');
  const [taskDueDate, setTaskDueDate] = useState('');

  const filterChips = [
    'All',
    'My Notes',
    'Urgent',
    'Sage',
    'Butter',
    'Peach',
    'Lavender',
  ];

  const handleOpenAddTask = (columnId = 'todo') => {
    setSelectedColumn(columnId);
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    // Experiment 1 UI placeholder: closes modal without persisting
    setIsTaskModalOpen(false);
    setTaskTitle('');
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto font-sans">
      {/* Board Header (Editorial) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0E8DC]">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md bg-[#2D5A45] text-white">
              Kanban Board
            </span>
            <span className="text-xs font-semibold text-[#52665B]">
              {mockWorkspace.name}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2B24] tracking-tight">
            Sprint Task Board
          </h1>
          <p className="text-xs sm:text-sm text-[#52665B] mt-1 font-medium">
            Pin sticky notes across columns to organize team milestones.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Team Initials Stack */}
          <div className="flex items-center -space-x-1.5">
            {mockMembers.map((member) => (
              <div
                key={member.id}
                title={`${member.name} (${member.role})`}
                style={{ backgroundColor: member.color, color: member.textColor }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-[#FFFDF8] select-none shadow-xs"
              >
                {member.initials}
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => handleOpenAddTask('todo')}
            className="px-5 py-2.5 font-bold"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Row (UI Placeholders) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#52665B] mr-2">
            Filter:
          </span>
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`
                  text-xs font-bold px-3.5 py-1.5 rounded-full transition-all
                  ${isActive 
                    ? 'bg-[#2D5A45] text-white shadow-xs' 
                    : 'bg-[#F3F7F0] text-[#1E2B24] hover:bg-[#DCE8D7]'}
                `}
              >
                {chip}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-bold text-[#52665B]">
          <span>3 Columns</span>
          <span className="mx-2">•</span>
          <span>0 Tasks</span>
        </div>
      </div>

      {/* 3 Empty Columns (To Do, In Progress, Done) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* TO DO Column */}
        <KanbanColumn
          columnId="todo"
          title="To Do"
          tasks={[]}
          onAddTask={handleOpenAddTask}
        />

        {/* IN PROGRESS Column */}
        <KanbanColumn
          columnId="in_progress"
          title="In Progress"
          tasks={[]}
          onAddTask={handleOpenAddTask}
        />

        {/* DONE Column */}
        <KanbanColumn
          columnId="done"
          title="Done"
          tasks={[]}
          onAddTask={handleOpenAddTask}
        />
      </div>

      {/* Task Creation Modal (UI Placeholder for Experiment 1) */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Add Task Note"
        description="Pin a sticky note to the board."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCreateTask}
            >
              Add Note
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input
            label="Task Title"
            required
            placeholder="e.g. Design Wireframes"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            {/* Column Selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Column</label>
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full bg-[#FFFDF8] text-sm text-[#1E2B24] rounded-[14px] border border-[#1E2B24]/20 p-2.5 outline-none focus:border-[#2D5A45]"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Priority</label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="w-full bg-[#FFFDF8] text-sm text-[#1E2B24] rounded-[14px] border border-[#1E2B24]/20 p-2.5 outline-none focus:border-[#2D5A45]"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Sticky Note Color (Only the 5 specified colors) */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Sticky Note Color</label>
              <select
                value={taskColor}
                onChange={(e) => setTaskColor(e.target.value)}
                className="w-full bg-[#FFFDF8] text-sm text-[#1E2B24] rounded-[14px] border border-[#1E2B24]/20 p-2.5 outline-none focus:border-[#2D5A45]"
              >
                {stickyNoteColors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <Input
              label="Due Date"
              type="text"
              placeholder="e.g. May 15"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
          </div>

          {/* Assignee Selection */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Assignee</label>
            <div className="flex items-center gap-2 pt-1">
              {mockMembers.map((member) => (
                <button
                  type="button"
                  key={member.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#1E2B24]/15 bg-[#F3F7F0] hover:bg-[#DCE8D7] text-xs font-bold text-[#1E2B24] transition-colors"
                >
                  <div
                    style={{ backgroundColor: member.color, color: member.textColor }}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                  >
                    {member.initials}
                  </div>
                  <span>{member.name}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
