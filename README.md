# DevSync

DevSync is a personal project tracking application that allows users to create and manage projects, organize tasks within sections, and keep track of progress through various views. It is designed for individual users who need an efficient way to structure their work and stay on top of deadlines.

## Features

- **Project Management**: Create and manage multiple projects.
- **Task Organization**: Organize tasks into sections within projects.
- **Task Details**: Add tasks with the following attributes:
  - Name
  - Due Date
  - Priority
  - Status
  - Completion Checkmark
- **Dashboard Home**: View an overview of your work, including:
  - Total number of tasks
  - Completed tasks
  - Total projects
- **Multiple Task Views**:
  - **Overview View**: A description of the project.
  - **Board View**: Visualize tasks in a kanban-style board.
  - **Calendar View**: Track tasks based on their due dates.
- **Demo Mode**: Try out the full capabilities of the app without signing up. Data in demo mode is not saved, and all changes will be lost upon page refresh.

## Tech Stack

### Frontend
- Next.js (React Framework)
- React
- TypeScript
- Tailwind CSS (for styling)

### Backend
- PostgreSQL (Database for data persistence)
- Prisma (ORM for database interactions)
- NextAuth (Authentication handling)
- Supabase (Hosting PostgreSQL database)
- API and Server Functions (Built into Next.js for backend logic)

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adamyallam/devsync.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd devsync
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
   - Fill in the necessary environment variables for database connection, authentication, and API keys in the `.env` file.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open the app in your browser**:
   - Visit [http://localhost:3000](http://localhost:3000)

## Usage

- Sign up or log in to start managing projects.
- Create a new project and add sections to categorize tasks.
- Add tasks with relevant details and track progress.
- Switch between board and calendar views for better visualization.

**OR**

- Use Demo Mode to explore the app without creating an account.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, feel free to reach out:

- **Portfolio**: [https://adamyallam.com/](https://adamyallam.com/)
- **Email**: hello@adamyallam.com
- **Linkedin**: [linkedin.com/adamyallam](https://www.linkedin.com/in/adamyallam/)
- **GitHub**: [github.com/adamyallam](https://github.com/adamyallam)
