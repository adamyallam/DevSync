'use client'

//component imports
import AddTaskHeaderButton from "@/components/styledElements/AddTaskHeaderButton"

const CalendarManager = () => {
  return (
    <div >
      <div className="flex items-center">
        <AddTaskHeaderButton showFilterSort={false} />
        <div className="border-r-2 border-black h-5"/>
      </div>
    </div>
  )
}

export default CalendarManager