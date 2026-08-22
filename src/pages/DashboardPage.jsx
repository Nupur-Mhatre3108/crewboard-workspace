import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Plus, ArrowUpRight, FolderKanban, Users, Kanban } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { emptyDashboardStats, mockWorkspace, currentUser } from '../data/mockData';

export default function DashboardPage() {
  const context = useOutletContext();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectCategory, setProjectCategory] = useState('Coursework');

  const handleCreateProject = (e) => {
    e.preventDefault();
    // UI placeholder for Experiment 1 (no backend save)
    setIsNewProjectModalOpen(false);
    setProjectName('');
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0E8DC]">
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md bg-[#2D5A45] text-white">
              Workspace Overview
            </span>
            <span className="text-xs font-semibold text-[#52665B]">
              {mockWorkspace.name}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E2B24] tracking-tight leading-tight">
            Welcome, {currentUser.name}
          </h1>

          <p className="text-sm sm:text-base text-[#52665B] font-medium max-w-2xl">
            This is your team's central workspace. Create a project to start planning milestones on the Kanban board.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => setIsNewProjectModalOpen(true)}
            className="px-6 py-3.5 text-sm rounded-xl font-bold shadow-sm"
          >
            Create Project
          </Button>
        </div>
      </div>

      {/* 4 Clean Metric Blocks (Empty State 0s) */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {emptyDashboardStats.map((stat) => (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
            />
          ))}
        </div>
      </section>

      {/* Empty State Featured Container */}
      <section className="bg-[#F3F7F0] rounded-3xl p-8 sm:p-12 border border-[#E0E8DC] text-center flex flex-col items-center justify-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-[#DCE8D7] text-[#2D5A45] flex items-center justify-center">
          <FolderKanban className="w-7 h-7" />
        </div>

        <div className="max-w-md">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2B24] tracking-tight">
            No active projects yet
          </h3>
          <p className="text-xs sm:text-sm text-[#52665B] mt-2 font-medium leading-relaxed">
            Get started by creating your first project workspace or opening the Kanban board to add task notes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsNewProjectModalOpen(true)}
            className="font-bold px-5"
          >
            Create Project
          </Button>

          <Link to="/board">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Kanban className="w-4 h-4 text-[#2D5A45]" />}
              className="font-bold px-5"
            >
              Open Kanban Board
            </Button>
          </Link>
        </div>
      </section>

      {/* Getting Started Guide Cards (Clean 3 blocks) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-[#F3F7F0] p-6 rounded-3xl border border-[#E0E8DC] flex flex-col justify-between min-h-[160px]">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
            Step 01
          </span>
          <div>
            <h4 className="font-serif text-xl font-bold text-[#1E2B24]">
              Create a Project
            </h4>
            <p className="text-xs text-[#52665B] mt-1.5 font-medium leading-relaxed">
              Define your team's objective, course milestone, or hackathon scope.
            </p>
          </div>
        </div>

        <div className="bg-[#F3F7F0] p-6 rounded-3xl border border-[#E0E8DC] flex flex-col justify-between min-h-[160px]">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
            Step 02
          </span>
          <div>
            <h4 className="font-serif text-xl font-bold text-[#1E2B24]">
              Pin Sticky Notes
            </h4>
            <p className="text-xs text-[#52665B] mt-1.5 font-medium leading-relaxed">
              Use Sage, Butter, Peach, Lavender, and Powder Blue notes on the Kanban board.
            </p>
          </div>
        </div>

        <div className="bg-[#F3F7F0] p-6 rounded-3xl border border-[#E0E8DC] flex flex-col justify-between min-h-[160px]">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
            Step 03
          </span>
          <div>
            <h4 className="font-serif text-xl font-bold text-[#1E2B24]">
              Coordinate Crew
            </h4>
            <p className="text-xs text-[#52665B] mt-1.5 font-medium leading-relaxed">
              Assign notes to teammates (N, A, K, G) and track progress together.
            </p>
          </div>
        </div>
      </section>

      {/* Create Project Modal (UI Placeholder) */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Project"
        description="Set up a workspace project for your crew."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsNewProjectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
          <Input
            label="Project Title"
            required
            placeholder="e.g. Full Stack MERN Development"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Category</label>
            <select
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              className="w-full bg-[#FFFDF8] text-sm text-[#1E2B24] rounded-[14px] border border-[#1E2B24]/20 p-2.5 outline-none focus:border-[#2D5A45]"
            >
              <option value="Coursework">Semester Coursework</option>
              <option value="Hackathon">Hackathon Sprint</option>
              <option value="Research">Research & Lab</option>
              <option value="Personal">Team Project</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
