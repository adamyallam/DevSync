'use client'
import { ChevronDown } from 'lucide-react';

type StatusKey = 'NotStarted' | 'OnTrack' | 'OffTrack' | 'AtRisk' | 'OnHold';

interface StatusButtonProps {
  status: string;
}

const StatusButton = ({ status }: StatusButtonProps) => {
  const statusConfig = {
    NotStarted: { label: 'Not Started', color: 'border-black', bgColor: 'bg-gray-300' },
    OnTrack: { label: 'On Track', color: 'border-green-500', bgColor: 'bg-green-200' },
    OffTrack: { label: 'Off Track', color: 'border-red-500', bgColor: 'bg-red-200' },
    AtRisk: { label: 'At Risk', color: 'border-yellow-500', bgColor: 'bg-yellow-200' },
    OnHold: { label: 'On Hold', color: 'border-blue-500', bgColor: 'bg-blue-200' },
  };

  const statusKey = status.charAt(0).toUpperCase() + status.slice(1) as StatusKey; // Capitalize the first letter for consistency
  const { label, color, bgColor } = statusConfig[statusKey] || { label: 'No Status Found', color: 'border-gray-400', bgColor: 'bg-gray-100' };

  return (
    <button className={`flex items-center gap-1 ml-3 mt-1 text-sm border rounded-full h-6 p-1 px-2 ${bgColor} ${color}`}>
      <div className={`border rounded-full ${color} w-2 h-2`} />
      {label}
      <ChevronDown strokeWidth={2} size={16} />
    </button>
  );
};

export default StatusButton