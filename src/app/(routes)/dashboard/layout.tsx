
//Component Imports
import SidebarUIProvider from "@/components/context/SidebarUIProvider"

interface Props {
  children: React.ReactNode
}

export const dashboardLayout: React.FC<Props> = ({children}) => {
    return (
        <SidebarUIProvider>
          {children}
        </SidebarUIProvider>
    )
  }

  export default dashboardLayout