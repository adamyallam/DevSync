import { Calendar, Ellipsis, Users, ClipboardPlus } from "lucide-react"

//Component imports

export const StatusLog = () => {

  return (
    <div className=" border-2 border-gray-200 bg-gray-100 p-4 -mt-[3px]">
      <div className="ml-5">
        <h1 className="text-xl mb-4">Project status:</h1>

        <div className="flex gap-4 mt-3">
          <button className="flex items-center justify-center w-20 gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-green-500 bg-green-500 w-2 h-2 rounded-full"/>On track</button>
          <button className="flex items-center justify-center w-20  gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-yellow-500 bg-yellow-500 w-2 h-2 rounded-full"/>At risk</button>
          <button className="flex items-center justify-center w-20 gap-1 border border-gray-400 bg-white p-1 rounded-md text-sm"><div className="border-2 border-red-500 bg-red-500 w-2 h-2 rounded-full"/>Off track</button>
          <button><Ellipsis /></button>
        </div>
      </div>

      <div className="ml-3 text-sm text-gray-600">
        <button className="flex items-center gap-2 mt-12">
          <div className="flex justify-center items-center border border-dashed rounded-full border-gray-600 w-7 h-7">
            <Calendar size={15} color="gray"/>
          </div>
          No due date
        </button>

        <div className="ml-[13px] mt-1 border border-gray-300 border-dashed w-0 h-12"/>

        <div className="flex gap-2 ml-1 mt-1">
          <div className="flex flex-col">
            <Users size={20} color="gray"/>
            <div className="ml-[9px] mt-1 border border-gray-300 w-0 h-24"/>
          </div>
          <div className="flex flex-col">
            <span className="text-black font-medium">Some random text log</span>
            <span>x days ago</span>
            <div className="border border-red-600 bg-red-400 rounded-full w-7 h-7 mt-2"/>
          </div>
        </div>
        <div className="flex gap-2 ml-1 mt-1">
          <div className="flex flex-col">
            <ClipboardPlus size={20} color="gray"/>
          </div>
          <div className="flex flex-col">
            <span className="text-black font-medium">Project Created</span>
            <span>x days ago</span>
            <div className="border border-red-600 bg-red-400 rounded-full w-7 h-7 mt-2"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusLog