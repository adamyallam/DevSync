
//Component Imports
import SidebarUIProvider from "@/components/context/SidebarUIProvider"

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
      <section className='overflow-x-hidden'>
        <SidebarUIProvider children={children} />
      </section>
    )
  }

  export default dashboardLayout