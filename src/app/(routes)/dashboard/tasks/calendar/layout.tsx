
//Component Imports
import CalendarManager from "@/components/dashboard/pages/calendar/CalendarManager"

interface Props {
  children: React.ReactNode
}

const CalendarLayout: React.FC<Props> = ({children}) => {
    return (
      <section className="flex flex-col h-full w-full">
        <CalendarManager />
        
          <div className="flex-grow">
            {children}
          </div>
      </section>
    )
  }

  export default CalendarLayout