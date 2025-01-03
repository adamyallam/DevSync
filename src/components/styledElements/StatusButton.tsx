'use client'
import { useState, useEffect, useRef } from "react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext";
import { statusConfig, StatusKey } from "@/utils/statusConfig";
import ErrorMessage from "./ErrorMessage";

interface Props {
  status: string;
}

const StatusButton = ({ status }: Props) => {
  const { id } = useParams()
  const { projects, updateProjectDatabase, showError, exitError } = useProjectsDataContext()
  const { isSidebarOpen } = useNavbarUIContext()

  const [displayError, setDisplayError] = useState(false)
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null)

  const project = projects?.find((project) => project.id.toString() === id);

  const statusDetails = statusConfig[status as StatusKey] || {
    label: 'Unknown',
    icon: <div />,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && statusButtonRef.current && !statusButtonRef.current.contains(event.target as Node)) {
        setStatusChangeOpen(false);
      }
    };
    if (statusChangeOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [statusChangeOpen]);

  const changeStatus = async (newStatus: string) => {
    if (!project) return;
    setStatusChangeOpen(false);

    try {
      await updateProjectDatabase(project, 'status', newStatus);
    } catch {
      showError(setDisplayError, errorTimeoutRef)
    }
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className="flex items-center gap-3">
        <button ref={statusButtonRef} onClick={() => setStatusChangeOpen((prev) => !prev)} className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold hover:scale-105 transition-transform ${statusDetails.label === 'Set Status' ? 'text-xs' : 'text-[10px]'} ${statusDetails.bgColor} ${statusDetails.textColor}`}>
          {status === 'Complete' ? (<Check size={12} strokeWidth={3} />) : (<div className={`rounded-full ${statusDetails.secondBgColor} ${statusDetails.label === 'Set Status' ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} />)}
          {statusDetails.label}
        </button>
        <ErrorMessage arrowDirection={'left'} displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
      </div>

      {statusChangeOpen && (
        <div ref={menuRef} className={`cursor-default hover:cursor-pointer z-50 absolute ${isSidebarOpen ? 'left-[505px]' : 'left-[265px]'} top-24 border-[4px] border-selected ${statusDetails.borderColor} rounded-md w-[15%] h-[31%] bg-primary overflow-auto`}>
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