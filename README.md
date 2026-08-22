# 🌿 CrewBoard — Collaborative Kanban Platform

> **A minimal, physical-inspired Kanban task management workspace for student project teams and semester milestones.**  
> *Vibe:* Pinterest × Notion × Milanote × Apple Notes (tactile, solid colors, editorial typography, calming).

---

## 📌 Experiment 1 Milestone — UI Foundation

This repository represents **Experiment 1 of a 10-experiment MERN progression**. It establishes a solid-color, stationery-inspired design system with Google Fonts typography, empty workspace states, and routing that subsequent experiments will build upon.

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

## 👥 Crew Initials
- **Nupur** (`N` — `#2D5A45`, text `#FFFFFF`) — Lead & Full Stack / Owner
- **Anushka** (`A` — `#F4B89B`, text `#1E2B24`) — Frontend & UI
- **Krishna** (`K` — `#B5D0AF`, text `#1E2B24`) — Backend & Auth
- **Gourish** (`G` — `#C7B8DF`, text `#1E2B24`) — DevOps & Database

---

## 📁 Folder Architecture

```
CrewBoard/
├── src/
│   ├── assets/              # Static assets & graphics
│   ├── components/          # 9 Core Reusable Components
│   │   ├── Button.jsx       # Solid editorial buttons
│   │   ├── Input.jsx        # Floating cream inputs with charcoal border
│   │   ├── Navbar.jsx       # Floating search (⌘K) & user initial
│   │   ├── Sidebar.jsx      # Solid sage sidebar (#DCE8D7) with active pill (#2D5A45)
│   │   ├── StatsCard.jsx    # Compact typography metric blocks
│   │   ├── ProjectCard.jsx  # Reusable project card
│   │   ├── TaskCard.jsx     # Solid pastel sticky note card
│   │   ├── KanbanColumn.jsx # 3-column sage paper container with empty states
│   │   └── Modal.jsx        # Accessible editorial dialog
│   ├── context/             # [Exp 3] React Context Providers
│   ├── data/
│   │   └── mockData.js      # Clean workspace dataset & initials team roster
│   ├── hooks/               # [Exp 2] Custom React Hooks
│   ├── layouts/
│   │   └── AppLayout.jsx    # Shared application layout
│   ├── pages/               # 8 Connected Routes
│   │   ├── LandingPage.jsx  # Editorial 2-column hero with Kanban preview
│   │   ├── LoginPage.jsx    # Stationery sign-in
│   │   ├── RegisterPage.jsx # Student registration
│   │   ├── DashboardPage.jsx# Empty workspace dashboard with "Create Project" CTA
│   │   ├── KanbanBoardPage.jsx # 3 empty Kanban columns with "Add Task" buttons
│   │   ├── ProjectsPage.jsx # Distinct projects overview with templates
│   │   ├── TeamPage.jsx     # Distinct team roster & permissions view
│   │   └── SettingsPage.jsx # Distinct workspace settings & color palette
│   ├── services/            # [Exp 4+] REST API client services
│   ├── utils/               # Frontend utilities
│   ├── App.jsx              # React Router configuration
│   ├── index.css            # Tailwind directives & design tokens
│   └── main.jsx             # DOM root mount
├── backend/                 # [Exp 4–7] Backend structure (config, controllers, models, routes, etc.)
├── docs/                    # [Exp 1–10] Documentation & milestone specs
├── package.json
└── README.md
```

---

## 🚀 Quick Start

```bash
# 1. Install Dependencies
npm install

# 2. Run Development Server
npm run dev

# 3. Build for Production (Verified: 0 errors in 5.78s)
npm run build
```
