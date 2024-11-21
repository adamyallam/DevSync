import { getServerSession } from "next-auth"
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"

//Component Imports
import NavbarUIProvider from "@/components/dashboard/context/NavbarUIProvider"
import Navbar from "@/components/dashboard/Navbar"
import Transition from "@/components/dashboard/Transition"
import SessionProviderWrapper from "@/components/dashboard/context/SessionProvider"

interface Props {
  children: React.ReactNode
}

const dashboardLayout: React.FC<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <SessionProviderWrapper session={session}>
      <NavbarUIProvider>
        <div className="flex h-screen w-screen overflow-x-hidden">
          <Navbar />
          <Transition classes="flex-1 h-full w-full" transition="ml-60">
            {children}
          </Transition>
        </div>
      </NavbarUIProvider>
    </SessionProviderWrapper>
  )
}

export default dashboardLayout