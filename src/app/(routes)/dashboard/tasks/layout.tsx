
//Component Imports
import Header from "@/components/dashboard/pages/tasks/Header"
import Transition from "@/components/dashboard/Transition"


interface Props {
  children: React.ReactNode
}

export const TasksLayout: React.FC<Props> = ({children}) => {
    return (
      <section className=''>
        <Transition transition='translate-x-60'>
          <Header />
        </Transition>
        <div>
          {children}
        </div>
      </section>
    )
  }

  export default TasksLayout