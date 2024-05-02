import { authOptions } from 'src/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth'

// Component Imports
import Calendar from '@/components/dashboard/pages/Calendar'


export default function calendar(){

    return (
      <div>
        <h1 className='mt-28 ml-64 text-2xl'>Calendar page</h1>
      </div>
    )
  }

