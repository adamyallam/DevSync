import { Calendar } from "lucide-react"

//Component imports

export const StatusLog = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div>
        <div className="pt-5 ml-8">
          <h1 className="text-xl">Project status:</h1>

          <div className="flex gap-4 mt-3">
            <button className="flex items-center gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-green-500 bg-green-500 w-2 h-2 rounded-full"/>On track</button>
            <button className="flex items-center gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-yellow-500 bg-yellow-500 w-2 h-2 rounded-full"/>At risk</button>
            <button className="flex items-center gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-red-500 bg-red-500 w-2 h-2 rounded-full"/>Off track</button>
          </div>
        </div>

        <div className="mt-10 ml-7">
          <button className="flex items-center gap-1"><div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full w-9 h-9"><Calendar size={18} color="gray"/></div>Due date</button>
        </div>
      </div>
    </div>
  )
}

export default StatusLog