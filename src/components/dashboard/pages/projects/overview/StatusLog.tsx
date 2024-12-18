import { Calendar, Ellipsis, Users, ClipboardPlus } from "lucide-react"

//Component imports

export const StatusLog = () => {

  return (
    <div className="border border-undertone bg-highlighted p-4 h-full w-full overflow-y-auto">
      <div className="ml-5">
        <h1 className="text-sm mb-4 text-secondary-text font-bold">Project status:</h1>

        <div className="flex gap-4 mt-3">
          <button className="flex items-center justify-center gap-1 bg-[#009903] px-1 h-6 rounded-md text-xs text-[#48F701] font-semibold"><div className="bg-[#48F701] w-2 h-2 rounded-full"/>On Track</button>
          <button className="flex items-center justify-center  gap-1 bg-[#D4BD02] px-1 h-6 rounded-md text-xs text-[#FDFF01] font-semibold"><div className="bg-[#FDFF01] w-2 h-2 rounded-full"/>At Risk</button>
          <button className="flex items-center justify-center gap-1 bg-[#A32020] px-1 h-6 rounded-md text-xs text-[#FF7D7A] font-semibold"><div className="bg-[#FF7D7A] w-2 h-2 rounded-full"/>Off Track</button>
          <button className="text-primary-text"><Ellipsis /></button>
        </div>
      </div>

      <div className="ml-3 text-sm text-primary-text">
        <button className="flex items-center gap-2 mt-12">
          <div className="flex justify-center items-center border border-dashed rounded-full border-secondary-text w-7 h-7 text-xs">
            <Calendar size={15} className="text-secondary-text"/>
          </div>
          No due date
        </button>

        <div className="ml-[13px] mt-1 border border-undertone border-dashed w-0 h-12"/>

        <div className="flex gap-2 ml-1 mt-1">
          <div className="flex flex-col">
            <Users size={20} className="text-secondary-text"/>
            <div className="ml-[9px] mt-1 border border-undertone w-0 h-24"/>
          </div>

          <div className="flex flex-col">
            <span className="text-primary-text font-medium">Some random text log</span>
            <span className="text-secondary-text text-xs">x days ago</span>
            <div className="border border-red-600 bg-red-400 rounded-full w-7 h-7 mt-2"/>
          </div>
        </div>

        <div className="flex gap-2 ml-1 mt-1">
          <div className="flex flex-col">
            <ClipboardPlus size={20} className="text-secondary-text"/>
          </div>
          
          <div className="flex flex-col">
            <span className="text-primary-text font-medium text-sm">Project Created</span>
            <span className="text-secondary-text text-xs">x days ago</span>
            <div className="border border-red-600 bg-red-400 rounded-full w-7 h-7 mt-2"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusLog