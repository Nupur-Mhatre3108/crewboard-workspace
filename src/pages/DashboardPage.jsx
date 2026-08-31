import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Plus, FolderKanban, Kanban } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import WorkspaceHeader from '../components/WorkspaceHeader';
import WorkspaceClock from '../components/WorkspaceClock';
import useModal from '../hooks/useModal';

export default function DashboardPage({ taskState, projects = [], createProject, deleteProject }) {
  const outletCtx = useOutletContext();
  const searchQuery = outletCtx?.searchQuery || '';
  const filterItems = outletCtx?.filterItems;

  // Read dynamic task stats from shared taskState
  const totalTasks = taskState?.totalTasks ?? 0;
  const inProgressCount = taskState?.inProgressCount ?? 0;
  const completedCount = taskState?.completedCount ?? 0;

  // Create Project Modal
  const {
    isOpen: isNewProjectModalOpen,
    openModal: openNewProjectModal,
    closeModal: closeNewProjectModal,
  } = useModal(false);

  // Delete Project Confirmation Modal
  const {
    isOpen: isDeleteModalOpen,
    modalData: projectToDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal(false);

  const [projectName, setProjectName] = useState('');
  const [projectCategory, setProjectCategory] = useState('Coursework');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    if (createProject) {
      createProject({
        title: projectName.trim(),
        category: projectCategory,
        description: 'Workspace project created for team milestones.',
      });
    }

    setProjectName('');
    closeNewProjectModal();
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete && deleteProject) {
      deleteProject(projectToDelete.id);
    }
    closeDeleteModal();
  };

  // Filter projects by search query
  const filteredProjects = React.useMemo(() => {
    if (!searchQuery.trim()) return projects;
    if (filterItems) {
      return filterItems(projects, ['title', 'description', 'category']);
    }
    const q = searchQuery.trim().toLowerCase();
    return projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [projects, searchQuery, filterItems]);

  const dynamicStats = [
    {
      id: 'stat_1',
      label: 'Projects',
      value: String(projects.length),
      hint: projects.length === 0 ? 'No active projects' : `${projects.length} active`,
    },
    {
      id: 'stat_2',
      label: 'Tasks',
      value: String(totalTasks),
      hint: totalTasks === 0 ? 'No tasks created' : `${totalTasks} total`,
    },
    {
      id: 'stat_3',
      label: 'In Progress',
      value: String(inProgressCount),
      hint: `${inProgressCount} tasks working`,
    },
    {
      id: 'stat_4',
      label: 'Completed',
      value: String(completedCount),
      hint: `${completedCount} tasks shipped`,
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto font-sans">
      {/* 1. Context Consumer Header + Action Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0E8DC]">
        <WorkspaceHeader />

        <div className="shrink-0 flex items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => openNewProjectModal()}
            className="px-6 py-3.5 text-sm rounded-xl font-bold shadow-sm"
          >
            Create Project
          </Button>
        </div>
      </div>

      {/* 2. useEffect Demonstration Clock Component */}
      <section>
        <WorkspaceClock />
      </section>

      {/* 3. 4 Clean Metric Blocks */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dynamicStats.map((stat) => (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
            />
          ))}
        </div>
      </section>

      {/* 4. Active Projects List or Empty State */}
      {filteredProjects.length > 0 ? (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#52665B]">
              Active Projects ({filteredProjects.length})
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-[#F3F7F0] rounded-3xl p-8 sm:p-12 border border-[#E0E8DC] text-center flex flex-col items-center justify-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#DCE8D7] text-[#2D5A45] flex items-center justify-center">
            <FolderKanban className="w-7 h-7" />
          </div>

          <div className="max-w-md">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2B24] tracking-tight">
              {searchQuery.trim() ? 'No matching projects found' : 'No active projects yet'}
            </h3>
            <p className="text-xs sm:text-sm text-[#52665B] mt-2 font-medium leading-relaxed">
              {searchQuery.trim() 
                ? `No projects matching "${searchQuery}". Try a different keyword.` 
                : 'Get started by creating your first project workspace or opening the Kanban board to add task notes.'}
            </p>
          </div>

          {!searchQuery.trim() && (
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => openNewProjectModal()}
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
          )}
        </section>
      )}

      {/* 5. Getting Started Guide Cards */}
      {!searchQuery.trim() && (
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
                Assign notes to teammates and track progress together.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Create Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={closeNewProjectModal}
        title="Create New Project"
        description="Set up a workspace project for your crew."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={closeNewProjectModal}
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
