
//Component Imports
import SidebarUIProvider from "@/components/context/SidebarUIProvider"
import Navbar from "@/components/dashboard/Navbar"

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
        <SidebarUIProvider>
          <div className="h-screen w-screen overflow-x-hidden">
            <Navbar />
            {children}
          </div>
        </SidebarUIProvider>
    )
  }

  export default dashboardLayout