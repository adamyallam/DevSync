import Link from 'next/link'
import Logo from 'src/assets/imgs/Logo.png'
import LogoBig from 'src/assets/imgs/LogoBig.png'
import Image from 'next/image';
import {Instagram, Twitter, Linkedin} from 'lucide-react'

export default function Footer(){

  return (
    <div>
      <div className='grid grid-cols-1 grid-rows-3 bg-gray-800 h-64 md:grid-cols-3 md:grid-rows-4 xl:grid-rows-5'>
        <div className='flex justify-center md:mt-7 xl:ml-20'>
          <Link href='/'><Image className='w-16 h-16 mt-7 md:hidden' src={Logo} alt="" /></Link>
          <Link href='/'><Image className='hidden md:block w-36 h-20 mt-4 border-b-2 border-b-gray-500 xl:w-40 xl:h-24 2xl:ml-20' src={LogoBig} alt="" /></Link>
        </div>
        <div className='hidden md:flex md:justify-center mt-2 gap-2 row-start-3 col-start-1 xl:row-start-4 xl:ml-20 2xl:ml-40'>
          <Instagram size={32} color="#e5e7eb" strokeWidth={1.5} />
          <Twitter size={32} color="#e5e7eb" strokeWidth={1.5} />
          <Linkedin size={32} color="#e5e7eb" strokeWidth={1.5} />
        </div>
        <div className='hidden md:flex items-end text-[#f3f4f6] justify-center mt-4'>
         <p>Navigate</p>
        </div>
        <div className="flex justify-center text-center text-[#f3f4f6] mt-5 md:col-start-2 md:row-start-2">
          <ul>
            <li>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
            <li>
              <Link href='/pages/faq'>FAQ</Link>
            </li>
          </ul>
         </div>
          <div className='hidden md:block mt-14'>
            <p className='text-[#f3f4f6] mb-2'>Join our newsletter!</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-black p-1 w-56 h-10 mb-1"
            />
            <button className="bg-black text-white p-1 w-20 h-10">Sign Up</button>
          </div>
      </div>
      <div className='grid grid-cols-1 grid-rows-4 bg-[#1b1717] md:hidden'>
        <p className='flex justify-center text-gray-200 mt-6 mb-3'>Stay in touch by joining our newsletter!</p>
        <div className="flex justify-center">
           <input
             type="email"
             placeholder="Enter your email"
             className="border-2 border-black p-1 w-34 h-10"
           />
           <button className="bg-black text-white p-1 w-20 h-10">Sign Up</button>
         </div>
         <div>
          <div className='flex justify-center gap-2 mt-2'>
            <Instagram size={32} color="#e5e7eb" strokeWidth={1.5} />
            <Twitter size={32} color="#e5e7eb" strokeWidth={1.5} />
            <Linkedin size={32} color="#e5e7eb" strokeWidth={1.5} />
          </div>
          <p className='flex justify-center text-gray-200'>Follow our socials!</p>
         </div>
      </div>
    </div>
  )
}
