"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import img1 from 'src/assets/imgs/instagram.png'
import img2 from 'src/assets/imgs/twitter.webp'
import img3 from 'src/assets/imgs/linkedin.webp'

export default function GoToDashboard(){
  const router = useRouter()

  return (
  <div className="grid grid-cols-3 grid-rows-7 gap-1 border-t border-black mt-3">
    <div className="flex justify-start items-end ml-5">
      <p className="">Stay Connected</p>
    </div>
    <div className="flex justify-center items-center row-span-3">
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
      <Image className="w-14 h-14" src={img1} alt="" />
      <Image className="w-14 h-14" src={img2} alt="" />
      <Image className="w-14 h-14" src={img3} alt="" />
    </div>
  </div>
  )
}
