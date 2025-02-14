import "./globals.css";
import SessionProviderWrapper from "@/components/dashboard/context/SessionProvider"
import { getServerSession } from "next-auth"
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"

export const metadata = {
  title: 'DevSync',
  description: 'A web app that helps developers to track their projects progress and keep track of project tasks.',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <SessionProviderWrapper session={session}>
    <html lang="en">
      <body className="bg-secondary w-full h-full">
        <main>{children}</main>
      </body>
    </html>
    </SessionProviderWrapper>
  )
}

export default RootLayout