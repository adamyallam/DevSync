'use client'
import { ChevronDown } from 'lucide-react';

type StatusKey = 'NotStarted' | 'OnTrack' | 'OffTrack' | 'AtRisk' | 'OnHold';

interface StatusButtonProps {
  status: string;
}

const StatusButton = ({ status }: StatusButtonProps) => {
  const statusConfig = {
    NotStarted: { label: 'Not Started', textColor: 'text-gray-500', bgColor: 'bg-gray-200', secondBgColor: 'bg-gray-500' },
    OnTrack: { label: 'On Track', textColor: 'text-[#48F701]', bgColor: 'bg-[#009903]', secondBgColor: 'bg-[#48F701]' },
    OffTrack: { label: 'Off Track', textColor: 'text-[#FF7D7A]', bgColor: 'bg-[#A32020]', secondBgColor: 'bg-[#FF7D7A]' },
    AtRisk: { label: 'At Risk', textColor: 'text-[#FDFF01]', bgColor: 'bg-[#D4BD02]', secondBgColor: 'bg-[#FDFF01]' },
    OnHold: { label: 'On Hold', textColor: 'text-[#02BDFF]', bgColor: 'bg-[#1A5AB5]', secondBgColor: 'bg-[#02BDFF]' },
  };

  const statusKey = status.charAt(0).toUpperCase() + status.slice(1) as StatusKey;
  const { label, textColor, bgColor, secondBgColor } = statusConfig[statusKey] || { label: 'No Status Found', textColor: 'text-gray-700', bgColor: 'bg-gray-100', secondBgColor: 'bg-gray-700' };

  return (
    <div className='flex items-center'>
      <button className={`group flex items-center gap-1 ml-1 text-xs rounded-md h-6 px-1 font-semibold hover:scale-105 transition-transform ${bgColor} ${textColor}`}>
        <div className={`rounded-full ${secondBgColor} w-2 h-2`} />
        {label}
      </button>
    </div>
  );
};

export default StatusButton