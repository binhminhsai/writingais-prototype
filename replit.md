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
   - Essay Grading: IELTS Writing Task 2 grading system with AI feedback
   - Wordcraft: Vocabulary building with curated word lists
   - Blog: Content section with writing tips and guides
   - Login: User authentication interface

2. **Writing Practice System**:
   - Test Setup: Configure test type, difficulty, and topic
   - Writing Interface: Rich text editor with supporting resources
   - Feedback Interface: AI-powered analysis and scoring

3. **Essay Grading System**:
   - Question Input: IELTS Writing Task 2 prompts
   - Essay Submission: Text input or file upload (Word/PDF)
   - AI Grading: Band scores for all four IELTS criteria
   - Detailed Feedback: Comprehensive analysis and improvement suggestions
   - History Tracking: Past submissions and scores

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
   - Essay grading endpoints (CRUD operations for essays and scoring)
   - Vocabulary management endpoints
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
- July 28, 2025. Added IELTS Writing Task 2 Essay Grading system as complementary feature:
  - Created new `/essay-grading` route for grading completed essays (separate from practice writing)
  - Implemented form with question input and essay textarea with file upload support (Word/PDF)
  - Built AI-powered scoring system with 4 IELTS criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammar Range & Accuracy
  - Added realistic band score generation (6.0-8.5 range) with detailed Vietnamese feedback
  - Created comprehensive results display with overall band score, individual criteria scores, and improvement suggestions
  - Implemented essay grading history tracking with submission dates and scores
  - Updated navigation to include both "Writing Practice" and "Essay Grading" options
  - Enhanced home page Writing Task 2 card with dual buttons for practice vs grading modes
  - Added complete backend API routes for essay CRUD operations and scoring updates
  - Extended database schema with essayGrading table and related types
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
  - Fixed both card selection buttons in vocabulary addition popups (list view and detail view) to show current card name and be disabled when inside a specific card
  - Enhanced card name display with bolder borders (border-2), darker text (text-emerald-900), and improved contrast for better visibility
- June 26, 2025. Updated vocabulary detail tabs and interface improvements:
  - Restructured tabs to: "Hình ảnh", "Định nghĩa", "Cụm từ thường gặp", "Từ đồng nghĩa và trái nghĩa"
  - Added "Hình ảnh" tab with image placeholder grid layout
  - Created "Từ đồng nghĩa và trái nghĩa" tab with synonym/antonym word tags
  - Set "Hình ảnh" as default active tab for better user experience
  - Replaced star icon with rounded "Chi tiết" button in vocabulary list view
  - Added click functionality to navigate directly to word detail view from list
  - Redesigned definition tab with numbered format: "Định nghĩa 1", "Định nghĩa 2", etc.
  - Added multiple numbered examples with Vietnamese translations in italics
  - Implemented proper indentation and structured layout for definitions and examples
  - Updated accordion content in list view to match definition tab format with one example per definition
  - Redesigned phrases tab with individual card frames for each phrase and example sentences
  - Added contextual example sentences with Vietnamese translations in italics for common phrases
  - Fixed content area height to 400px with vertical scrolling for overflow content
  - Redesigned images tab with placeholder state and maximum 2 images limit
  - Added "Thêm hình ảnh" and "Thay đổi hình ảnh" functionality with proper state management
  - Optimized image frame sizes to be more compact (150px max width) for better interface fit
- June 26, 2025. Enhanced images tab with improved layout and edit functionality:
  - Changed image frames to 4:3 aspect ratio (160px width) for balanced appearance
  - Moved "Thêm hình ảnh" button to header level, aligned with title
  - Implemented edit mode toggle via "Chỉnh sửa" button (changes to "Hoàn thành")
  - Added edit mode controls: replace and delete buttons appear only when editing
  - Removed standalone change/delete buttons from normal view mode
  - Implemented comprehensive edit functionality across all tabs:
    - "Chỉnh sửa" button toggles edit mode for current tab content
    - Definition tab: Edit definitions, Vietnamese translations, examples with add/remove
    - Phrases tab: Edit phrase pairs, translations, and example sentences
    - Synonyms/Antonyms tab: Edit word lists with add/remove functionality
    - Images tab: Edit/replace/delete images when in edit mode
- July 9, 2025. Improved writing practice resource display with on-demand loading:
  - Removed default vocabulary and collocations display from initial page load
  - Added "See Vocabulary" and "See collocations" buttons with appropriate icons
  - Implemented clean initial state with encouraging messages for both tabs
  - Maintained existing "Load More Words" and "Load More Phrases" functionality
  - Enhanced user experience with cleaner, less overwhelming interface design
  - Resources now display only when explicitly requested by user interaction
- July 10, 2025. Redesigned Useful Expressions section with structured analysis framework:
  - Replaced generic phrase categories with 5 specific analysis accordions
  - Created comprehensive essay analysis framework: Highlight Keywords, Essay Type, Main Topic Aspects, Tasks To Do, and Suggested Viewpoint
  - Added colorful categorized content sections with distinct color schemes for each type of information
  - Implemented structured content for Problem-Solution essay type with Band 6.5 scoring criteria
  - Enhanced visual hierarchy with colored backgrounds and clear section divisions
  - Maintained existing accordion styling and interaction patterns while improving content organization
- July 11, 2025. Created Progress Tracking page with comprehensive learning analytics:
  - Replaced "Coming Soon" button with "My Progress →" navigation in home page
  - Built complete Progress Tracking page based on provided UI mockups
  - Implemented interactive band score chart with SVG visualization showing progress over time
  - Added detailed scoring breakdown for all IELTS Writing criteria (Task Response, Lexical Resource, Coherence & Cohesion, Grammatical Range)
  - Created comprehensive essay tracking table with sorting/filtering by score, date, essay type, and marking status
  - Integrated Basic Mistakes section with expandable detailed feedback on common writing issues
  - Added streak tracking, goal setting, and study statistics dashboard
  - Implemented responsive design with proper grid layout and mobile optimization
  - Updated layout to horizontal alignment: Band Tracker, Overall Band Score, Action Buttons, and Current Streak arranged in single row
  - Made all components equal width and height with consistent spacing and professional styling
  - Positioned Progress Report and Basic Mistakes buttons vertically stacked with equal sizing
  - Ensured responsive behavior across different screen sizes while maintaining clean alignment
- July 12, 2025. Optimized Progress Tracking page layout with refined proportions and improved readability:
  - Adjusted horizontal layout to 3-component structure: Band Tracker (1.5x wider), Overall Band Score (compact), Action Buttons (vertically stacked)
  - Reduced height of both Band Tracker and Overall Band Score sections by 20% for more compact display
  - Repositioned Band Tracker title to center-align with dropdown selector in single row layout
  - Enhanced Overall Band Score section with doubled font size for criteria labels and 75% height progress bars
  - Restructured progress bars to display below their corresponding labels instead of side-by-side
  - Updated button heights to match reduced section heights while maintaining proper visual balance
  - Moved Current Streak and Goals to separate two-column section for better space utilization
- July 14, 2025. Enhanced Suggested Outline section with new Overall Outline accordion:
  - Added new "Overall Outline – Tổng quan cấu trúc bài viết" accordion as first item in outline section
  - Restructured accordion numbering: 1. Overall Outline, 2. Introduction, 3. Body 1, 4. Body 2, 5. Conclusion
  - Created comprehensive Vietnamese-English structured breakdown with color-coded sections
  - Included detailed guidance for Introduction (2 sentences), Body Paragraphs (viewpoints), and Conclusion structure
  - Added connecting word suggestions and specific writing tips for each section
  - Maintained existing sample content while integrating new overall structure guidance
- July 14, 2025. Updated Introduction and Body Paragraph 1 accordions with detailed writing guidance:
  - Enhanced Introduction accordion with structured 2-sentence approach (paraphrase + thesis statement)
  - Added comprehensive examples about sports professionals' salaries vs. healthcare/education workers
  - Updated Body Paragraph 1 with detailed structure: Topic Sentence + 2 Supporting Ideas
  - Integrated real examples (Lionel Messi, Serena Williams, FIFA World Cup, Olympics)
  - Applied color-coded sections for better visual organization and learning flow
- July 14, 2025. Updated Body Paragraph 2 accordion with contrasting viewpoint structure:
  - Added comprehensive opposing argument about healthcare/education workers vs. athletes
  - Structured content with Topic Sentence + 2 Supporting Ideas using color-coded sections
  - Integrated COVID-19 pandemic examples and medical training requirements
  - Added detailed development explanations about societal value and professional demands
  - Used orange, red, and indigo color schemes for visual distinction from Body Paragraph 1
- July 14, 2025. Updated Conclusion accordion with structured 2-sentence framework:
  - Enhanced conclusion guidance with Vietnamese instructions for summary + recommendation approach
  - Added Câu 1 (blue) for summarizing both body paragraphs without introducing new viewpoints
  - Added Câu 2 (emerald) for final recommendation addressing the essay question directly
  - Integrated comprehensive examples about societal value imbalance and recommendation for fair compensation
  - Completed full essay structure guidance from Introduction through Conclusion with consistent formatting
- July 14, 2025. Updated Highlight Keywords accordion with sports professionals essay analysis:
  - Restructured content to focus on sports professionals vs. healthcare/education workers salary debate
  - Applied consistent color scheme: #f9fafb background, #1fb2aa titles, #374151 content text
  - Added structured sections: Bối cảnh-Lý do, Chủ thể chính, Liệt kê quan điểm, Yêu cầu chính
  - Integrated "To what extent agree/disagree" essay type guidance with Vietnamese explanations
  - Aligned content with updated essay structure for cohesive learning experience
- July 14, 2025. Enhanced Essay Type accordion with Band 7.0+ scoring criteria:
  - Updated essay type identification to "Opinion essay – To what extent agree/disagree"
  - Restructured content to focus on Band 7.0+ requirements instead of Band 6.5
  - Added detailed criteria for all four IELTS assessment areas: Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy
  - Applied consistent color scheme matching other accordions: #f9fafb background, #1fb2aa titles, #374151 content
  - Integrated bilingual guidance with Vietnamese explanations and English terminology for better comprehension
- July 14, 2025. Updated Main Topic Aspects accordion with sports professionals content:
  - Restructured content to focus on the sports professionals vs. healthcare workers salary debate
  - Added Vietnamese main topic overview explaining the essay's focus on income fairness
  - Integrated exact topic sentences for both body paragraphs showing contrasting viewpoints
  - Applied consistent color scheme: #f9fafb background, #1fb2aa titles, #374151 content text
  - Structured content to support the "To what extent agree/disagree" essay framework
- July 14, 2025. Updated Jobs To Be Done accordion with opinion essay task requirements:
  - Changed title from "Tasks To Do" to "Jobs To Be Done" for better clarity
  - Restructured content to focus on opinion essay requirements instead of problem-solution tasks
  - Added Task 1: establishing personal position on agreement/disagreement with clear stance
  - Added Task 2: developing supporting arguments with detailed explanations and specific examples
  - Added Task 3: addressing counter-arguments and maintaining position strength
  - Applied consistent color scheme: #f9fafb background, #1fb2aa titles, #374151 content text
- July 14, 2025. Updated Suggested Viewpoint accordion with balanced essay approach:
  - Restructured content to recommend "Partially agree" stance for balanced argumentation
  - Added comprehensive reasoning about why balanced approach achieves higher band scores
  - Integrated specific examples: athlete advantages (rare talent, global entertainment, short careers, injury risks)
  - Added counter-perspective: essential professions (sacrifice, social importance, extensive training, low income)
  - Applied consistent color scheme: #f9fafb background, #1fb2aa titles, #374151 content text
  - Emphasized critical thinking and multi-perspective development for Band 7.0+ achievement
- July 15, 2025. Enhanced feedback interface with multi-color highlighting and interactive tooltips:
  - Implemented three-color highlighting system: red (#ffcdd2) for errors, yellow (#fef9c3) for vocabulary enhancement, green (#dcfce7) for good examples
  - Added 2 sentences per color type for balanced feedback representation
  - Created interactive tooltips for yellow highlights with vocabulary enhancement suggestions
  - Tooltip format includes: Category, Original text, Improved version, Explanation, and Band Impact
  - Added legend showing color meanings for better user understanding
  - Enhanced user experience with hover interactions and detailed vocabulary improvement guidance
  - Extended tooltip functionality to support green highlights (suggestions) with Category, Original, Suggested, Explanation, and Band Impact structure
  - Implemented red highlight tooltips for grammar errors with Category, Original, Corrected, Explanation, Rule, and Severity structure
  - Fixed HTML nesting validation warnings by replacing h4 and p tags with div elements in tooltip content
  - Added comprehensive tooltip support for all three highlight types with appropriate color coding and field labels
  - Updated red highlight category from "Subject-Verb Agreement" to "Verb Tense OR Sentence Structure" for broader error coverage
  - Applied consistent color scheme across all accordion content blocks: background #f9fafb, titles #1fb2aa, content text #374151
  - Removed "Interactive Essay Analysis" header from feedback interface for cleaner presentation
  - Standardized styling across all content blocks regardless of category (Context, Main Subject, Perspectives, Main Task)
- July 26, 2025. Enhanced tooltip interface styling and question card design:
  - Updated tooltip background to dark navy (#1a1d26) matching design specifications
  - Implemented color-coded tooltip content: red highlights show Category/Original/Corrected/Explanation/Rule/Severity, improvement highlights show Category/Original/Improved/Explanation/Band Impact
  - Enhanced question card with gradient background (cyan to teal), larger text, and improved spacing
  - Applied consistent IELTS styling with rounded corners and professional appearance
- July 27, 2025. Created interactive loading page with canvas drawing functionality:
  - Built comprehensive InteractiveLoadingPage component with full-screen overlay and 8-second loading duration
  - Integrated flask-style loader (same as question generation) with cyan glow, liquid filling animation, and rotating messages
  - Added free-form canvas drawing capability using mouse/touch with smooth strokes in teal color (#1ca19a)
  - Implemented responsive drawing canvas covering full screen with proper touch event handling
  - Added instructional message "While we analyze your writing, feel free to sketch or jot down ideas here"
  - Integrated loading page into both main writing interface and Task 1 writing interface Submit button flows
  - Created smooth fade-out transition after completion to reveal feedback interface
  - Positioned flask loader and messages as non-interactive overlay above drawing canvas
- July 27, 2025. Enhanced Explore Word Bank with animated book loading interface:
  - Created custom BookLoader component with flipping book animation and teal color scheme (#1ca19a)
  - Added CSS keyframe animations for book glow effects and page flipping with 3D perspective transforms
  - Implemented 5-second loading duration for "Explore Word Bank" button across both Task 1 and Task 2 interfaces
  - Integrated BookLoader into vocabulary and phrases tabs with "Flipping through our vocabulary archive..." message
  - Applied consistent loading state management with setTimeout functionality for realistic user experience
  - Enhanced both writing interfaces with smooth loading transitions before revealing word bank content
- July 28, 2025. Integrated Essay Grading with Writing Practice feedback interface:
  - Removed standalone results and history sections from essay grading page
  - Connected essay grading directly to FeedbackInterface component from writing practice
  - Added context prop to FeedbackInterface to handle different navigation flows
  - Updated button text and exit dialog links based on context (essay-grading vs writing-practice)
  - Implemented proper navigation flow: essay grading form → loading state → feedback interface → back to essay grading form
  - Ensured "Try Again" and "Next Practice" buttons return to essay grading form, not writing practice setup
  - Added Vietnamese button labels for essay grading context: "Chấm bài khác" and "Bài mới"
- July 30, 2025. Enhanced home page and essay grading interface:
  - Replaced gradient colors with website primary color (#20B2AA) throughout essay grading page
  - Added dual button layout to Writing Task 1 card matching Writing Task 2 structure
  - Created "Practice Writing Task 1" and "Grade My Writing Task 1" buttons
  - Implemented URL parameter handling to auto-select Task 1 when accessed from home page button
  - Updated essay grading page to read ?task=task1 parameter and set appropriate form defaults
  - Applied consistent primary color theming to all form elements, loading states, and buttons
- July 31, 2025. Removed Wordcraft and implemented Virtual Exam placeholder:
  - Completely removed Wordcraft card component from home page
  - Created Virtual Exam placeholder page with "coming soon" message and construction icon
  - Updated routing to replace /wordcraft route with VirtualExam component
  - Removed all Wordcraft-related imports and components from App.tsx
  - Added informative placeholder with upcoming features list and navigation to existing practice tools
  - Maintained "Virtual Exam" menu item in header navigation as requested

## User Preferences

Preferred communication style: Simple, everyday language.