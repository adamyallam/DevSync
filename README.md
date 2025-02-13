Project Tracker 📌
A Project Tracker app built with Next.js, React, and TypeScript. This application allows users to create and manage projects, organize project tasks and view them in various formats, and more!

🚀 Features
User Authentication (NextAuth + Prisma + MySQL)
Create & Manage Projects (Add, edit, delete)
Task Management (Organize tasks into sections)
Real-time Updates
Responsive UI (Tailwind CSS for styling)
API Routes (CRUD operations using Next.js API routes)

🛠️ Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS
Backend: Next.js API Routes, Prisma, MySQL
Authentication: NextAuth
Database: AWS RDS (MySQL)

📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/adamyallam/DevSync.git
cd project-tracker

Install dependencies:
bash
Copy
Edit
npm install
# or
yarn install

Set up environment variables:

Create a .env file and add:

DATABASE_URL="mysql://user:password@host:port/database"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

Run database migrations:
npx prisma migrate dev

Start the development server:
npm run dev

🔧 Usage
Sign up or log in
Create a new project
Add sections and tasks to organize work
Track progress and manage tasks easily

🚀 Deployment
To deploy, make sure your environment variables are correctly set for production. If deploying on Vercel or Netlify, you may need to configure the database and authentication settings accordingly.
