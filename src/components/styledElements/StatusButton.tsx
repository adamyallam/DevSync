'use client'
import { useState, useRef } from "react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { Check } from "lucide-react";
import { statusConfig, StatusKey } from "@/utils/statusConfig";
import ErrorMessage from "./ErrorMessage";
import { Project, Task } from "../dashboard/context/ProjectsDataProvider";
import useMenuClose from "@/utils/hooks/useMenuClose";

interface Props {
  status: string;
  model: 'task' | 'project'
  project: Project
  task?: Task
}

const StatusButton = ({ status, model, project, task }: Props) => {
  const { updateProjectDatabase, updateTaskDatabase, showError, exitError } = useProjectsDataContext()

  const [displayError, setDisplayError] = useState(false)
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null)

  useMenuClose(menuRef, statusButtonRef, statusChangeOpen, setStatusChangeOpen)

  if (!project) {
    return null
  }

  const statusDetails = statusConfig[status as StatusKey] || {
    label: 'Unknown',
    icon: <div />,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  };

  const changeStatus = async (newStatus: string) => {
    setStatusChangeOpen(false);

    try {
      if (model === 'project' && project) {
        await updateProjectDatabase(project, 'status', newStatus);
      } else if (model === 'task' && task) {
        await updateTaskDatabase(task, project, 'status', newStatus);
      } else {
        throw new Error("can't find project or task")
      }

    } catch {
      showError(setDisplayError, errorTimeoutRef)
    }
  };

  return (
    <div className={`${model === 'task' ? 'relative' : ''} w-full flex flex-col justify-center`}>
      <div className="flex items-center gap-3">
        <button ref={statusButtonRef} onClick={() => setStatusChangeOpen((prev) => !prev)} className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold hover:scale-105 transition-transform ${statusDetails.label === 'Set Status' ? 'text-xs' : 'text-[10px]'} ${statusDetails.bgColor} ${statusDetails.textColor}`}>
          {status === 'Complete' ? (<Check size={12} strokeWidth={3} />) : (<div className={`rounded-full ${statusDetails.secondBgColor} ${statusDetails.label === 'Set Status' ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} />)}
          {statusDetails.label}
        </button>
        <ErrorMessage arrowDirection={'left'} displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
      </div>

      {statusChangeOpen && (
        <div ref={menuRef} className={`absolute cursor-default hover:cursor-pointer z-50 ${model === 'task' ? 'top-full w-full mt-1 pb-4' : 'w-[15%] h-[30%] top-24'} border-[3px] border-undertone ${statusDetails.borderColor} rounded-md bg-primary overflow-auto`}>
          <span className="flex self-center ml-1.5 px-1 pt-2 text-[10px] text-secondary-text font-semibold">Update status:</span>
          <div className="flex flex-col pt-1 pb-2">
            {Object.entries(statusConfig).filter(([key]) => key !== 'Complete' && key !== 'SetStatus').map(([key, { label, bgColor, textColor, secondBgColor }]) => {

              return (
                <div onClick={() => changeStatus(key)} key={key} className="hover:bg-selected p-1.5">
                  <button className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold transition-transform text-[10px] ${bgColor} ${textColor}`}>
                    <div className={`rounded-full ${secondBgColor} w-1.5 h-1.5`} />
                    {label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="hover:bg-selected pt-2 p-1.5 border-t-2 border-b-2 border-selected">
            <button onClick={() => changeStatus('Complete')} className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold transition-transform text-[10px] ${statusConfig['Complete'].bgColor} ${statusConfig['Complete'].textColor}`}>
              <Check size={12} strokeWidth={3} />
              {statusConfig['Complete'].label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusButton