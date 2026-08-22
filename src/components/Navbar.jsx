import React from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import Button from './Button';
import { currentUser } from '../data/mockData';

/**
 * Top Navbar Component
 */
export default function Navbar({ onOpenNewTask, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF8] border-b border-[#E0E8DC] px-6 py-3.5 flex items-center justify-between gap-4 font-sans">
      {/* Left: Mobile Menu & Clean Floating Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-[#1E2B24] hover:bg-[#DCE8D7]/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Floating Search Bar */}
        <div className="relative w-full">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52665B] pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-full bg-[#FFFDF8] text-xs sm:text-sm text-[#1E2B24] placeholder:text-[#52665B]/60 pl-9 pr-12 py-2 rounded-[14px] border border-[#1E2B24]/15 focus:outline-none focus:border-[#2D5A45] transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center text-[#52665B] text-[10px] font-bold">
            <span>⌘K</span>
          </div>
        </div>
      </div>

      {/* Right: Notifications, New Task CTA, User Initial */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell Placeholder */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-[#1E2B24] hover:bg-[#DCE8D7]/40 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={onOpenNewTask}
          className="rounded-xl px-4 py-2"
        >
          <span>New Task</span>
        </Button>

        {/* User Initial Avatar */}
        <div className="flex items-center pl-2 border-l border-[#E0E8DC]">
          <div
            title={currentUser.name}
            style={{ backgroundColor: currentUser.color, color: currentUser.textColor }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs select-none"
          >
            {currentUser.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
