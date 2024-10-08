
// Component Imports
import Calendar from "@/components/dashboard/pages/calendar/Calendar"
import CalendarManager from "@/components/dashboard/pages/calendar/CalendarManager"
import CalendarUIProvider from "@/components/dashboard/context/CalendarUIProvider"

export default async function calendar() {

  return (
    <CalendarUIProvider>
      <div className="flex flex-col h-full w-full">
        <CalendarManager />
      
        <div className="h-full w-full flex-grow overflow-y-auto">
            <Calendar />
        </div>
      </div>
    </CalendarUIProvider>
  )

}
