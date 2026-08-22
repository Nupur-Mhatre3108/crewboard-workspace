export const mockMembers = [
  {
    id: 'usr_1',
    name: 'Nupur',
    role: 'Lead & Full Stack',
    initials: 'N',
    color: '#2D5A45',
    textColor: '#FFFFFF',
    email: 'nupur@crewboard.dev',
    status: 'Owner',
  },
  {
    id: 'usr_2',
    name: 'Anushka',
    role: 'Frontend & UI',
    initials: 'A',
    color: '#F4B89B',
    textColor: '#1E2B24',
    email: 'anushka@crewboard.dev',
    status: 'Member',
  },
  {
    id: 'usr_3',
    name: 'Krishna',
    role: 'Backend & Auth',
    initials: 'K',
    color: '#B5D0AF',
    textColor: '#1E2B24',
    email: 'krishna@crewboard.dev',
    status: 'Member',
  },
  {
    id: 'usr_4',
    name: 'Gourish',
    role: 'DevOps & Database',
    initials: 'G',
    color: '#C7B8DF',
    textColor: '#1E2B24',
    email: 'gourish@crewboard.dev',
    status: 'Member',
  },
];

export const currentUser = mockMembers[0]; // Nupur

export const mockWorkspace = {
  id: 'ws_1',
  name: 'CrewBoard Workspace',
  description: 'Collaborative Kanban workspace for college project teams.',
  createdDate: 'May 2026',
  members: mockMembers,
};

export const emptyDashboardStats = [
  {
    id: 'stat_1',
    label: 'Projects',
    value: '0',
    hint: 'No active projects',
  },
  {
    id: 'stat_2',
    label: 'Tasks',
    value: '0',
    hint: 'No tasks created',
  },
  {
    id: 'stat_3',
    label: 'In Progress',
    value: '0',
    hint: '0 tasks working',
  },
  {
    id: 'stat_4',
    label: 'Completed',
    value: '0',
    hint: '0 tasks shipped',
  },
];

export const stickyNoteColors = [
  { id: 'sage', name: 'Sage', bg: '#B5D0AF', text: '#1E2B24' },
  { id: 'butter', name: 'Butter Yellow', bg: '#F7EBAA', text: '#1E2B24' },
  { id: 'peach', name: 'Peach', bg: '#F4B89B', text: '#1E2B24' },
  { id: 'lavender', name: 'Lavender', bg: '#C7B8DF', text: '#1E2B24' },
  { id: 'powderBlue', name: 'Powder Blue', bg: '#A2C0D4', text: '#1E2B24' },
];
