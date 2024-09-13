
//Component Imports
import Header from "@/components/dashboard/pages/tasks/Header"
import Transition from "@/components/dashboard/Transition"


interface Props {
  children: React.ReactNode
}

export const TasksLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='flex flex-col h-full w-full'>
        <Transition transition='translate-x-60'>
          <Header />
        </Transition>
        <div className="overflow-hidden">
          {children}
        </div>
      </section>
    )
  }

  export default TasksLayout