
//Component Imports
import NavbarUIProvider from "@/components/dashboard/context/NavbarUIProvider"
import Navbar from "@/components/dashboard/Navbar"
import Transition from "@/components/dashboard/Transition"

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
        <NavbarUIProvider>
          <div className="flex h-screen w-screen overflow-x-hidden">
            <Navbar />
            <Transition classes="flex-1 h-full w-full" transition="ml-60">
              {children}
            </Transition>
          </div>
        </NavbarUIProvider>
    )
  }

  export default dashboardLayout