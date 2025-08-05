# English Writing Practice Platform

## Overview
This platform is a full-stack English writing practice application designed to enhance writing skills through interactive exercises, AI-powered feedback, and vocabulary building. It supports various test formats, including IELTS, TOEFL, and general essay writing. The project's vision is to provide a comprehensive, AI-driven learning environment for English writing, aiming to become a leading tool for language learners globally.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes
**Date: 2025-01-04**
- **Loading System Updates**: Implemented precise countdown timers for essay analysis
  - Updated InteractiveLoadingPage (Submit button) with performance.now() timing and requestAnimationFrame
  - Added ChemicalFlaskLoader with 50-second countdown to Task 1 and Task 2 "Review My Essay" buttons
  - Updated "Reveal Task Analysis and Outline" in Task 2 with 60-second ChemicalFlaskLoader
  - All loading animations now use synchronized timing to prevent drift on slower devices
  - Countdown displays smoothly without flickering using tabular-nums font
  - Content displays exactly after countdown completion with no delays

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript.
- **Routing**: Wouter for lightweight client-side navigation.
- **State Management**: React Query (TanStack Query) for server state and caching.
- **UI/UX**: Shadcn/ui components built on Radix UI, styled with Tailwind CSS for a custom theme. Responsive design with a mobile-first approach.
- **Build**: Vite for development and optimized production builds.

### Backend
- **Server**: Express.js with TypeScript.
- **API**: RESTful endpoints.
- **Database**: PostgreSQL with Drizzle ORM (initially in-memory storage).
- **Session Management**: Express sessions with PostgreSQL session store.
- **Build**: esbuild for server bundling.

### Development Environment
- Full-stack type safety with shared schema definitions.
- ESM modules throughout.

### Key Features
- **Writing Practice System**: Configurable test types, difficulties, and topics; rich text editor with real-time feedback.
- **Essay Grading System**: AI-powered IELTS Writing Task 2 grading, detailed feedback, and history tracking.
- **Vocabulary Building (Wordcraft)**: Curated word lists, bilingual definitions, examples, and study tracking.
- **Progress Tracking**: Interactive band score charts, detailed scoring breakdowns, and basic mistakes analysis.
- **Resource Management**: Categorized topics, vocabulary, phrases, and essay outlines.
- **Feedback Interface**: Multi-color highlighting for errors, vocabulary enhancements, and good examples, with interactive tooltips.
- **Interactive Loading States**: Custom loaders for analysis and content loading.

## External Dependencies

- **Database**: `@neondatabase/serverless` (PostgreSQL), `drizzle-orm`, `drizzle-kit`.
- **Frontend**: `@tanstack/react-query`, `@radix-ui/*`, `react`, `react-dom`, `wouter`.
- **Backend**: `express`.
- **Styling**: `tailwindcss`, `@replit/vite-plugin-shadcn-theme-json`, `class-variance-authority`, `tailwind-merge`.
- **Development Tools**: `vite`, `typescript`, `tsx`.