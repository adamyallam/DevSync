import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Component Imports
import Home from 'src/components/dashboard/pages/Home'


export default async function home(){
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Home name={session?.user.firstName}/>
    </div>
  )

}
