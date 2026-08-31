import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { currentUser } from '../utils/constants';

/**
 * Standalone useContext Consumer Component
 * Consumes WorkspaceContext directly with zero props.
 */
export default function WorkspaceHeader() {
  const { workspaceName, workspaceDescription } = useWorkspace();

  return (
    <div className="flex flex-col gap-3 text-left font-sans">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md bg-[#2D5A45] text-white">
          Workspace Overview
        </span>
        <span className="text-xs font-semibold text-[#52665B]">
          {workspaceName}
        </span>
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E2B24] tracking-tight leading-tight">
        Welcome, {currentUser.name}
      </h1>

      <p className="text-sm sm:text-base text-[#52665B] font-medium max-w-2xl">
        {workspaceDescription || "This is your team's central workspace. Create a project to start planning milestones on the Kanban board."}
      </p>
    </div>
  );
}
