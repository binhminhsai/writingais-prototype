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
  - Changed button text from "Xem từ vựng" to "Danh sách từ vựng"
  - Implemented proper button navigation to vocabulary list screen
  - Created comprehensive vocabulary cards with authentic content from user files
  - Fixed API query endpoints for vocabulary word fetching
  - Updated all vocabulary card names and descriptions to Vietnamese
  - Implemented accurate word count calculation based on real vocabulary data
  - Fixed card title display to show exact names from database
  - Optimized header layout to reduce space usage by 40%
  - Implemented compact search bar and star favorite functionality
  - Integrated vocabulary count into header for better space utilization
  - Repositioned star favorite button to header top-right position with sync functionality
  - Moved vocabulary count to align with search bar for optimal layout balance
  - Standardized search bar width across all pages for consistent UI experience
- June 18, 2025. Redesigned vocabulary detail page with authentic content:
  - Implemented header design matching word list page with gradient background
  - Created comprehensive "Resilience" vocabulary detail with authentic content
  - Added structured sections: definition (bilingual), etymology, common phrases, examples
  - Designed colorful category badges for visual navigation tabs
  - Fixed data loading logic to properly display content instead of error message
  - Applied consistent gradient styling and modern card design throughout
  - Integrated navigation arrows and word counter (2/12) matching wireframe
- June 18, 2025. Enhanced vocabulary detail page with dynamic content and navigation:
  - Implemented 4-tab system: Images, Definitions, Etymology, Common Phrases
  - Added custom arrow navigation icons positioned outside content area
  - Created dynamic header that displays current card information (title, description, category)
  - Integrated favorite toggle functionality with proper API synchronization
  - Added dynamic word counter showing current position (e.g., 3/12)
  - Updated footer statistics to display actual card data (word count, study count)
  - Positioned sticky edit button in bottom-right corner for content modification
- June 18, 2025. Implemented in-page view toggle for vocabulary words:
  - Added toggle functionality between list view (table) and detail view (tabs) within same page
  - Maintained header and footer sections while transforming main content area
  - Integrated arrow navigation and word counter for seamless browsing
  - Updated "Xem chi tiết" button to switch views instead of navigating to separate page
  - Added "Quay lại danh sách" button to return from detail to list view
  - Preserved all existing styling and functionality while adding new view mode
- June 18, 2025. Optimized spacing and layout for compact UI design:
  - Reduced main container padding from p-8 to p-3/p-4 across detail views
  - Minimized spacing between elements (mb-6 to mb-2/mb-3)
  - Shrunk font sizes for titles, headings, and content for more compact display
  - Reduced tab button padding and added text-sm for tighter navigation
  - Decreased min-height from 400px to 250px-300px for content areas
  - Positioned Plus button inline with tab navigation for optimal space usage
  - Applied consistent compact styling across both wordcraft-words and wordcraft-card-details pages
  - Added comprehensive responsive design for mobile and desktop breakpoints
  - Implemented sticky edit button (icon only) positioned with word counter at bottom
  - Created authentic Resilience vocabulary content with etymology and phrase examples
  - Removed all padding from card details container for maximum space efficiency
- June 18, 2025. Streamlined navigation and removed redundant routes:
  - Changed card click behavior to navigate to /wordcraft/1/words?view=detail instead of separate details page
  - Removed /wordcraft/1/details route and associated component import from App.tsx
  - Added URL parameter handling to automatically show detail view when accessed from card
  - Integrated authentic Resilience content (etymology and phrases) into main word detail view
  - Maintained dual-mode functionality within single page component for better user experience
  - Hidden search bar in detail view mode for cleaner interface
  - Removed all borders from content cards for minimalist design
  - Optimized footer button sizes and updated text to "Học từ vựng" and "Số lần đã học: 7 lần"
- June 18, 2025. Expanded vocabulary database with complete 20-word business set:
  - Added all 20 vocabulary words from user's provided list to card ID 1
  - Implemented complete bilingual definitions (English/Vietnamese) for each word
  - Added proper pronunciation data, part-of-speech tags, and example sentences
  - Updated card word count from 12 to 20 to reflect actual content
  - Integrated dynamic pronunciation display in detail view using real data
  - Created comprehensive vocabulary tags for better categorization
  - Maintained consistent data structure across all vocabulary entries
- June 22, 2025. Redesigned vocabulary list with card-based accordion interface:
  - Replaced table layout with individual accordion cards for each vocabulary word
  - Implemented collapsible cards showing word info in header and detailed content when expanded
  - Added proper pronunciation buttons, star favorites, and part-of-speech badges in card headers
  - Structured expanded content with separate sections for English definition, Vietnamese definition, and examples
  - Enhanced UX with hover effects, smooth transitions, and multiple expandable cards simultaneously
  - Maintained responsive design and consistent styling across mobile and desktop breakpoints
  - Enhanced card info section with vocabulary count (bottom-left) and study frequency statistics (bottom-right)
  - Fixed validation warnings by replacing nested button elements with interactive spans
  - Added statistics row with border separator and icon indicators for better visual hierarchy
  - Redesigned search bar layout with integrated search button and moved action buttons to the right
  - Streamlined footer to show only study statistics and back button for detail view
  - Improved button positioning and sizing for better user experience
  - Added action buttons ("Thêm từ vựng", "Xem danh sách từ") to detail view above content area
  - Maintained consistent button styling between list and detail views without search bar in detail mode
  - Removed footer card section from both list and detail views for cleaner interface
- June 24, 2025. Added "Thêm từ vựng" button to main wordcraft page:
  - Positioned "Thêm từ vựng" button next to "Thêm chủ đề" button in top action bar
  - Created comprehensive vocabulary addition dialog with card selection dropdown
  - Implemented bilingual input fields for English/Vietnamese definitions
  - Added pronunciation, part of speech, and example sentence fields
  - Integrated proper API calls and validation with loading states and toast notifications
  - Updated button styling to use consistent green gradient matching vocabulary section theme
- June 24, 2025. Redesigned vocabulary addition popup with wireframe-based interface:
  - Created accordion-style vocabulary entry cards with expandable content sections
  - Implemented add/remove functionality for multiple vocabulary entries
  - Added dropdown selection with "Bộ thẻ mới" option at top of list
  - Built loading state with spinner and progress percentage display
  - Made popup non-dismissible except via X button (prevents outside click closing)
  - Added word count display and proper validation for required fields
- June 25, 2025. Optimized popup layout and spacing for improved user experience:
  - Expanded popup width from 2xl to 4xl for better horizontal space utilization
  - Centered title and reduced header height by optimizing padding from pb-4 to pb-2
  - Implemented single black X icon positioned absolutely in top-right corner
  - Minimized padding and margins throughout: reduced main padding from p-6 to p-3, spacing from space-y-6 to space-y-2
  - Optimized card heights with smaller inputs (h-8), buttons (h-6), and reduced textarea rows
  - Repositioned word count next to card selection dropdown for better layout flow
  - Moved submit button to bottom-right corner of footer section
  - Enhanced minus button positioning outside card boundaries with circular styling
- June 25, 2025. Restructured popup layout according to detailed specifications:
  - Moved sequence numbers outside cards to the left with proper spacing
  - Repositioned red delete buttons outside cards to the right with red background
  - Replaced accordion icons with custom CSS triangle shapes using clip-path
  - Updated validation: "Từ vựng" remains required, "Nội dung" made optional
  - Restructured footer with three-column layout: card selection (left), word count (center), submit button (right)
  - Implemented proper scroll behavior with fixed header/footer and scrollable content area
- June 25, 2025. Enhanced popup UI design and button alignment:
  - Aligned accordion button with "Từ vựng" label instead of textbox for consistent input widths
  - Applied comprehensive emerald/teal color scheme throughout popup interface
  - Enhanced header with gradient background and emerald-themed styling
  - Updated card backgrounds with subtle emerald-50 to teal-50 gradients
  - Improved footer styling with matching color scheme and enhanced button designs
  - Added shadow effects and smooth transitions for better visual appeal
  - Simplified header to use main website color scheme with single X button
  - Replaced default X icon with custom close icon from user assets
  - Fixed duplicate close buttons by removing default DialogContent close button
  - Fixed Select component display issues: now properly shows selected values including "Bộ thẻ mới" option
  - Added form reset functionality to clear all fields when popup opens
  - Improved spacing and layout for vocabulary entry cards with better padding and margin structure
  - Updated placeholder text for vocabulary input fields with more descriptive examples
  - Added "Thêm nội dung" label next to accordion expansion button for better user guidance
  - Set card content padding to 0 for minimal spacing as requested
  - Combined "Thêm nội dung" text and accordion icon into single clickable button for improved usability
- June 25, 2025. Redesigned vocabulary addition popup in wordcraft-words.tsx to match main page:
  - Replaced traditional form layout with accordion-style vocabulary entry cards
  - Implemented consistent emerald/teal color scheme and design patterns
  - Added sequence numbers, delete buttons, and expandable content sections
  - Integrated loading states with progress indicators and non-dismissible popup behavior
  - Updated API integration to handle multiple vocabulary entries simultaneously
  - Maintained all existing functionality while improving user experience consistency
- June 25, 2025. Enhanced card info bar and improved card selection functionality:
  - Redesigned card info bar with comprehensive information display: card name with star bookmark, description, topic badge, word count, and study count
  - Added blue gradient background with improved visual hierarchy and proper spacing
  - Fixed Dialog accessibility warnings by adding DialogTitle and DialogDescription components
  - Implemented searchable combobox for card selection with Command component
  - Added real-time search functionality to filter vocabulary cards by title
  - Enhanced dropdown to properly display selected values including "Bộ thẻ mới" option
  - Improved user experience with keyboard navigation and clear visual feedback
  - Optimized button and dropdown widths (w-72) with reduced padding for better space utilization
  - Added maximum height (200px) with scrolling for dropdown when many cards exist
  - Updated text truncation limits: 40 characters for button display, 50 for dropdown items
  - Fixed search functionality with proper filtering logic and useMemo optimization
  - Standardized styling across all dropdown items for consistent user experience
- June 25, 2025. Simplified header interface by removing navigation buttons:
  - Removed "Bộ thẻ từ vựng" and "Từ vựng đã lưu" toggle buttons from header
  - Added search button next to search bar for explicit search action
  - Streamlined layout with cleaner, more focused interface design
  - Updated header navigation to properly link Vocabulary button to /wordcraft route
  - Centered "Thêm từ vựng" title text in vocabulary addition popup dialogs
  - Fixed React.Children.only error by properly structuring DialogTrigger components
  - Added proper DialogTitle and DialogDescription components for accessibility compliance
  - Updated "Học" button to navigate to detail view with ?view=detail parameter for direct learning mode access
  - Fixed syntax errors in vocabulary addition popup by repairing malformed JSX structure
  - Cleaned up duplicated code and standardized popup functionality across both main and detail views

## User Preferences

Preferred communication style: Simple, everyday language.