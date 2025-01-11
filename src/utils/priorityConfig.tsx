'use client'

export type PriorityKey = 'SetPriority' | 'High' | 'Medium' | 'Low'

export const priorityConfig: Record<PriorityKey, { label: string; textColor: string; secondBgColor: string; borderColor: string }> = {
  SetPriority: { label: 'Set Priority', textColor: 'text-secondary-text', secondBgColor: 'border border-secondary-text', borderColor: 'border-t-secondary-text' },
  High: {  label: 'High', textColor: 'text-[#FF7D7A]', secondBgColor: 'bg-[#FF7D7A]', borderColor: 'border-t-[#A32020]' },
  Medium: {  label: 'Medium', textColor: 'text-[#FDFF01]', secondBgColor: 'bg-[#FDFF01]', borderColor: 'border-t-[#D4BD02]'},
  Low: {label: 'Low', textColor: 'text-[#02BDFF]', secondBgColor: 'bg-[#02BDFF]', borderColor: 'border-t-[#1A5AB5]'}
};