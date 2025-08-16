# IELTS Writing Practice Platform

## Overview
An advanced English Writing Practice Platform designed to help users improve their IELTS Writing Task 1 skills through interactive exercises and dynamic feedback mechanisms.

## Key Features
- Interactive IELTS Writing Task 1 practice interface
- Multiple question types (Line Graph, Bar Chart, Pie Chart, Process Diagram, Table, Map, Multiple Graphs)
- Band level targeting (5.0 - 8.5)
- Question generation and custom question upload
- Real-time writing practice with timer functionality
- Interactive tutorial system with Replit-style onboarding

## Recent Changes (2025-08-16)
- ✅ Implemented comprehensive tutorial system with step-by-step tooltips
- ✅ Added dark overlay and spotlight effects for guided onboarding
- ✅ Updated all button colors to match website theme (#1fb2aa primary color)
- ✅ Added proper data-testid attributes for all interactive elements
- ✅ Created tutorial hook with localStorage persistence
- ✅ Added Help & Tutorial button for manual tutorial access
- ✅ Implemented Vietnamese language support in UI elements

## Project Architecture

### Frontend Technologies
- React with TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Shadcn/UI component library
- Tailwind CSS for styling
- Framer Motion for animations

### Tutorial System
- **Hook**: `useTutorial` - Manages tutorial state and progression
- **Component**: `TutorialOverlay` - Renders interactive tooltip overlays
- **Features**: 
  - 8-step guided tour covering all major UI elements
  - Dark overlay with spotlight effects
  - Progress indicators and navigation controls
  - localStorage persistence to prevent repetition
  - Manual restart capability via Help button

### Color Scheme
- Primary: #1fb2aa (teal)
- Hover: #0d9488 (darker teal)
- Consistent theme across all interactive elements

### File Structure
```
client/src/
├── hooks/
│   └── use-tutorial.ts          # Tutorial state management
├── components/ui/
│   └── tutorial-overlay.tsx     # Tutorial UI component
├── pages/
│   └── writing-task-1.tsx       # Main practice interface
└── index.css                    # Global styles and animations
```

## User Preferences
- Vietnamese language support for UI elements
- Interactive tutorials similar to Replit's onboarding experience
- Consistent color theming throughout the application
- Step-by-step guidance for new users

## Development Guidelines
- Follow fullstack_js development pattern
- Use Shadcn/UI components with custom styling
- Maintain consistent color scheme (#1fb2aa theme)
- Add data-testid attributes for all interactive elements
- Implement comprehensive user onboarding experiences