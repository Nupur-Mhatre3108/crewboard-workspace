import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { mockMembers, stickyNoteColors } from '../data/mockData';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskColumn, setNewTaskColumn] = useState('todo');
  const [newTaskPriority, setNewTaskPriority] = useState('Normal');
  const [newTaskColor, setNewTaskColor] = useState('sage');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    // Experiment 1 UI only (no backend save)
    setIsNewTaskModalOpen(false);
    setNewTaskTitle('');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex selection:bg-[#B5D0AF] selection:text-[#1E2B24] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Navbar 
          onOpenNewTask={() => setIsNewTaskModalOpen(true)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content Outlet */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-6xl w-full mx-auto relative">
          <Outlet context={{ openNewTaskModal: (col) => {
            if (col) setNewTaskColumn(col);
            setIsNewTaskModalOpen(true);
          } }} />
        </main>
      </div>

      {/* Reusable New Task Modal (Experiment 1 UI only) */}
      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        title="Add Task Note"
        description="Pin a sticky note to the project board."
        size="md"
        footer={
          <>
            <Button 
              variant="outline" 
              size="md" 
              onClick={() => setIsNewTaskModalOpen(false)}
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
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            {/* Column Selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Column</label>
              <select
                value={newTaskColumn}
                onChange={(e) => setNewTaskColumn(e.target.value)}
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
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
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
                value={newTaskColor}
                onChange={(e) => setNewTaskColor(e.target.value)}
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
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
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
