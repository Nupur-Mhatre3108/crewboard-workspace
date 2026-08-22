import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogOut, ChevronDown } from 'lucide-react';
import { currentUser, mockWorkspace } from '../data/mockData';

/**
 * Solid Sage Sidebar Component
 */
export default function Sidebar({ isOpen = true, onClose }) {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Kanban Board', path: '/board' },
    { label: 'Projects', path: '/projects' },
    { label: 'Team', path: '/team' },
    { label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#1E2B24]/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#DCE8D7] border-r border-[#C6D6C0]
        flex flex-col justify-between p-6 transition-transform duration-200 ease-in-out font-sans
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand & Workspace */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 pt-1 group">
            <div className="w-8 h-8 rounded-xl bg-[#2D5A45] text-white flex items-center justify-center text-sm font-extrabold font-serif shadow-sm">
              C
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#1E2B24] block leading-none">
                CrewBoard
              </span>
              <span className="text-[10px] font-bold text-[#52665B] uppercase tracking-wider block mt-1">
                Workspace
              </span>
            </div>
          </Link>

          {/* Workspace Switcher */}
          <div className="bg-[#FFFDF8] rounded-2xl p-3 border border-[#C6D6C0] flex items-center justify-between cursor-pointer hover:border-[#2D5A45] transition-colors">
            <div className="truncate pr-2">
              <p className="text-xs font-bold text-[#1E2B24] truncate">{mockWorkspace.name}</p>
              <p className="text-[10px] text-[#52665B] font-medium mt-0.5">{mockWorkspace.members.length} Members</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#52665B] shrink-0" />
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex flex-col gap-1.5 mt-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#52665B] px-3 mb-1">
              Menu
            </span>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `
                  px-3.5 py-2.5 rounded-full text-xs font-bold transition-all
                  ${isActive 
                    ? 'bg-[#2D5A45] text-white shadow-sm' 
                    : 'text-[#1E2B24] hover:bg-[#FFFDF8]/70'}
                `}
                onClick={() => onClose && onClose()}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom User Section */}
        <div className="pt-4 border-t border-[#C6D6C0] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div 
              style={{ backgroundColor: currentUser.color, color: currentUser.textColor }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs shrink-0 select-none"
            >
              {currentUser.initials}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-[#1E2B24] truncate">{currentUser.name}</p>
              <p className="text-[10px] text-[#52665B] truncate">{currentUser.role}</p>
            </div>
          </div>

          <Link
            to="/login"
            title="Sign Out"
            className="text-[#52665B] hover:text-[#1E2B24] p-2 rounded-lg hover:bg-[#FFFDF8] transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}
