'use client'
import { Check, CalendarX, CalendarClock, CalendarMinus2, CalendarCheck } from "lucide-react";

export type StatusKey = 'SetStatus' | 'OnTrack' | 'OffTrack' | 'AtRisk' | 'OnHold' | 'Complete';

export const statusConfig: Record<StatusKey, { label: string; textColor: string; bgColor: string; secondBgColor: string; borderColor: string; icon: JSX.Element }> = {
  SetStatus: { label: 'Set Status', textColor: 'text-secondary-text', bgColor: 'bg-selected', secondBgColor: 'border border-secondary-text', borderColor: 'border-t-secondary-text', icon: <div className="w-4 h-4 rounded-full border-[3px] border-secondary-text" /> },
  OnTrack: { label: 'On Track', textColor: 'text-[#48F701]', bgColor: 'bg-[#009903]', secondBgColor: 'bg-[#48F701]', borderColor: 'border-t-[#009903]', icon: <CalendarCheck size={21} strokeWidth={2} className="text-[#48F701]" /> },
  OffTrack: { label: 'Off Track', textColor: 'text-[#FF7D7A]', bgColor: 'bg-[#A32020]', secondBgColor: 'bg-[#FF7D7A]', borderColor: 'border-t-[#A32020]', icon: <CalendarX size={21} strokeWidth={2} className="text-[#FF7D7A]" /> },
  AtRisk: { label: 'At Risk', textColor: 'text-[#FDFF01]', bgColor: 'bg-[#D4BD02]', secondBgColor: 'bg-[#FDFF01]', borderColor: 'border-t-[#D4BD02]', icon: <CalendarClock size={21} strokeWidth={2} className="text-[#FDFF01]" /> },
  OnHold: { label: 'On Hold', textColor: 'text-[#02BDFF]', bgColor: 'bg-[#1A5AB5]', secondBgColor: 'bg-[#02BDFF]', borderColor: 'border-t-[#1A5AB5]', icon: <CalendarMinus2 size={21} strokeWidth={2} className="text-[#02BDFF]" /> },
  Complete: { label: 'Complete', textColor: 'text-green-200', bgColor: 'bg-green-700', secondBgColor: '', borderColor: 'border-t-green-700', icon: <Check size={16} strokeWidth={4} className="text-green-500" /> }
};