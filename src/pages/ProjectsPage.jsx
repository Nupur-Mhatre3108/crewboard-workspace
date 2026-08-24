import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, FolderKanban } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import ProjectCard from '../components/ProjectCard';
import useModal from '../hooks/useModal';
import useLocalStorage from '../hooks/useLocalStorage';

export default function ProjectsPage({ projects = [], createProject, deleteProject }) {
  const [workspaceName] = useLocalStorage('crewboard_workspace_name', 'CrewBoard Workspace');
  const outletCtx = useOutletContext();
  const searchQuery = outletCtx?.searchQuery || '';
  const filterItems = outletCtx?.filterItems;

  const [activeTab, setActiveTab] = useState('all');

  // Create Project Modal
  const {
    isOpen: isModalOpen,
    openModal,
    closeModal,
  } = useModal(false);

  // Delete Project Confirmation Modal
  const {
    isOpen: isDeleteModalOpen,
    modalData: projectToDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal(false);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('Coursework');

  // Filter projects by search query
  const searchedProjects = React.useMemo(() => {
    if (!searchQuery.trim()) return projects;
    if (filterItems) {
      return filterItems(projects, ['title', 'name', 'description', 'category']);
    }
    const q = searchQuery.trim().toLowerCase();
    return projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [projects, searchQuery, filterItems]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!projectTitle.trim()) return;

    if (createProject) {
      createProject({
        title: projectTitle.trim(),
        description: projectDescription.trim() || 'Workspace project for team milestones.',
        category: projectType,
      });
    }

    setProjectTitle('');
    setProjectDescription('');
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete && deleteProject) {
      deleteProject(projectToDelete.id);
    }
    closeDeleteModal();
  };

  const displayedProjects = searchedProjects.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  const isSearchActive = Boolean(searchQuery.trim());

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0E8DC]">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md bg-[#2D5A45] text-white">
              Projects
            </span>
            <span className="text-xs font-semibold text-[#52665B]">
              {workspaceName}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2B24] tracking-tight">
            Team Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#52665B] mt-1 font-medium">
            Manage your crew's active project workspaces and milestones.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={openModal}
          className="font-bold px-5 py-2.5 shrink-0"
        >
          New Project
        </Button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['all', 'active', 'archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                text-xs font-bold px-4 py-2 rounded-full capitalize transition-all
                ${activeTab === tab
                  ? 'bg-[#2D5A45] text-white shadow-xs'
                  : 'bg-[#F3F7F0] text-[#1E2B24] hover:bg-[#DCE8D7]'}
              `}
            >
              {tab === 'all' ? `All Projects (${displayedProjects.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List or Empty State */}
      {displayedProjects.length > 0 ? (
        <div className="flex flex-col gap-4">
          {displayedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#F3F7F0] rounded-3xl p-10 sm:p-14 border border-[#E0E8DC] text-center flex flex-col items-center justify-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#DCE8D7] text-[#2D5A45] flex items-center justify-center">
            <FolderKanban className="w-7 h-7" />
          </div>

          <div className="max-w-md">
            <h3 className="font-serif text-2xl font-bold text-[#1E2B24] tracking-tight">
              {isSearchActive ? `No projects matching "${searchQuery}"` : 'No active projects yet'}
            </h3>
            <p className="text-xs sm:text-sm text-[#52665B] mt-1.5 font-medium leading-relaxed">
              {isSearchActive 
                ? 'Check your search query or clear the search to view all projects.'
                : 'Create your first project to start organizing team milestones and assigning tasks.'}
            </p>
          </div>

          {!isSearchActive && (
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={openModal}
              className="font-bold px-6 py-2.5"
            >
              Create Project
            </Button>
          )}
        </div>
      )}

      {/* Project Templates Quick Preview (Hidden when search query is active) */}
      {!isSearchActive && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#E0E8DC] flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5A45] bg-[#DCE8D7] px-2 py-0.5 rounded w-fit">
              Template
            </span>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#1E2B24]">
                Semester Capstone
              </h4>
              <p className="text-xs text-[#52665B] mt-1 font-medium">
                10-week sprint with milestone tracking.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#E0E8DC] flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5A45] bg-[#DCE8D7] px-2 py-0.5 rounded w-fit">
              Template
            </span>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#1E2B24]">
                Hackathon Sprint
              </h4>
              <p className="text-xs text-[#52665B] mt-1 font-medium">
                Fast-paced 48-hour build roadmap.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#E0E8DC] flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5A45] bg-[#DCE8D7] px-2 py-0.5 rounded w-fit">
              Template
            </span>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#1E2B24]">
                Research & Lab
              </h4>
              <p className="text-xs text-[#52665B] mt-1 font-medium">
                Literature review, dataset, and code pipeline.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Project"
        description="Set up a project in your workspace."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCreate}
            >
              Create Project
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label="Project Name"
            required
            placeholder="e.g. Senior Design Capstone"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />

          <Input
            label="Description"
            placeholder="Brief overview of project goals..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E2B24]">Category</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full bg-[#FFFDF8] text-sm text-[#1E2B24] rounded-[14px] border border-[#1E2B24]/20 p-2.5 outline-none focus:border-[#2D5A45]"
            >
              <option value="Coursework">Semester Coursework</option>
              <option value="Hackathon">Hackathon Sprint</option>
              <option value="Research">Research & Lab</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Delete Project Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Project"
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleDeleteConfirm}
            >
              Delete Project
            </Button>
          </>
        }
      >
        <p className="text-sm text-[#52665B] font-medium leading-relaxed">
          Are you sure you want to delete this project? This will also remove all tasks associated with it.
        </p>
      </Modal>
    </div>
  );
}
