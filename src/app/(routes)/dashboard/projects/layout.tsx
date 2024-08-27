import Header from "@/components/dashboard/pages/projects/Header"
import Transition from "@/components/dashboard/Transition"


interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='overflow-x-hidden'>
        <Header />
        {children}
      </section>
    )
  }

  export default dashboardLayout