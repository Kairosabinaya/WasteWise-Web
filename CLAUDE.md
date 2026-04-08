# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BIMA (Bio-Energy Integrated Management with AI) — a React frontend prototype for a circular economy platform that collects food waste, processes it into biogas/Bio-LPG, and rewards contributors. Evolved from the original WasteWise gamified recycling app. All data is hardcoded dummy data; there is no backend.

## Commands

```bash
npm install     # Install dependencies (run first)
npm start       # Dev server on localhost:3000
npm run build   # Production build to /build
npm test        # Run tests (React Testing Library + Jest)
npm test -- --watchAll=false              # Run tests once (CI mode)
npm test -- --testPathPattern=HomePage    # Run a single test file
```

Built with Create React App (react-scripts 5.0.1). No eject needed. ESLint config is in `package.json` (extends `react-app` and `react-app/jest`).

## Architecture

- **React 19** with hooks, no TypeScript (pure JS)
- **Routing**: React Router DOM 7 — all flat routes defined in `src/App.js`
- **State**: Zustand store in `src/context/RoleContext.js` manages the active role
- **Forms**: React Hook Form for form state
- **Styling**: Tailwind CSS 3 with custom BIMA theme (see `tailwind.config.js` for colors, animations, shadows)
- **Animations**: Framer Motion for micro-interactions
- **Icons**: Lucide React
- **Accessible UI**: Headless UI (`@headlessui/react`) for accessible interactive components
- **Utilities**: `clsx` for conditional class names

### Import Convention

Both `src/components/layout/` and `src/components/ui/` use barrel `index.js` files. Import from the directory, not the individual file:
```js
import { GlassCard, GamifiedButton } from './components/ui';
import { BottomNav, RoleToggle } from './components/layout';
```

### Role-Based System

The app has 4 user roles toggled via `RoleToggle` (no auth):
- **Supplier** (teal `#0D9488`) — food waste providers
- **Customer** (orange `#D97706`) — Bio-LPG buyers
- **Driver** (blue `#2563EB`) — logistics
- **Admin** (purple `#7C3AED`) — platform control

Role selection changes the dashboard, navigation tabs, and available features throughout the app. Pages read the current role via `useRoleStore()` and conditionally render role-specific content.

**BottomNav tabs per role** (non-obvious — defined in `BottomNav.js`, not config):
- Supplier: Home, Scan, Pickup, Rewards, Profile
- Customer: Home, Gas, Rewards, Learn, Profile
- Driver: Home, Tasks, Map, Earnings, Profile
- Admin: Control, Network, Impact, Alerts, Profile

### Page Reuse Across Roles

Several pages serve multiple roles — the same route renders different content based on `useRoleStore().role`. Key shared routes:
- `/` → `HomePage` (all roles get a role-specific dashboard)
- `/marketplace` → used as "Rewards" for both Supplier and Customer
- `/pickup` → used by Supplier ("Pickup") and Driver ("Tasks")
- `/statistics` → used by Driver ("Earnings") and Admin ("Impact")
- `/profile` → shared across all roles

### App Shell

`App.js` wraps everything in a phone mockup container (max 450px, 9:19.5 aspect). Fixed layout: `RoleToggle` (top, 38px) → scrollable page content → `BottomNav` (bottom, 70px fixed). All routes are flat (no nesting). `CurvedHeader` is the role-aware gradient header used at the top of most pages.

### Design System

Glass morphism aesthetic: `backdrop-blur-md`, `bg-white/90`, custom shadows (`shadow-glass`, `shadow-glow-teal`). Font is Inter. Custom Tailwind colors are prefixed `bima-*` (e.g., `bima-primary`, `bima-energy`, `bima-accent`). Role-specific accent colors use inline `style` attributes, not Tailwind classes.

## Key Context

- `Instruction.md` contains the product requirements and feature migration strategy from WasteWise → BIMA
- Mobile-first design — the entire UI renders inside a phone frame
- No `.env` files, no API calls, no authentication — purely a presentation prototype
- This is for a competition (GenBI) — judges use the role toggle to explore different user perspectives
