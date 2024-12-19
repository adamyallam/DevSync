'use client'
import { useState, useEffect, useRef } from "react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import { Check, CalendarX, CalendarClock, CalendarCheck, CalendarMinus2, Calendar } from "lucide-react";
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext";

type StatusKey = 'SetStatus' | 'OnTrack' | 'OffTrack' | 'AtRisk' | 'OnHold';

interface Props {
  status: string;
  onStatusChange: (colors: { bgColor: string; icon: JSX.Element }) => void;
}

const StatusButton = ({ status, onStatusChange }: Props) => {
  const { id } = useParams()
  const { projects } = useProjectsDataContext()
  const { isSidebarOpen } = useNavbarUIContext()

  const statusKey = status.charAt(0).toUpperCase() + status.slice(1) as StatusKey;
  const project = projects?.find((project) => project.id.toString() === id);
  const menuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null)

  const [newStatusKey, setNewStatusKey] = useState(statusKey)
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)

  const statusConfig = {
    SetStatus: { label: 'Set Status', textColor: 'text-secondary-text', bgColor: 'bg-selected', secondBgColor: 'border border-secondary-text', borderColor: 'border-t-secondary-text', icon: <div className="w-4 h-4 rounded-full border-[3px] border-secondary-text" /> },
    OnTrack: { label: 'On Track', textColor: 'text-[#48F701]', bgColor: 'bg-[#009903]', secondBgColor: 'bg-[#48F701]', borderColor: 'border-t-[#009903]', icon: <CalendarCheck size={21} strokeWidth={2} className="text-[#48F701]" /> },
    OffTrack: { label: 'Off Track', textColor: 'text-[#FF7D7A]', bgColor: 'bg-[#A32020]', secondBgColor: 'bg-[#FF7D7A]', borderColor: 'border-t-[#A32020]', icon: <CalendarX size={21} strokeWidth={2} className="text-[#FF7D7A]" /> },
    AtRisk: { label: 'At Risk', textColor: 'text-[#FDFF01]', bgColor: 'bg-[#D4BD02]', secondBgColor: 'bg-[#FDFF01]', borderColor: 'border-t-[#D4BD02]', icon: <CalendarClock size={21} strokeWidth={2} className="text-[#FDFF01]" /> },
    OnHold: { label: 'On Hold', textColor: 'text-[#02BDFF]', bgColor: 'bg-[#1A5AB5]', secondBgColor: 'bg-[#02BDFF]', borderColor: 'border-t-[#1A5AB5]', icon: <CalendarMinus2 size={21} strokeWidth={2} className="text-[#02BDFF]" /> },
    Complete: { label: 'Complete', textColor: 'text-green-200', bgColor: 'bg-green-700', secondBgColor: '', borderColor: 'border-t-green-700', icon: <Check size={16} strokeWidth={4} className="text-green-500" /> }
  };

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