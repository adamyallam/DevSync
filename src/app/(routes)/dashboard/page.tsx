import { authOptions } from '../../api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth'

export default async function dashboard(){
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <div>
        <h1>Your Dashboard</h1>
        <h2>Welcome, {session.user.firstName}</h2>
        <a href='http://localhost:3000/'> 
          <button type="button">Home</button> 
        </a>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-red-700">Please signin before accessing your Dashboard</h1>
      <a href='http://localhost:3000/'> 
          <button type="button">Home</button> 
      </a>
    </div>
  )

}
