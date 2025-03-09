import Link from "next/link";

const About = () => {
    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="flex justify-center text-3xl pb-10 mt-24 text-primary-text">About DevSync</h1>
            <div className="flex flex-col items-center justify-center">
                <div className="w-3/4 flex flex-col items-center justify-center border-t-2 border-b-2 border-undertone p-4 mb-10">
                    <p className=" text-center items-center justify-center text-md text-primary-text mb-2">
                        Hi, I&apos;m Adam, the developer who created this full stack project, DevSync. I built it completely from scratch using Next.js, React, Typescript, and Tailwind CSS.
                        I also utilized PostgreSQL, Prisma, NextAuth, and Supabase for a seamless backend and database management.
                    </p>
                    <p className="text-center items-center justify-center text-md text-white font-bold mb-2">
                        I am currently looking for a job as a software developer, so if this project interests you, please reach out!
                        Visit my <Link href="/pages/contact" className="text-blue-400 hover:underline">contact page here! </Link>
                        or send me a message at hello@adamyallam.com.
                    </p>
                </div>
                <div className="w-3/4 flex flex-col items-center justify-center border-t-2 border-b-2 border-undertone p-4 mb-10">
                    <p className="text-center items-center justify-center text-md text-primary-text">
                        DevSync is a web application meant to help developers manage their projects and tasks while keeping track of their progress. On the home section of DevSync's dashboard,
                        users can view all of their projects and the tasks associated with them. Users also have the option to filter through their tasks by incomplete, upcoming, overdue or completed; Projects can be filtered by favorited and unfavorited.
                        In addition, the home page has a counter for the user's total number of projects, tasks, and completed tasks. As users create projects, they can navigate through them by favorited and unfavorited via the expandable sidebar.
                        Within a project, users can create tasks and organize them into sections. Each task can be assigned a name, due date, priority and status. For a better view of the project,
                        users can switch between a list, kanban, or calendar view of their project's tasks. To test out DevSync use the "View Demo" button on the app's home page or sign up for a free account and start tracking and organizing your projects!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About