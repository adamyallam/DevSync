'use client'

// Component Imports

export const TasksCard = () => { 
    
    return (
      <div className="w-4/12 h-96 border-2 border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center p-8 ml-5">

          <div className="w-14 h-14 mb-5 border-2 border-black bg-gray-200 rounded-full"></div> {/* Profile Photo Placeholder */}

          <div className="flex flex-col gap-3 ml-5">
            <h1 className="text-xl">My Tasks</h1>

            <div className="flex gap-4">
              <p className="text-sm">Upcoming</p>
              <p className="text-sm">Overdue</p>
              <p className="text-sm">Completed</p>
            </div>
          </div>

        </div>
      </div>
    )
}


export default TasksCard