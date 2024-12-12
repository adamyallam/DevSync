'use client'
import { useState } from "react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";

type StatusKey = 'SetStatus' | 'OnTrack' | 'OffTrack' | 'AtRisk' | 'OnHold';

interface StatusButtonProps {
  status: string;
}

const StatusButton = ({ status }: StatusButtonProps) => {
  const { id } = useParams()
  const { projects } = useProjectsDataContext()
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)

  const project = projects?.find((project) => project.id.toString() === id);

  const statusConfig = {
    SetStatus: { label: 'Set Status', textColor: 'text-black', bgColor: '', secondBgColor: 'border-2 border-black', borderColor: 'border-t-[#009903]' },
    OnTrack: { label: 'On Track', textColor: 'text-[#48F701]', bgColor: 'bg-[#009903]', secondBgColor: 'bg-[#48F701]', borderColor: 'border-t-[#009903]' },
    OffTrack: { label: 'Off Track', textColor: 'text-[#FF7D7A]', bgColor: 'bg-[#A32020]', secondBgColor: 'bg-[#FF7D7A]', borderColor: 'border-t-[#009903]' },
    AtRisk: { label: 'At Risk', textColor: 'text-[#FDFF01]', bgColor: 'bg-[#D4BD02]', secondBgColor: 'bg-[#FDFF01]', borderColor: 'border-t-[#009903]' },
    OnHold: { label: 'On Hold', textColor: 'text-[#02BDFF]', bgColor: 'bg-[#1A5AB5]', secondBgColor: 'bg-[#02BDFF]', borderColor: 'border-t-[#009903]' },
  };

  const statusKey = status.charAt(0).toUpperCase() + status.slice(1) as StatusKey;
  const { label, textColor, bgColor, secondBgColor, borderColor } = statusConfig[statusKey] || { label: 'No Status Found', textColor: 'text-gray-700', bgColor: 'bg-gray-100', secondBgColor: 'bg-gray-700', borderColor: '' };

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
        setStatusChangeOpen(!statusChangeOpen)
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
      <button onClick={() => setStatusChangeOpen(!statusChangeOpen)} className={`group flex items-center gap-1 ml-1 rounded-md h-6 px-1 font-semibold hover:scale-105 transition-transform ${label === 'Set Status' ? 'text-sm' : 'text-xs'} ${bgColor} ${textColor}`}>
        <div className={`rounded-full ${secondBgColor} ${label === 'Set Status' ? 'w-3 h-3' : 'w-2 h-2'}`} />
        {label}
      </button>

      {statusChangeOpen && (
        <div className={`cursor-default hover:cursor-pointer z-50 absolute left-[507px] top-24 border-4 border-[#3A4042] ${borderColor} rounded-md w-[15%] h-[31.5%] bg-[#212526] overflow-auto`}>
          <span className="flex self-center ml-1.5 px-1 pt-2 text-xs text-[#89979E] font-semibold">Update status:</span>
          <div className="flex flex-col pt-1 pb-2">
            {Object.keys(statusConfig).map((statusKey, index) => {
              if (statusKey !== 'SetStatus') {
                const { label, textColor, bgColor, secondBgColor } = statusConfig[statusKey as StatusKey];
                return (
                  <div key={index} className="hover:bg-[#2F3636] p-1.5">
                    <button onClick={() => changeStatus(statusKey)} className={`group flex items-center gap-1 ml-1 rounded-md h-6 px-1 font-semibold transition-transform  ${label === 'Set Status' ? 'text-sm' : 'text-xs'} ${bgColor} ${textColor}`}>
                      <div className={`rounded-full ${secondBgColor} ${label === 'Set Status' ? 'w-3 h-3' : 'w-2 h-2'}`} />
                      {label}
                    </button>
                  </div>
                );
              }
            })}
          </div>

          <div className="hover:bg-[#2F3636] pt-2 p-1.5 border-t-2 border-b-2 border-[#3A4042]">
            <button onClick={() => changeStatus(statusKey)} className={`group flex items-center gap-1 ml-1 rounded-md h-6 px-1 font-semibold transition-transform  ${label === 'Set Status' ? 'text-sm' : 'text-xs'} ${bgColor} ${textColor}`}>
              <div className={`rounded-full ${secondBgColor} ${label === 'Set Status' ? 'w-3 h-3' : 'w-2 h-2'}`} />
              {label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusButton