
//Component Imports
import Header from "@/components/dashboard/pages/tasks/Header"


interface Props {
  children: React.ReactNode
}

const TasksLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='flex flex-col h-full w-full'>
        <div>
          <Header />
        </div>
        <div className="overflow-hidden">
          {children}
        </div>
      </section>
    )
  }

  export default TasksLayout