# English Writing Practice Platform

## Overview

This is a full-stack English writing practice application built with React, Express.js, and TypeScript. The platform helps users improve their writing skills through practice exercises, AI-powered feedback, and vocabulary building. It supports multiple test formats including IELTS, TOEFL, and general essay writing.

## System Architecture

### Frontend Architecture
- **React SPA**: Single-page application using React 18 with TypeScript
- **Routing**: Client-side routing with Wouter for lightweight navigation
- **State Management**: React Query (TanStack Query) for server state and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful endpoints with `/api` prefix
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage initially)
- **Session Management**: Express sessions with PostgreSQL session store
- **Build Tool**: esbuild for server bundling

### Development Environment
- **Hot Reload**: Vite middleware integrated with Express for seamless development
- **TypeScript**: Full-stack type safety with shared schema definitions
- **Module System**: ESM modules throughout the application

## Key Components

### Frontend Components
1. **Core Pages**:
   - Home: Landing page with feature overview
   - Writing Practice: Main writing interface with timer and word counter
   - Blog: Content section with writing tips and guides
   - Login: User authentication interface

2. **Writing Practice System**:
   - Test Setup: Configure test type, difficulty, and topic
   - Writing Interface: Rich text editor with supporting resources
   - Feedback Interface: AI-powered analysis and scoring

3. **UI Components**:
   - Comprehensive component library using Shadcn/ui
   - Custom components for writing-specific features (Timer, WordCounter, Editor)
   - Responsive design with mobile-first approach

### Backend Components
1. **Storage Layer**:
   - Abstract storage interface supporting multiple backends
   - In-memory storage for development
   - PostgreSQL support via Drizzle ORM

2. **API Routes**:
   - User management endpoints
   - Writing practice and feedback endpoints
   - Structured route registration system

3. **Middleware**:
   - Request logging with performance metrics
   - Error handling with proper HTTP status codes
   - Session management

## Data Flow

### Writing Practice Flow
1. User selects test type, difficulty, and topic in TestSetup
2. System generates writing prompt and supporting resources
3. WritingInterface provides editor with real-time word counting and timer
4. On submission, essay is processed for feedback
5. FeedbackInterface displays detailed analysis and suggestions

### Resource Management
- **Topics**: Categorized by test type and difficulty level
- **Vocabulary**: Context-aware word suggestions with examples
- **Phrases**: Structured useful expressions by category
- **Outlines**: Template structures for different essay types

### State Management
- Client state managed through React hooks
- Server state cached via React Query
- Real-time features like timer and word count handled locally

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm & drizzle-kit**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **express**: Web server framework
- **react & react-dom**: Frontend framework

### Development Tools
- **vite**: Frontend build tool and dev server
- **typescript**: Static type checking
- **tailwindcss**: Utility-first CSS framework
- **tsx**: TypeScript execution for development

### UI and Styling
- **@replit/vite-plugin-shadcn-theme-json**: Theme configuration
- **class-variance-authority**: Component variant management
- **tailwind-merge**: Tailwind class merging utility

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Database: Drizzle migrations manage schema changes

### Environment Configuration
- **Development**: `npm run dev` starts both frontend and backend with hot reload
- **Production**: `npm run build` followed by `npm start`
- **Database**: Configured via `DATABASE_URL` environment variable

### Replit Integration
- Configured for Replit's deployment system with autoscale target
- Port mapping: internal 5000 → external 80
- Workflow automation for package installation and startup

## Changelog

Changelog:
- June 17, 2025. Initial setup
- June 17, 2025. Implemented Wordcraft vocabulary learning system:
  - Renamed "Vocabulary Builder" to "Wordcraft"
  - Created bilingual vocabulary card and word data models
  - Built three-page navigation flow: card list → word list → word detail
  - Implemented horizontal card layout matching wireframe specifications
  - Added Vietnamese-English vocabulary examples with sample data
  - Created responsive grid layout for vocabulary cards
- June 17, 2025. Fixed vocabulary card creation functionality:
  - Resolved Select component error with empty string values
  - Implemented complete API integration for card creation
  - Added loading states and toast notifications
  - Changed category label from "Phân loại" to "Chủ đề" per user request
  - Implemented multi-topic selection with dropdown checkbox interface
  - Added smart topic display (shows badges or count when multiple selected)
  - Made vocabulary cards fully clickable to navigate to word detail view
  - Added "Tất cả chủ đề" option and improved dropdown behavior

## User Preferences

Preferred communication style: Simple, everyday language.