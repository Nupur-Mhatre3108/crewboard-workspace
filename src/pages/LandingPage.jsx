import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col justify-between selection:bg-[#B5D0AF] selection:text-[#1E2B24] font-sans">
      {/* 1. Navbar */}
      <header className="max-w-7xl w-full mx-auto px-6 sm:px-10 py-8 flex items-center justify-between border-b border-[#E0E8DC]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2D5A45] text-white flex items-center justify-center text-sm font-extrabold font-serif shadow-sm">
            C
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1E2B24]">
            CrewBoard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="font-bold">
              Sign In
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              Open Workspace
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container: Editorial Two-Column Hero */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24 flex flex-col gap-24">
        {/* Hero Section: Left Typography, Right Sticky Note Preview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F3F7F0] border border-[#E0E8DC] text-[#2D5A45] text-xs font-extrabold uppercase tracking-widest w-fit">
              Experiment 1 • UI Foundation
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#1E2B24] tracking-tight leading-[1.08]">
              A quiet, physical workspace for student crews.
            </h1>

            <p className="text-base sm:text-lg text-[#52665B] font-medium leading-relaxed max-w-xl">
              Structured like Notion, visual like Milanote, and warm like Apple Notes. Built for college project teams to organize milestones with clarity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/dashboard">
                <Button 
                  variant="primary" 
                  size="lg" 
                  rightIcon={<ArrowUpRight className="w-5 h-5" />}
                  className="px-7 py-4 rounded-xl font-bold shadow-sm"
                >
                  Enter Workspace
                </Button>
              </Link>
              <Link to="/board">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="px-7 py-4 rounded-xl font-bold"
                >
                  View Kanban Board
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Note Preview */}
          <div className="lg:col-span-6 bg-[#F3F7F0] rounded-3xl p-6 sm:p-8 border border-[#E0E8DC] shadow-paper">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E0E8DC]">
              <span className="font-serif text-base font-bold text-[#1E2B24]">
                Sprint Task Board
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#2D5A45] text-white">
                Kanban
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Note 1 (Butter) */}
              <div className="bg-[#F7EBAA] rounded-2xl p-4 shadow-sticky flex flex-col justify-between min-h-[130px] text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1E2B24] w-fit">
                  High
                </span>
                <p className="text-sm font-bold text-[#1E2B24] leading-snug">
                  Design Architecture
                </p>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#1E2B24]/80 pt-2 border-t border-black/5">
                  <span>May 02</span>
                  <div className="w-5 h-5 rounded-full bg-[#F4B89B] text-[#1E2B24] text-[9px] font-extrabold flex items-center justify-center">
                    A
                  </div>
                </div>
              </div>

              {/* Note 2 (Peach) */}
              <div className="bg-[#F4B89B] rounded-2xl p-4 shadow-sticky flex flex-col justify-between min-h-[130px] text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1E2B24] w-fit">
                  Urgent
                </span>
                <p className="text-sm font-bold text-[#1E2B24] leading-snug">
                  API Schema Setup
                </p>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#1E2B24]/80 pt-2 border-t border-black/5">
                  <span>May 05</span>
                  <div className="w-5 h-5 rounded-full bg-[#2D5A45] text-white text-[9px] font-extrabold flex items-center justify-center">
                    N
                  </div>
                </div>
              </div>

              {/* Note 3 (Sage) */}
              <div className="bg-[#B5D0AF] rounded-2xl p-4 shadow-sticky flex flex-col justify-between min-h-[130px] text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1E2B24] w-fit">
                  Normal
                </span>
                <p className="text-sm font-bold text-[#1E2B24] leading-snug">
                  Component System
                </p>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#1E2B24]/80 pt-2 border-t border-black/5">
                  <span>May 08</span>
                  <div className="w-5 h-5 rounded-full bg-[#C7B8DF] text-[#1E2B24] text-[9px] font-extrabold flex items-center justify-center">
                    G
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Clean Feature Blocks */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F3F7F0] p-8 rounded-3xl border border-[#E0E8DC] text-left flex flex-col justify-between min-h-[180px]">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
              01 • Visual
            </span>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E2B24] tracking-tight">
                Pastel Sticky Notes
              </h3>
              <p className="text-xs sm:text-sm text-[#52665B] mt-2 font-medium leading-relaxed">
                Color-coded cards in Sage, Butter, Peach, Lavender, and Powder Blue.
              </p>
            </div>
          </div>

          <div className="bg-[#F3F7F0] p-8 rounded-3xl border border-[#E0E8DC] text-left flex flex-col justify-between min-h-[180px]">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
              02 • Focused
            </span>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E2B24] tracking-tight">
                Editorial Workspace
              </h3>
              <p className="text-xs sm:text-sm text-[#52665B] mt-2 font-medium leading-relaxed">
                Clean typography, spacious layouts, and zero distraction for semester projects.
              </p>
            </div>
          </div>

          <div className="bg-[#F3F7F0] p-8 rounded-3xl border border-[#E0E8DC] text-left flex flex-col justify-between min-h-[180px]">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
              03 • Collaborative
            </span>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E2B24] tracking-tight">
                Built for Crews
              </h3>
              <p className="text-xs sm:text-sm text-[#52665B] mt-2 font-medium leading-relaxed">
                Designed for college teams, hackathons, and small squads working towards deadlines.
              </p>
            </div>
          </div>
        </section>

        {/* Minimal CTA Banner */}
        <section className="bg-[#2D5A45] text-white rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Start organizing your project today.
          </h2>
          <p className="text-sm text-[#DCE8D7] font-medium max-w-md">
            Open the workspace to manage your team sprint with clean stationery aesthetics.
          </p>
          <Link to="/dashboard" className="mt-2">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowUpRight className="w-5 h-5" />}
              className="bg-[#FFFDF8] text-[#1E2B24] hover:bg-[#B5D0AF] hover:text-[#1E2B24] border-none font-bold px-8 py-3.5"
            >
              Open Workspace
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-6 sm:px-10 py-8 border-t border-[#E0E8DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#52665B]">
        <p>CrewBoard — Experiment 1 UI Foundation</p>
        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:text-[#1E2B24]">Sign In</Link>
          <Link to="/register" className="hover:text-[#1E2B24]">Register</Link>
          <Link to="/dashboard" className="hover:text-[#1E2B24]">Dashboard</Link>
          <Link to="/board" className="hover:text-[#1E2B24]">Kanban</Link>
          <Link to="/projects" className="hover:text-[#1E2B24]">Projects</Link>
          <Link to="/team" className="hover:text-[#1E2B24]">Team</Link>
        </div>
      </footer>
    </div>
  );
}
