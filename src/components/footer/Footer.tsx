"use client"
import { useRouter } from 'next/navigation'
import Socials from '../Images/Socials'

export default function GoToDashboard(){
  const router = useRouter()

  return (
  <div className="grid grid-cols-3 grid-rows-7 gap-1 border-t border-black mt-3">
    <div className="flex justify-start items-end ml-5">
      <p className="">Stay Connected</p>
    </div>
    <div className="flex justify-center items-start mt-10 row-span-3 sm:items-center">
      <p>LOGO</p>
    </div>
    <div className="flex justify-end items-center mr-11">
      <p className="">Navigate</p>
    </div>

    <div className="flex justify-start items-start ml-5">
      <p className=''>Join our newsletter!</p>
    </div>
    <div className="flex justify-end row-span-2 items-start mr-7">
      <ul>
        <li>Dashboard</li>
        <li>About</li>
        <li>Blog</li>
      </ul>
    </div>

    <div className="flex justify-start ml-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="border-2 border-black rounded pl-1 w-36 md:w-56 lg:w-56 h-10"
      />
      <button className="hidden lg:block bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
    </div>
    <div>
      <button className="lg:hidden md:block bg-blue-500 text-white ml-4 px-4 py-2 rounded">Sign Up</button>
    </div>
    <div className='flex justify-center row-span-2 items-end'>
      <Socials />
    </div>
  </div>
  )
}
