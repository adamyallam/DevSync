'use client'
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useState, useRef, useEffect } from "react";
import { Project, Task } from "../dashboard/context/ProjectsDataProvider";
import { priorityConfig, PriorityKey } from "@/utils/priorityConfig";
import ErrorMessage from "./ErrorMessage";
import { Check } from "lucide-react";

interface Props {
  priority: string,
  project: Project,
  task: Task
}

const PriorityButton = ({ priority, project, task }: Props) => {
  const { showError, exitError, updateTaskDatabase } = useProjectsDataContext()

  const [displayError, setDisplayError] = useState(false)
  const [priorityChangeOpen, setPriorityChangeOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null);
    const errorTimeoutRef = useRef<number | null>(null);
    const priorityButtonRef = useRef<HTMLButtonElement>(null)

  if (!project) {
    return null
  }

  const priorityDetails = priorityConfig[priority as PriorityKey] || {
    label: 'Unknown',
    textColor: 'text-gray-700',
  };

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) && priorityButtonRef.current && !priorityButtonRef.current.contains(event.target as Node)) {
          setPriorityChangeOpen(false);
        }
      };
      if (priorityChangeOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [priorityChangeOpen]);
  
    const changePriority = async (newPriority: string) => {
      if (!project || !task) return;
      setPriorityChangeOpen(false);
  
      try {
        await updateTaskDatabase(task, project, 'priority', newPriority);
  
      } catch {
        showError(setDisplayError, errorTimeoutRef)
      }
    };

  return (
    <div className={`relative w-full flex flex-col justify-center`}>
      <div className="flex items-center gap-3">
        <button ref={priorityButtonRef} onClick={() => setPriorityChangeOpen((prev) => !prev)} className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold hover:scale-105 transition-transform text-xs ${priorityDetails.textColor}`}>
          <div className={`rounded-full ${priorityDetails.secondBgColor} ${priorityDetails.label === 'Set Priority' ? 'w-2 h-2' : 'w-3 h-3'}`} />
          {priorityDetails.label}
        </button>
        <ErrorMessage arrowDirection={'left'} displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
      </div>

      {priorityChangeOpen && (
        <div ref={menuRef} className={`cursor-default hover:cursor-pointer z-50 absolute top-full w-full mt-1 border-[4px] border-selected ${priorityDetails.borderColor} rounded-md bg-primary overflow-auto`}>
          <span className="flex self-center ml-1.5 px-1 pt-2 text-[10px] text-secondary-text font-semibold">Update Priority:</span>
          <div className="flex flex-col pt-1 pb-2">
            {Object.entries(priorityConfig).filter(([key]) => key !== 'SetPriority').map(([key, { label, textColor, secondBgColor }]) => {

              return (
                <div onClick={() => changePriority(key)} key={key} className="hover:bg-selected p-1.5">
                  <button className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold transition-transform text-xs ${textColor}`}>
                    <div className={`rounded-full ${secondBgColor} w-3 h-3`} />
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityButton