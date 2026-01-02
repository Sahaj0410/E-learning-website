COURSE WEBSITE – PixelPathshala
================================

PixelPathshala is a modern, interactive course-based learning platform built with
Next.js (App Router). It allows users to explore courses, enroll, complete
interactive coding exercises, earn XP, and get AI-powered help while learning.

--------------------------------------------------
TECH STACK
--------------------------------------------------
Frontend:
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Sandpack (Code Editor & Preview)
- Lucide Icons

Backend / APIs:
- Next.js API Routes
- Drizzle ORM
- PostgreSQL (or compatible SQL DB)
- Clerk Authentication

Other Tools:
- Sonner (Toasts)
- Axios
- React Split (Resizable Panels)

--------------------------------------------------
FEATURES
--------------------------------------------------
✔ User authentication (Sign up / Sign in)
✔ Course listing & course detail pages
✔ Chapter & exercise-based learning flow
✔ Locked / unlocked exercises logic
✔ Interactive code editor with live preview
✔ XP-based progress tracking
✔ Course progress status (Exercises + XP)
✔ Pro subscription support
✔ AI Tutor (Pro users only)
✔ Responsive design (Mobile + Desktop)
✔ Optimized production build

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------
app/
 ├─ (routes)/
 │   ├─ courses/
 │   │   ├─ [courseId]/
 │   │   │   ├─ [chapterId]/
 │   │   │   │   └─ [exerciseslug]/
 │   ├─ dashboard/
 │   ├─ pricing/
 │   ├─ contact-us/
 │
 ├─ api/
 │   ├─ course/
 │   ├─ enroll-course/
 │   ├─ exercise/
 │   ├─ exercise/complete/
 │   ├─ ai-chat/
 │   ├─ subscription/
 │   └─ user/
 │
components/
 ├─ ui/
 ├─ CourseList
 ├─ CodeEditor
 ├─ ContentSection
 ├─ AIChatWidget

--------------------------------------------------
SETUP INSTRUCTIONS
--------------------------------------------------

1. Clone the repository
   git clone <your-repo-url>
   cd course-website

2. Install dependencies
   npm install

3. Setup environment variables (.env)
   - DATABASE_URL
   - CLERK_SECRET_KEY
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - OPENAI_API_KEY / AI API Key

4. Run development server
   npm run dev

5. Build for production
   npm run build

6. Start production server
   npm start

--------------------------------------------------
AI TUTOR
--------------------------------------------------
- Available only for Pro users
- Context-aware coding help
- Positioned as a floating action button
- Does not interfere with core UI or footer

--------------------------------------------------
KNOWN WARNINGS (SAFE TO IGNORE)
--------------------------------------------------
- baseline-browser-mapping outdated warning
- images.domains deprecation warning
- middleware → proxy deprecation notice

These do NOT affect functionality or deployment.

--------------------------------------------------
DEPLOYMENT
--------------------------------------------------
Recommended Platform:
- Vercel

Ensure environment variables are set correctly
before deploying.

--------------------------------------------------
AUTHOR
--------------------------------------------------
Sahaj Thakkar

--------------------------------------------------
LICENSE
--------------------------------------------------
This project is for educational and portfolio use.
All rights reserved by the author.
