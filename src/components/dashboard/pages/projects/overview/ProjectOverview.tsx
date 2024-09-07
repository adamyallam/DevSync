"use client"
import { Plus } from "lucide-react";

//Component imports
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";


export const ProjectOverview = () => {

  return (
    <div className="h-screen flex flex-col ml-20 mt-12">
      <AutoResizingInput initialWidth={200} placeholder="Project Description..." className="text-xl px-1 py-1" initialState="Project Description..."/>
      <textarea
      className="flex-shrink-0 border-2 border-gray-300 rounded w-1/2 resize-none px-2 mt-1" 
      rows={7}
      placeholder="Type your description, welcome message, or project info here!"/>

      <div>
        <h1 className="text-xl mt-10">Project Roles & Members</h1>

        <div className="flex gap-16 ml-5">
          <button className="flex items-center gap-3">
            <div className="flex justify-center items-center border-2 border-dashed rounded-full border-gray-300 w-9 h-9 mt-6">
              <Plus color="gray" size={18} strokeWidth={2}/>
            </div>
            <span className="mt-6">Add Member</span>
          </button>

          <button className="flex items-center gap-2">
            <div className="border-2 rounded-full border-red-400 bg-red-500 w-10 h-10 mt-6"/>

            <div className="flex flex-col items-start mt-6">
              <span className="text-sm">Name Placeholder</span>
              <span className="text-xs text-gray-400">Role Placeholder</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview