'use client'
import { useState, useEffect, useRef } from "react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import { Check, CalendarX, CalendarClock, CalendarCheck, CalendarMinus2, Calendar } from "lucide-react";
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext";
import { statusConfig, StatusKey } from "@/utils/statusConfig";

interface Props {
  status: string;
  onStatusChange: (colors: { bgColor: string; icon: JSX.Element }) => void;
}

const StatusButton = ({ status, onStatusChange }: Props) => {
  const { id } = useParams()
  const { projects, updateProject } = useProjectsDataContext()
  const { isSidebarOpen } = useNavbarUIContext()

  const project = projects?.find((project) => project.id.toString() === id);
  const menuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null)
  const statusKey = status.charAt(0).toUpperCase() + status.slice(1) as StatusKey;

  const [newStatusKey, setNewStatusKey] = useState(statusKey)
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)

  const { label, textColor, bgColor, secondBgColor, borderColor, icon } = statusConfig[newStatusKey] || { label: 'No Status Found', textColor: 'text-gray-700', bgColor: 'bg-gray-100', secondBgColor: 'bg-gray-700', borderColor: '', icon: <div /> };

  useEffect(() => {
    onStatusChange({ bgColor, icon });
  }, []);

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

    try {
      const res = await fetch(`http://localhost:3000/api/project`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          status: newStatus,
        }),
      });

      if (res.ok) {
        const updatedStatusKey = newStatus as StatusKey;
        const updatedStyles = statusConfig[updatedStatusKey];
  
        setNewStatusKey(updatedStatusKey);
        updateProject(project.id, {status: updatedStatusKey});
        onStatusChange({ bgColor: updatedStyles.bgColor, icon: updatedStyles.icon });
        setStatusChangeOpen(!statusChangeOpen);
        console.log('Project name updated, new name:', newStatus)
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  }

  return (
    <div className='flex flex-col justify-center'>
      <button ref={statusButtonRef} onClick={() => setStatusChangeOpen((prev) => !prev)} className={`group flex items-center gap-1 ml-1 rounded-md h-5 px-1 font-semibold hover:scale-105 transition-transform ${label === 'Set Status' ? 'text-xs' : 'text-[10px]'} ${bgColor} ${textColor}`}>
        {newStatusKey === 'Complete' as StatusKey ? (<Check size={12} strokeWidth={3} />) : (<div className={`rounded-full ${secondBgColor} ${label === 'Set Status' ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} />)}
        {label}
      </button>

      {statusChangeOpen && (
        <div ref={menuRef} className={`cursor-default hover:cursor-pointer z-50 absolute ${isSidebarOpen ? 'left-[505px]' : 'left-[265px]'} left-[505px] top-24 border-[4px] border-selected ${borderColor} rounded-md w-[15%] h-[31%] bg-primary overflow-auto`}>
          <span className="flex self-center ml-1.5 px-1 pt-2 text-[10px] text-secondary-text font-semibold">Update status:</span>
          <div className="flex flex-col pt-1 pb-2">
            {Object.keys(statusConfig).filter((statusKey) => statusKey !== 'SetStatus' && statusKey !== 'Complete').map((statusKey, index) => {
              const { label, textColor, bgColor, secondBgColor } = statusConfig[statusKey as StatusKey];
              return (
                <div onClick={() => changeStatus(statusKey)} key={index} className="hover:bg-selected p-1.5">
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