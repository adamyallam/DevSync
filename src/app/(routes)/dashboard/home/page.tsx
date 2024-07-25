import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Component Imports
import UserWelcome from "@/components/dashboard/pages/home/UserWelcome";
import ContentTransition from "@/utils/ContentTransition";
import TasksCard from "@/components/dashboard/pages/home/TasksCard";
import ProjectsCard from "@/components/dashboard/pages/home/ProjectsCard";

export default async function home(){
  const session = await getServerSession(authOptions)

  return (
    <div>
      <ContentTransition>
        <h1 className='text-2xl'>Home</h1>
        <UserWelcome name={session?.user.firstName}/>
        <div className="flex justify-center gap-4 mt-8">
          <TasksCard />
          <ProjectsCard />
        </div>
      </ContentTransition>
    </div>
  )

}
