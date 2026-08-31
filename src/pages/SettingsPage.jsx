import React, { useState, useEffect } from 'react';
import { Sliders, Palette, Bell, Save } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useWorkspace } from '../context/WorkspaceContext';
import { stickyNoteColors } from '../utils/constants';

export default function SettingsPage() {
  const {
    workspaceName,
    workspaceDescription,
    updateWorkspaceName,
    updateWorkspaceDescription,
  } = useWorkspace();

  const [formName, setFormName] = useState(workspaceName);
  const [formDesc, setFormDesc] = useState(workspaceDescription);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync state if context changes
  useEffect(() => {
    setFormName(workspaceName);
  }, [workspaceName]);

  useEffect(() => {
    setFormDesc(workspaceDescription);
  }, [workspaceDescription]);

  const handleSave = (e) => {
    e.preventDefault();
    updateWorkspaceName(formName);
    updateWorkspaceDescription(formDesc);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto font-sans text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0E8DC]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md bg-[#2D5A45] text-white">
              Preferences
            </span>
            <span className="text-xs font-semibold text-[#52665B]">
              {workspaceName}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2B24] tracking-tight">
            Workspace Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#52665B] mt-1 font-medium">
            Configure workspace details, sticky note palette, and notifications.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
          className="font-bold px-5 py-2.5 shrink-0"
        >
          {savedNotice ? 'Saved ✓' : 'Save Changes'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Workspace Details Section */}
        <section className="bg-[#F3F7F0] rounded-3xl p-7 border border-[#E0E8DC] flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2D5A45]" />
            <h3 className="font-serif text-xl font-bold text-[#1E2B24]">
              General Details
            </h3>
          </div>

          <Input
            label="Workspace Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <Input
            label="Description"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />
        </section>

        {/* Sticky Note Palette Section */}
        <section className="bg-[#F3F7F0] rounded-3xl p-7 border border-[#E0E8DC] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#2D5A45]" />
            <h3 className="font-serif text-xl font-bold text-[#1E2B24]">
              Sticky Note Palette
            </h3>
          </div>
          <p className="text-xs text-[#52665B] font-medium">
            Active pastel colors available for pinning task notes on the Kanban board.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {stickyNoteColors.map((color) => (
              <div
                key={color.id}
                style={{ backgroundColor: color.bg, color: color.text }}
                className="rounded-2xl p-4 flex flex-col justify-between min-h-[90px] shadow-sm select-none border border-black/5"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                  Color
                </span>
                <span className="text-sm font-bold">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-[#F3F7F0] rounded-3xl p-7 border border-[#E0E8DC] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2D5A45]" />
            <h3 className="font-serif text-xl font-bold text-[#1E2B24]">
              Notification Preferences
            </h3>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#E0E8DC] cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#1E2B24] block">Task Assignments</span>
                <span className="text-[11px] text-[#52665B]">Notify me when a sticky note is assigned to me</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-[#2D5A45] accent-[#2D5A45]" />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#E0E8DC] cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#1E2B24] block">Column Moves</span>
                <span className="text-[11px] text-[#52665B]">Notify when tasks move to Done column</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-[#2D5A45] accent-[#2D5A45]" />
            </label>
          </div>
        </section>
      </form>
    </div>
  );
}
