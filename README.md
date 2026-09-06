# 🌿 CrewBoard — Collaborative Kanban Platform

> **A minimal, physical-inspired Kanban task management workspace for student project teams and semester milestones.**  
> *Vibe:* Pinterest × Notion × Milanote × Apple Notes (tactile, solid colors, editorial typography, calming).

---

## 📌 Experiment 3 Milestone — State Management using React Context API

This repository represents **Experiment 3 of a 10-experiment MERN progression**. It establishes centralized global state providers using React Context API (`TaskContext` & `WorkspaceContext`) while preserving the Experiment 1 & 2 UI foundation, custom hooks, and stationery design system.

---

## 🎨 Solid Color System & Typography

### Solid Color Palette
- **Canvas Background**: `#FFFDF8` (warm off-white cream)
- **Sidebar Canvas**: `#DCE8D7` (solid refined sage)
- **Primary Brand & Buttons**: `#2D5A45` (deep forest / eucalyptus)
- **Text Primary**: `#1E2B24` (deep charcoal-green)
- **Card Paper Surface**: `#F3F7F0` (light sage paper)
- **Pastel Sticky Note Colors**:
  - 🌿 **Sage**: `#B5D0AF`
  - 🧈 **Butter Yellow**: `#F7EBAA`
  - 🍑 **Peach**: `#F4B89B`
  - 🪻 **Lavender**: `#C7B8DF`
  - 🌊 **Powder Blue**: `#A2C0D4`

### Typography
- **Headings & Serif Accents**: `Fraunces`
- **Body, UI, Navigation, Buttons**: `Manrope`

---

## 🌐 Context Providers (`src/context/`)

| Context Provider | File | Primary Responsibility |
| :--- | :--- | :--- |
| **`TaskProvider`** | `TaskContext.jsx` | Global task collection, `addTask()`, `removeTask()`, `moveTask()`, `updateTask()`, and reactive metrics (`totalTasks`, `inProgressCount`, `completedCount`). Consumed in Navbar, Dashboard, and Kanban Board. |
| **`WorkspaceProvider`** | `WorkspaceContext.jsx` | Global workspace metadata (`workspaceName`, `workspaceDescription`, `updateWorkspaceName`, `updateWorkspaceDescription`) backed by `useLocalStorage`. Consumed in WorkspaceHeader, Sidebar, Settings, and pages. |

---

## 🛠️ Custom React Hooks (`src/hooks/`)

| Hook | File | Primary Responsibility |
| :--- | :--- | :--- |
| **`useModal`** | `useModal.js` | Modal open/close/toggle lifecycle across Dashboard, Kanban, Projects, and Team dialogs. |
| **`useKanban`** | `useKanban.js` | Groups tasks by column (`todo`, `in_progress`, `done`) and computes column counts. |
| **`useSearch`** | `useSearch.js` | Case-insensitive multi-field search and filter logic. |
| **`useLocalStorage`** | `useLocalStorage.js` | Persists workspace preferences (name & description) across browser reloads. |

---

## 📁 Folder Architecture

```
CrewBoard/
├── src/
│   ├── assets/              # Static assets & graphics
│   ├── components/          # Reusable Editorial Components
│   │   ├── Button.jsx       # Solid editorial buttons
│   │   ├── Input.jsx        # Floating cream inputs with charcoal border
│   │   ├── Navbar.jsx       # Navbar with global Total Tasks badge (TaskContext)
│   │   ├── Sidebar.jsx      # Solid sage sidebar with WorkspaceContext
│   │   ├── StatsCard.jsx    # Compact typography metric blocks
│   │   ├── ProjectCard.jsx  # Reusable project card with hover delete
│   │   ├── TaskCard.jsx     # Solid pastel sticky note card with status dropdown & delete
│   │   ├── KanbanColumn.jsx # 3-column sage paper container with empty states
│   │   ├── Modal.jsx        # Accessible editorial dialog
│   │   ├── WorkspaceClock.jsx # Standalone useEffect clock demonstration with interval cleanup
│   │   └── WorkspaceHeader.jsx # Standalone zero-props useContext consumer component
│   ├── context/             # [Exp 3] React Context Providers
│   │   ├── TaskContext.jsx  # Global Task state provider & useTaskContext hook
│   │   └── WorkspaceContext.jsx # Global Workspace metadata provider & useWorkspace hook
│   ├── hooks/               # [Exp 2] Custom React Hooks
│   │   ├── useModal.js
│   │   ├── useKanban.js
│   │   ├── useSearch.js
│   │   └── useLocalStorage.js
│   ├── layouts/
│   │   └── AppLayout.jsx    # Shared application layout with global search
│   ├── pages/               # 8 Connected Routes
│   │   ├── LandingPage.jsx  # Editorial 2-column hero with Kanban preview
│   │   ├── LoginPage.jsx    # Stationery sign-in
│   │   ├── RegisterPage.jsx # Student registration
│   │   ├── DashboardPage.jsx# Dynamic workspace dashboard with TaskContext & WorkspaceHeader
│   │   ├── KanbanBoardPage.jsx # Interactive 3-column sticky-note Kanban board with TaskContext
│   │   ├── ProjectsPage.jsx # Projects overview & project creation/deletion
│   │   ├── TeamPage.jsx     # Team roster & member invitation
│   │   └── SettingsPage.jsx # Persistent workspace settings
│   ├── services/            # [Exp 4+] REST API client services
│   ├── utils/               # Frontend utilities & constants
│   ├── App.jsx              # React Router configuration
│   ├── index.css            # Tailwind directives & design tokens
│   └── main.jsx             # DOM root mount with WorkspaceProvider & TaskProvider
├── backend/                 # [Exp 4–7] Backend structure (config, controllers, models, routes, etc.)
├── docs/                    # [Exp 1–10] Documentation & milestone specs
│   ├── exp1/
│   ├── exp2/
│   ├── exp3/
│   └── ...
├── package.json
└── README.md
```

---

## 📊 MERN 10-Experiment Progression Tracker

| Experiment | Title | Status | Focus |
| :--- | :--- | :---: | :--- |
| **Exp 1** | **UI Foundation & Architecture** | 🟢 **Completed** | React 18, Tailwind CSS, 9 Core Components, 8 Routes |
| **Exp 2** | **Custom React Hooks** | 🟢 **Completed** | `useModal`, `useKanban`, `useSearch`, `useLocalStorage`, `useEffect` clock |
| **Exp 3** | **Global State with Context API** | 🟢 **Completed** | `TaskContext` (`addTask`, `removeTask`, `moveTask`), `WorkspaceContext` |
| **Exp 4** | **Node.js & Express REST APIs** | ⚪ *Planned* | Express server, CORS, route handlers, error middleware |
| **Exp 5** | **MongoDB & Mongoose Persistence** | ⚪ *Planned* | Database models, schemas, and full CRUD persistence |
| **Exp 6** | **JWT Authentication & Security** | ⚪ *Planned* | Password hashing with `bcrypt`, JWT cookies/tokens, protected routes |
| **Exp 7** | **Real-Time Collaboration** | ⚪ *Planned* | WebSockets with Socket.IO for live crew updates |
| **Exp 8** | **Drag & Drop Board Interactions** | ⚪ *Planned* | Fluid drag gestures, column reordering, optimistic updates |
| **Exp 9** | **Docker Containerization** | ⚪ *Planned* | Frontend & Backend `Dockerfile`, `docker-compose.yml` |
| **Exp 10** | **CI/CD Pipelines & Cloud Deployment** | ⚪ *Planned* | GitHub Actions workflow, automated tests, cloud hosting |

---

## 🚀 Quick Start

```bash
# 1. Install Dependencies
npm install

# 2. Run Development Server
npm run dev

# 3. Build for Production (Verified: 0 errors)
npm run build
```
