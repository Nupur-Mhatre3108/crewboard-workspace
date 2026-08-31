import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import KanbanColumn from '../components/KanbanColumn';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import useKanban from '../hooks/useKanban';
import useModal from '../hooks/useModal';
import { useWorkspace } from '../context/WorkspaceContext';
import { stickyNoteColors, currentUser } from '../utils/constants';

export default function KanbanBoardPage({ taskState, projects = [] }) {
  const { workspaceName } = useWorkspace();
  const outletCtx = useOutletContext();
  const searchQuery = outletCtx?.searchQuery || '';
  const filterItems = outletCtx?.filterItems;
  
  // Use shared task state passed via props from App.jsx
  const { tasks = [], createTask, moveTask, deleteTask } = taskState || {};
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedColumn, setSelectedColumn] = useState('todo');

  const {
    isOpen: isTaskModalOpen,
    openModal: openTaskModal,
    closeModal: closeTaskModal,
  } = useModal(false);

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Normal');
  const [taskColor, setTaskColor] = useState('sage');
  const [taskDueDate, setTaskDueDate] = useState('');

  // 1. Filter tasks based on activeFilter chip
  const chipFilteredTasks = React.useMemo(() => {
    if (activeFilter === 'All') return tasks;
    if (activeFilter === 'Urgent') return tasks.filter((t) => t.priority === 'Urgent');
    if (activeFilter === 'Sage') return tasks.filter((t) => t.colorKey === 'sage');
    if (activeFilter === 'Butter') return tasks.filter((t) => t.colorKey === 'butter');
    if (activeFilter === 'Peach') return tasks.filter((t) => t.colorKey === 'peach');
    if (activeFilter === 'Lavender') return tasks.filter((t) => t.colorKey === 'lavender');
    if (activeFilter === 'My Notes') return tasks.filter((t) => t.assignee?.name === currentUser.name);
    return tasks;
  }, [tasks, activeFilter]);

  // 2. Filter tasks based on global searchQuery (title, priority, assignee, columnId)
  const searchAndChipFilteredTasks = React.useMemo(() => {
    if (!searchQuery.trim()) return chipFilteredTasks;
    if (filterItems) {
      return filterItems(chipFilteredTasks, ['title', 'priority', 'assignee', 'columnId', 'colorKey']);
    }
    const q = searchQuery.trim().toLowerCase();
    return chipFilteredTasks.filter((t) => {
      const titleMatch = t.title?.toLowerCase().includes(q);
      const priorityMatch = t.priority?.toLowerCase().includes(q);
      const colMatch = t.columnId?.toLowerCase().includes(q);
      const assigneeMatch = typeof t.assignee === 'object' ? t.assignee?.name?.toLowerCase().includes(q) : false;
      return titleMatch || priorityMatch || colMatch || assigneeMatch;
    });
  }, [chipFilteredTasks, searchQuery, filterItems]);

  // 3. Group filtered tasks using useKanban (counts automatically reflect filtered tasks!)
  const { todoTasks, inProgressTasks, doneTasks } = useKanban(searchAndChipFilteredTasks);

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
    openTaskModal();
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    if (createTask) {
      createTask({
        title: taskTitle.trim(),
        columnId: selectedColumn,
        priority: taskPriority,
        colorKey: taskColor,
        dueDate: taskDueDate.trim(),
        assignee: currentUser,
        projectId: projects[0]?.id || null,
      });
    }

    setTaskTitle('');
    setTaskDueDate('');
    closeTaskModal();
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
              {workspaceName}
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

      {/* Filter Row */}
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
          <span>
            {searchAndChipFilteredTasks.length} {searchQuery.trim() ? 'Matched' : 'Total'}{' '}
            {searchAndChipFilteredTasks.length === 1 ? 'Note' : 'Notes'}
          </span>
        </div>
      </div>

      {/* 3 Columns (To Do, In Progress, Done) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* TO DO Column */}
        <KanbanColumn
          columnId="todo"
          title="To Do"
          tasks={todoTasks}
          onAddTask={handleOpenAddTask}
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
        />

        {/* IN PROGRESS Column */}
        <KanbanColumn
          columnId="in_progress"
          title="In Progress"
          tasks={inProgressTasks}
          onAddTask={handleOpenAddTask}
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
        />

        {/* DONE Column */}
        <KanbanColumn
          columnId="done"
          title="Done"
          tasks={doneTasks}
          onAddTask={handleOpenAddTask}
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
        />
      </div>

      {/* Task Creation Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        title="Add Task Note"
        description="Pin a sticky note to the board."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={closeTaskModal}
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
            {/* Sticky Note Color */}
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
        </form>
      </Modal>
    </div>
  );
}
