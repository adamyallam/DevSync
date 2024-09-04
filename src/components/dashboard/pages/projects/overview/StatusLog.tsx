import { Calendar } from "lucide-react"

//Component imports

export const StatusLog = () => {

  return (
    <div className="h-screen hborder border-gray-200 bg-gray-100 p-4 -mt-[2px]"> {/** mt[132px] */}
      <h1 className="text-xl mb-4">Project status:</h1>

      <div className="flex gap-4 mt-3">
        <button className="flex items-center justify-center w-20 gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-green-500 bg-green-500 w-2 h-2 rounded-full"/>On track</button>
        <button className="flex items-center justify-center w-20  gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-yellow-500 bg-yellow-500 w-2 h-2 rounded-full"/>At risk</button>
        <button className="flex items-center justify-center w-20 gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-red-500 bg-red-500 w-2 h-2 rounded-full"/>Off track</button>
      </div>

      <button className="flex items-center gap-2 mt-5">
        <div className="flex justify-center items-center border border-dashed rounded-full border-black w-8 h-8">
          <Calendar size={17} />
        </div>
        No Due Date
      </button>
    </div>
  )
}

export default StatusLog