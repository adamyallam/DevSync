"use client"
import { useState, useEffect, useRef } from "react";

//Component imports
import Transition from "@/components/dashboard/Transition";


export const ProjectGreeting = () => {
  const [projectDescription, setProjectDescription] = useState('Project Description')
  const [descriptionText, setDescriptionText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= 200) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;
    } else if (inputRef.current) {
      inputRef.current.style.width = '200px'
    }
  }, [projectDescription]);

  return (
    <div>
      <Transition classes='flex flex-col ml-20 mt-12' transition="translate-x-60">
        <div>
          <input 
          type='text'
          placeholder="Project Description..."
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          ref={inputRef}
          className={`px-1 py-1 text-xl`}
          style={{ width: '200px'}} />

          <span
            ref={spanRef}
            className="absolute top-0 left-0 invisible whitespace-pre pr-5 text-xl">
            {projectDescription}
          </span>
        </div>

        <div>
          <input 
          type='text'
          placeholder="Tell your crew what this project is about"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
          ref={inputRef}
          className={`px-2 py-1 text-sm w-1/2`}
          style={{ height: '200px'}} />

          <span
            ref={spanRef}
            className="absolute top-0 left-0 invisible whitespace-pre pr-5 text-xl">
            {projectDescription}
          </span>
        </div>
      </Transition>
    </div>
  )
}

export default ProjectGreeting