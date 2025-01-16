'use client'
import { useState } from "react"
import { Plus } from "lucide-react"

// Component Imports

export const TasksCard = () => {

  const [taskView, setTaskView] = useState('Upcoming')

  return (
    <div className="w-550 h-96 border-2 border-undertone rounded-lg shadow-sm">

      <div className="border-b-2 border-undertone">
        <div className="flex items-center mt-5 ml-12 pb-3">
          <div className="w-10 h-10 border-2 border-undertone bg-gray-200 rounded-full"></div>

          <div className="flex flex-col gap-2 ml-5 text-primary-text">
            <h1 className="text-lg font-semibold">My Tasks</h1>

            <div className="flex gap-6">
              {[
                { name: 'Upcoming' },
                { name: 'Overdue' },
                { name: 'Completed' }
              ].map(({ name }) => (
                <div key={name} className="flex-col ml-1">
                  <div className="flex">
                    <span className={`invisible scale-105 font-semibold text-xs`}>{name}</span>
                    <button onClick={() => setTaskView(name)} className={`absolute ${taskView === name ? 'scale-110 font-semibold' : 'hover:scale-110 hover:font-semibold transition-all'} text-xs`}>{name}</button>
                  </div>
                  <div className={`${taskView === name ? 'scale-x-100' : 'scale-x-0'} bg-primary-text w-full h-[2px] translate-y-[13px] transition-transform duration-500`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-primary-text font-semibold">

      </div>
    </div>
  )
}


export default TasksCard