
//Component Imports
import Header from "@/components/dashboard/pages/projects/Header"
import Navbar from "@/components/dashboard/Navbar"

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='overflow-x-hidden'>
        <Navbar />
        <Header />
        {children}
      </section>
    )
  }

  export default dashboardLayout