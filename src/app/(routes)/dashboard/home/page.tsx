import { authOptions } from 'src/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth'
import Home from 'src/components/dashboard/pages/Home'


export default async function App(){
  // const session = await getServerSession(authOptions)

  // if (/*Remove "!" when done testing*/ !session) {
    
  
    return (
      <div>
        <Home />
      </div>
    )



  // }

  // return (
  //   <div>
  //     <h1 className="text-red-700">Please signin before accessing your Dashboard</h1>
  //     <a href='http://localhost:3000/'> 
  //         <button type="button">Home</button> 
  //     </a>
  //   </div>
  // )

}
