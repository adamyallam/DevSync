import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

// Component Imports
import UserWelcome from "@/components/dashboard/pages/home/UserWelcome";
import TasksCard from "@/components/dashboard/pages/home/TasksCard";
import ProjectsCard from "@/components/dashboard/pages/home/ProjectsCard";

export default async function home(){
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Error('Failed to retrieve session')
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl ml-8 mt-20">Home</h1>
      </div>
      
      <div className="mt-5">
        <UserWelcome name={session.firstName}/>
        <div className="flex justify-center gap-4 mt-12">
          <TasksCard />
          <ProjectsCard />
        </div>
      </div>
    </div>
  )

}
