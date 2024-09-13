import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Component Imports
import UserWelcome from "@/components/dashboard/pages/home/UserWelcome";
import TasksCard from "@/components/dashboard/pages/home/TasksCard";
import ProjectsCard from "@/components/dashboard/pages/home/ProjectsCard";
import PageTitle from "@/components/styledElements/PageTitle";

export default async function home(){
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div>
        <PageTitle classes="text-2xl ml-8 mt-20"/>
      </div>
      
      <div className="mt-5">
        <UserWelcome name={session?.user.firstName}/>
        <div className="flex justify-center gap-4 mt-12">
          <TasksCard />
          <ProjectsCard />
        </div>
      </div>
    </div>
  )

}
