
//Component Imports
import CalendarManager from "@/components/dashboard/pages/calendar/CalendarManager"
import CalendarUIProvider from "@/components/dashboard/context/CalendarUIProvider"

interface Props {
  children: React.ReactNode
}

const CalendarLayout: React.FC<Props> = ({children}) => {
    return (
      <CalendarUIProvider>
        <div className="flex flex-col h-full w-full">
          <CalendarManager />
        
          <div className="flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
      </CalendarUIProvider>
    )
  }

  export default CalendarLayout