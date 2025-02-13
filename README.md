# DevSync 📌
A Project Tracker app built with Next.js, React, and TypeScript. This application allows users to create and manage projects, organize project tasks and view them in various formats, and more!

# 🎥 Demo & Screenshots
🔗 Live Demo: [Check out DevSync!](https://devsync.adamyallam.com/)

📸 Screenshots:
![Home](https://github.com/user-attachments/assets/c521a2a4-e986-4a77-9e8c-635725304435)

![List View](https://github.com/user-attachments/assets/1a09d35b-ed21-4aaf-9af3-72021a16f3d2)


# 🚀 Features
✅ User Authentication (NextAuth + Prisma + MySQL)

✅ Create & Manage Projects (Add, edit, delete)

✅ Task Management (Organize tasks into sections)

✅ Multiple View Modes (List, Board, Calendar)

✅ Calendar View for Tasks (@fullcalendar/react integration)

✅ Real-time Updates

✅ Modern UI with Tailwind CSS + Tailwind Scrollbar

✅ API Routes for Full CRUD Operations

# 🛠️ Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS

Backend: Next.js API Routes, Prisma, MySQL

Authentication: NextAuth with Prisma Adapter

Database: AWS RDS (MySQL)

UI Libraries: react-datepicker, Lucide Icons

Date Handling: Date-fns

# 📦 Installation
Clone the repository: git clone https://github.com/adamyallam/DevSync.git > cd DevSync

Install dependencies: npm install

Set up environment variables: Create a .env file and add:

DATABASE_URL="mysql://user:password@host:port/database"

NEXTAUTH_SECRET="your-secret"

NEXTAUTH_URL="http://localhost:3000"

Run database migrations: npx prisma migrate dev

Start the development server: npm run dev

# 🔧 Usage
Sign up or log in

Create a new project

Add sections and tasks to organize work

Track progress and manage tasks easily

# 🚀 Deployment
To deploy, make sure your environment variables are correctly set for production. If deploying on Vercel or Netlify, you may need to configure the database and authentication settings accordingly.

# 🔗 Connect with Me
📧 Email: hello@adamyallam.com

🐙 GitHub: [adamyallam](https://github.com/adamyallam)

🚀 Portfolio: [adamyallam.com](https://adamyallam.com/)
