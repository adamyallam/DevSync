
//Component Imports
import NavbarUIProvider from "@/components/dashboard/context/NavbarUIProvider"
import Navbar from "@/components/dashboard/Navbar"

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
        <NavbarUIProvider>
          <div className="h-screen w-screen overflow-x-hidden">
            <Navbar />
            {children}
          </div>
        </NavbarUIProvider>
    )
  }

  export default dashboardLayout