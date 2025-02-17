
//Component Imports
import Header from "@/components/dashboard/pages/inbox/Header"

interface Props {
  children: React.ReactNode
}

const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='overflow-x-hidden'>
        <Header />
        {children}
      </section>
    )
  }

  export default dashboardLayout