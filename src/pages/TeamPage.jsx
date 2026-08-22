import React, { useState } from 'react';
import { Plus, Mail, Shield, UserCheck } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { mockMembers, mockWorkspace } from '../data/mockData';

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');

  const handleInvite = (e) => {
    e.preventDefault();
    // Experiment 1 UI only
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0E8DC]">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md bg-[#2D5A45] text-white">
              Team Roster
            </span>
            <span className="text-xs font-semibold text-[#52665B]">
              {mockMembers.length} Members Connected
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2B24] tracking-tight">
            Crew Members
          </h1>
          <p className="text-xs sm:text-sm text-[#52665B] mt-1 font-medium">
            Manage your project collaborators and role assignments.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsInviteModalOpen(true)}
          className="font-bold px-5 py-2.5 shrink-0"
        >
          Invite Member
        </Button>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#F3F7F0] p-5 rounded-3xl border border-[#E0E8DC] flex items-center justify-between gap-4 text-left transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Initials Circle */}
              <div
                style={{ backgroundColor: member.color, color: member.textColor }}
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold shadow-xs shrink-0 select-none"
              >
                {member.initials}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-bold text-[#1E2B24] truncate">
                    {member.name}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    member.status === 'Owner' ? 'bg-[#2D5A45] text-white' : 'bg-[#DCE8D7] text-[#1E2B24]'
                  }`}>
                    {member.status}
                  </span>
                </div>
                <p className="text-xs text-[#52665B] font-medium mt-0.5">{member.role}</p>
                <p className="text-[11px] text-[#52665B]/70 truncate">{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roles & Permissions Card */}
      <div className="bg-[#F3F7F0] rounded-3xl p-7 border border-[#E0E8DC] text-left">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-[#2D5A45]" />
          <h3 className="font-serif text-xl font-bold text-[#1E2B24]">
            Workspace Roles
          </h3>
        </div>
        <p className="text-xs text-[#52665B] font-medium mb-5">
          Standard permissions for team members in this workspace.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#FFFDF8] p-4 rounded-2xl border border-[#E0E8DC]">
            <span className="text-xs font-bold text-[#1E2B24] block mb-1">Lead / Owner</span>
            <p className="text-xs text-[#52665B]">Can manage workspace settings, invite members, and configure project boards.</p>
          </div>
          <div className="bg-[#FFFDF8] p-4 rounded-2xl border border-[#E0E8DC]">
            <span className="text-xs font-bold text-[#1E2B24] block mb-1">Crew Member</span>
            <p className="text-xs text-[#52665B]">Can create and edit task notes across columns on the Kanban board.</p>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Crew Member"
        description="Send an invitation link to collaborate on this workspace."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleInvite}
            >
              Send Invite
            </Button>
          </>
        }
      >
        <form onSubmit={handleInvite} className="flex flex-col gap-4">
          <Input
            label="Student Email"
            type="email"
            required
            placeholder="teammate@university.edu"
            leftIcon={<Mail className="w-4 h-4" />}
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full bg-[#FFFDF8] text-sm text-[#1E2B24] rounded-[14px] border border-[#1E2B24]/20 p-2.5 outline-none focus:border-[#2D5A45]"
            >
              <option value="Member">Crew Member</option>
              <option value="Lead">Co-Lead</option>
              <option value="Viewer">Observer</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
