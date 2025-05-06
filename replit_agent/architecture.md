# Architecture Overview

## Overview

This application is an English Writing Practice platform that helps users improve their writing skills through practice exercises, feedback, and vocabulary building. The system follows a modern web application architecture with a Node.js/Express backend and a React frontend.

The application allows users to:
- Practice writing essays for different test formats (IELTS, TOEFL, etc.)
- Get feedback on their writing
- Build vocabulary
- Track progress over time

## System Architecture

The application uses a full-stack JavaScript architecture with the following components:

### Frontend
- React-based single-page application (SPA)
- Typescript for type safety
- React Query for data fetching and state management
- Shadcn UI components for consistent UI design
- CSS styling through Tailwind CSS

### Backend
- Node.js with Express.js server
- TypeScript for type safety
- RESTful API endpoints prefixed with `/api`
- In-memory storage by default with a potential to use PostgreSQL database

### Data Layer
- PostgreSQL database (configured but possibly not yet implemented)
- Drizzle ORM for database operations
- Schema defined in shared folder for both frontend and backend use

### Build Tools
- Vite for frontend development and bundling
- esbuild for backend bundling
- TypeScript for static type checking

## Key Components

### Frontend Components

1. **Page Components**
   - `Home`: Main landing page
   - `WritingPractice`: Interface for practicing writing
   - `NotFound`: 404 page

2. **UI Component Library**
   - Uses Shadcn UI components (based on Radix UI primitives)
   - Custom components like Editor, Timer, WordCounter

3. **Data Handling**
   - React Query for data fetching
   - Custom hooks for specific functionalities (e.g., `useTimer`, `useWordCounter`)

### Backend Components

1. **Server Setup**
   - Express application with middleware for request logging, JSON parsing, etc.
   - Routes registered in `server/routes.ts`

2. **Data Storage**
   - Abstract storage interface defined in `server/storage.ts`
   - Default implementation using in-memory storage (`MemStorage` class)
   - Schema defined in `shared/schema.ts` (using Drizzle ORM)

3. **Development Tools**
   - Vite middleware for development
   - Error overlay for runtime errors

### Shared Components

1. **Database Schema**
   - User model with id, username, and password fields
   - Schema is defined using Drizzle ORM
   - Zod for schema validation

## Data Flow

1. **Writing Practice Flow**
   - User selects test type, difficulty, and time limit
   - System provides writing prompts and resources (vocabulary, phrases, outlines)
   - User writes essay within time limit
   - System provides feedback on submission

2. **Data Persistence Flow**
   - The server uses the abstract storage interface for data operations
   - Current implementation uses in-memory storage, but can be replaced with PostgreSQL
   - Schema is defined using Drizzle ORM and shared between frontend and backend

3. **API Interaction Flow**
   - Frontend makes API requests to backend endpoints (prefixed with `/api`)
   - React Query handles caching, refetching, and error handling
   - Backend responds with JSON data

## External Dependencies

### Frontend Dependencies
- React and React DOM for UI rendering
- React Query for data fetching and state management
- Wouter for routing
- Radix UI for accessible UI components
- Tailwind CSS for styling
- Lucide React for icons

### Backend Dependencies
- Express for handling HTTP requests
- Drizzle ORM for database operations
- Neon Database SDK for PostgreSQL serverless connection

### Development Dependencies
- TypeScript for static typing
- Vite for frontend development and bundling
- esbuild for backend bundling
- Various Replit-specific plugins for development experience

## Deployment Strategy

The application is configured for deployment on Replit with the following settings:

1. **Development Mode**
   - `npm run dev` command runs the Express server with Vite middleware
   - The server serves both the API endpoints and the frontend

2. **Production Build**
   - Frontend is built using Vite (`vite build`)
   - Backend is bundled using esbuild
   - Output is placed in the `dist` directory

3. **Production Deployment**
   - `npm run start` command runs the bundled server in production mode
   - Static assets are served from the `dist/public` directory
   - Node.js environment variables control configuration

4. **Database Strategy**
   - PostgreSQL database configuration through `DATABASE_URL` environment variable
   - Drizzle migrations can be pushed using `npm run db:push`

## Future Architectural Considerations

1. **Authentication System**
   - Currently, there's a user schema but no implemented authentication system
   - Could be extended to include session management or JWT authentication

2. **Storage Implementations**
   - Abstract storage interface allows for swapping in different storage backends
   - Currently uses in-memory storage, but designed to easily switch to PostgreSQL

3. **Real-time Feedback System**
   - The feedback interface exists but appears to be a placeholder
   - Could be enhanced with AI-based writing analysis or real-time suggestions

4. **Mobile Responsiveness**
   - The application has hooks for mobile detection but could further optimize the mobile experience