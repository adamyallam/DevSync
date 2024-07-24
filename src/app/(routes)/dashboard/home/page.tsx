import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Component Imports
import Home from 'src/components/dashboard/pages/Home'
import ContentTransition from "@/components/dashboard/ContentTransition";

export default async function home(){
  const session = await getServerSession(authOptions)

  return (
    <div>
      <ContentTransition>
        <h1 className='text-2xl'>Home</h1>
        <Home name={session?.user.firstName}/>
      </ContentTransition>
    </div>
  )

}
