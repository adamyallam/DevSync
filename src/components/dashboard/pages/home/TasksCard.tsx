'use client'

// Component Imports

export const TasksCard = () => { 
    
    return (
      <div className="w-5/12 h-96 border-2 border-gray-200 rounded-lg shadow-sm">
        <div className="grid grid-cols-3 grid-rows-2">
          <div className="w-16 h-16 ml-6 mt-5 border-2 border-black bg-gray-200 rounded-full">
            <p className="flex justify-center mt-4">PFP</p>
          </div>
          <h1 className="mt-9 text-lg">My Tasks</h1>
          <div className="flex justify-start gap-2 row-start-2">
            <p className="text-sm">Upcoming</p>
            <p className="text-sm">Overdue</p>
            <p className="text-sm">Completed</p>
          </div>
        </div>
      </div>
    )
}


export default TasksCard

// border-b-2 border-black pb-8