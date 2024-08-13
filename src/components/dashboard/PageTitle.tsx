'use client'
import { getPageTitle } from "@/utils/getPageTitle"
import { useContext } from "react";

//component imports
import { OpenContext } from '@/components/context/OpenContext';

export const PageTitle = () => {
  const isOpen = useContext(OpenContext);

  return (
    <div>
      <h1 className={`transition-all duration-300 text-2xl mt-20 ml-8 ${isOpen ? 'translate-x-60' : ''}`}>{getPageTitle()}</h1>
    </div>
  )
}