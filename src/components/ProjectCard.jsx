import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import Button from './Button';

/**
 * Editorial Project Card Component with Hover Delete Action
 */
export default function ProjectCard({ project, onOpenBoard, onDelete }) {
  if (!project) return null;

  const {
    title = 'Untitled Project',
    description = 'No description provided.',
    category = 'General',
    tasksTotal = 0,
    tasksDone = 0,
    members = [],
  } = project;

  return (
    <div className="relative group bg-[#F3F7F0] rounded-3xl p-7 border border-[#E0E8DC] flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans text-left transition-all">
      {/* Delete Project Action Button (Visible on Hover) */}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(project);
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white text-[#52665B] hover:text-[#DC2626] hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xs border border-[#E0E8DC] z-10"
          title="Delete Project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="flex flex-col gap-3 max-w-xl text-left">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#2D5A45] text-white">
            {category}
          </span>
          <span className="text-xs text-[#52665B] font-semibold">
            {tasksDone} of {tasksTotal} tasks completed
          </span>
        </div>

        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E2B24] tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#52665B] mt-1 font-medium">
            {description}
          </p>
        </div>

        {/* Team Initials Stack */}
        {members.length > 0 && (
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center -space-x-1.5">
              {members.map((member) => (
                <div
                  key={member.id}
                  title={`${member.name} (${member.role})`}
                  style={{ backgroundColor: member.color, color: member.textColor }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-[#F3F7F0] select-none"
                >
                  {member.initials}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-[#52665B]">
              {members.length} members
            </span>
          </div>
        )}
      </div>

      <div className="shrink-0 pt-2 md:pt-0">
        <Link to="/board">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
            className="w-full sm:w-auto px-5 py-2.5 font-bold"
          >
            Open Board
          </Button>
        </Link>
      </div>
    </div>
  );
}
