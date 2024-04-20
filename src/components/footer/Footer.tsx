import Logo from 'src/assets/imgs/Logo.png'
import LogoBig from 'src/assets/imgs/LogoBig.png'
import Image from 'next/image';
import Socials from '../Images/Socials'

export default function GoToDashboard(){

  return (
    <div>
      <div className='grid grid-cols-1 grid-rows-3 bg-gray-800 h-64 md:grid-cols-3 md:grid-rows-4 xl:grid-rows-5'>
        <div className='flex justify-center md:mt-7 xl:ml-20'>
          <Image className='w-16 h-16 mt-7 md:hidden' src={Logo} alt="" />
          <Image className='hidden md:block w-36 h-20 mt-4 border-b-2 border-b-gray-500 xl:w-40 xl:h-24 2xl:ml-20' src={LogoBig} alt="" />
        </div>
        <Socials divClass='hidden xl:flex col-start-1 row-start-4 justify-center ml-20 2xl:ml-40' imgClass='h-10 w-10' />
        <div className='hidden md:flex justify-center col-start-1 row-start-2 mt-16 ml-16 w-1/2 lg:justify-end xl:row-start-3 '>
          <Socials divClass='flex mt-2 lg:mr-1 xl:hidden' imgClass='h-10 w-10' />
        </div>
        <div className='hidden md:flex items-end text-gray-300 justify-center mt-4'>
         <p>Navigate</p>
        </div>
        <div className="flex justify-center text-center text-gray-300 mt-5 md:col-start-2 md:row-start-2">
          <ul>
            <li>
              <a href='/Dashboard'>Dashboard</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/blog'>Blog</a>
            </li>
            <li>
              <a href='/contact'>Contact</a>
            </li>
            <li>
              <a href='/faq'>FAQ</a>
            </li>
          </ul>
         </div>
          <div className='hidden md:block mt-14'>
            <p className='text-gray-300 mb-2'>Join our newsletter!</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-black p-1 w-56 h-10 mb-1"
            />
            <button className="bg-black text-white p-1 w-20 h-10">Sign Up</button>
          </div>
      </div>
      <div className='grid grid-cols-1 grid-rows-4 bg-gray-700 md:hidden'>
        <p className='flex justify-center text-gray-200 mt-6 mb-3'>Stay in touch by joining our newsletter!</p>
        <div className="flex justify-center">
           <input
             type="email"
             placeholder="Enter your email"
             className="border-2 border-black p-1 w-34 h-10"
           />
           <button className="bg-black text-white p-1 w-20 h-10">Sign Up</button>
         </div>
         <Socials divClass='flex justify-center mt-4' imgClass='h-10 w-10' />
         <p className='flex justify-center text-gray-200'>Follow our socials!</p>
      </div>
    </div>
  )
}
