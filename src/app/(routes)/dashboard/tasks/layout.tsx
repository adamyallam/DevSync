import Header from "@/components/dashboard/pages/tasks/Header"
import Transition from "@/components/dashboard/Transition"


interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='overflow-x-hidden'>
        <Transition classes="mt-16" transition='translate-x-60'>
            <Header />
        </Transition>
        {children}
      </section>
    )
  }

  export default dashboardLayout