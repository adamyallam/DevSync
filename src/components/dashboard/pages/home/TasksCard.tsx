'use client'

// Component Imports

export const TasksCard = () => { 
    
    return (
      <div className="w-4/12 h-96 border-2 border-gray-200 rounded-lg shadow-sm">

        <div className="flex items-center mt-8 ml-12">
          <div className="w-14 h-14 mb-5 border-2 border-gray-600 bg-gray-200 rounded-full"></div> {/* Profile Photo Placeholder */}

          <div className="flex flex-col gap-3 ml-5">
            <h1 className="text-xl">My Tasks</h1>

            <div className="flex gap-4">
              <div className="flex-col">
                <button className="text-sm">Upcoming</button>
                <div className="border-2 mt-3 border-gray-600"></div>
              </div>

              <div className="flex-col">
                <button className="text-sm">Overdue</button>
                <div className="border-2 mt-3 border-gray-600"></div>
              </div>

              <div className="flex-col">
                <button className="text-sm">Completed</button>
                <div className="border-2 mt-3 border-gray-600"></div>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t-2 border-gray-300"></div> {/* Separator */}
        <p className="text-sm mt-2 ml-3 pb-3">Create task</p>
        <div className="flex flex-col">
          <button className="flex justify-start ml-5 p-1 w-11/12 border-t-2 border-b-2">Task</button>
          <button className="flex justify-start ml-5 p-1 w-11/12 border-b-2">Task</button>
          <button className="flex justify-start ml-5 p-1 w-11/12 border-b-2">Task</button>
          <button className="flex justify-start ml-5 p-1 w-11/12 border-b-2">Task</button>
          <button className="flex justify-start ml-5 p-1 w-11/12 border-b-2">Task</button>
        </div>
      </div>
    )
}


export default TasksCard