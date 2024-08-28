"use client"
import { useState, useEffect, useRef } from "react";

//Component imports
import Transition from "@/components/dashboard/Transition";
import AutoResizingInput from "@/components/styledElements/AutoResizeInput";


export const ProjectGreeting = () => {

  return (
    <div>
      <Transition classes='flex flex-col ml-20 mt-12' transition="translate-x-60">
        <AutoResizingInput initialWidth={200} placeholder="Project Greeting..." className="text-xl px-1 py-1"/>
        <textarea
        className="border-2 border-gray-300 rounded w-1/2" 
        rows={5}
        placeholder="Type your description, welcome message, or project info here!"
        />
      </Transition>
    </div>
  )
}

export default ProjectGreeting