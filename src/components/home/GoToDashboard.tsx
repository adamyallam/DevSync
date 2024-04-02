"use client"
import { useRouter } from 'next/navigation'


export default async function GoToDashboard(){
  const router = useRouter()

  return (
    <div className=''>
        <div className="grid grid-cols-3 grid-rows-2 items-center border-b-2 border-black">
            <div className="flex justify-start col-span-2">
                <h1 className='text-6xl ml-5'>Dashboard</h1>
            </div>
            <div className='flex justify-center row-span-2 border-t-2 border-l-2 pl-5 pb-5 pt-5 mt-10 border-black'>
                <h2>Your workspace all in one place. Create and manage projects, check schedules, message other users and much more!</h2>
            </div>
            <div className='flex justify-start col-span-2'>
                <button className='ml-6 mb-10'>Go to dashboard</button>
            </div>
        </div>
    </div>
  )
}
