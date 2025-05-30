// Component Imports
import UserWelcome from "@/components/dashboard/pages/home/UserWelcome";
import TasksCard from "@/components/dashboard/pages/home/TasksCard";
import ProjectsCard from "@/components/dashboard/pages/home/ProjectsCard";

export default async function home() {

  return (
    <div className="">
      <div>
        <h1 className="text-2xl ml-8 mt-20 text-white">Home</h1>
      </div>

      <div className="mt-5">
        <UserWelcome />
        <div className="flex justify-center gap-4 mt-12">
          <TasksCard />
          <ProjectsCard />
        </div>
      </div>
    </div>
  )

}
